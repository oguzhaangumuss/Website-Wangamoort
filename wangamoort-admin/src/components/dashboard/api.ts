import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import { DashboardStats, OrderTrend, TopProduct, CategorySales } from './types'
import { subDays, format } from 'date-fns'

export async function fetchDashboardStats(supabase: SupabaseClient<Database>): Promise<DashboardStats> {
  const { data: quotes } = await supabase.from('quotes').select('status')
  const { data: products } = await supabase.from('products').select('variants:product_variants(stock_status)')
  const { count: customers } = await supabase.from('customers').select('id', { count: 'exact' })
  const { count: suppliers } = await supabase.from('suppliers').select('id', { count: 'exact' })

  return {
    quotes: quotes?.reduce((acc, quote) => {
      acc.total++
      acc[quote.status as keyof typeof acc]++
      return acc
    }, {
      total: 0,
      pending: 0,
      approved: 0,
      completed: 0,
      cancelled: 0,
      in_progress: 0,
      on_hold: 0,
      on_delivery: 0,
      delivered: 0
    }) || { total: 0, pending: 0, approved: 0, completed: 0, cancelled: 0, in_progress: 0, on_hold: 0, on_delivery: 0, delivered: 0 },
    products: {
      total: products?.length || 0,
      inStock: products?.filter(p => p.variants?.some(v => v.stock_status === 'in_stock')).length || 0,
      outOfStock: products?.filter(p => p.variants?.every(v => v.stock_status === 'out_of_stock')).length || 0
    },
    customers: customers || 0,
    suppliers: suppliers || 0
  }
}

export async function fetchOrderTrends(supabase: SupabaseClient<Database>, days: number): Promise<OrderTrend[]> {
  const startDate = subDays(new Date(), days)
  const { data: orders } = await supabase
    .from('quotes')
    .select('created_at, basket')
    .gte('created_at', startDate.toISOString())
    .order('created_at')

  if (!orders) return []

  // Önce tüm günleri 0 değerleriyle oluştur
  const trends: OrderTrend[] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd')
    trends.push({ date, orders: 0, revenue: 0 })
  }

  // Var olan siparişleri ekle
  orders.forEach(order => {
    const date = format(new Date(order.created_at), 'yyyy-MM-dd')
    const trendIndex = trends.findIndex(t => t.date === date)
    if (trendIndex !== -1) {
      trends[trendIndex].orders++
      trends[trendIndex].revenue += order.basket.reduce(
        (sum: number, item: Record<string, any>) => sum + (item.price * item.quantity), 
        0
      )
    }
  })

  return trends
}

export async function fetchTopProducts(supabase: SupabaseClient<Database>, limit: number): Promise<TopProduct[]> {
  const { data: quotes } = await supabase.from('quotes').select('basket').not('status', 'eq', 'cancelled')
  if (!quotes) return []

  const productSales = quotes.reduce((acc: Record<string, TopProduct>, quote) => {
    quote.basket.forEach((item: Record<string, any>) => {
      if (!acc[item.product_id]) {
        acc[item.product_id] = {
          id: item.product_id,
          name: item.product_name,
          category: item.category || 'Uncategorized',
          total_sales: 0,
          total_revenue: 0,
          stock_status: 'unknown'
        }
      }
      acc[item.product_id].total_sales += item.quantity
      acc[item.product_id].total_revenue += item.price * item.quantity
    })
    return acc
  }, {})

  return Object.values(productSales)
    .sort((a, b) => b.total_sales - a.total_sales)
    .slice(0, limit)
}

export async function fetchCategorySales(supabase: SupabaseClient<Database>): Promise<CategorySales[]> {
  const { data: quotes } = await supabase.from('quotes').select('basket').not('status', 'eq', 'cancelled')
  if (!quotes) return []

  const salesByCategory = quotes.reduce((acc: Record<string, CategorySales>, quote) => {
    quote.basket.forEach((item: Record<string, any>) => {
      const category = item.category || 'Uncategorized'
      if (!acc[category]) {
        acc[category] = { category, sales: 0, revenue: 0 }
      }
      acc[category].sales += item.quantity
      acc[category].revenue += item.price * item.quantity
    })
    return acc
  }, {})

  return Object.values(salesByCategory).sort((a, b) => b.sales - a.sales)
}

export async function fetchRecentOrders(supabase: SupabaseClient<Database>) {
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  if (!quotes) return []

  return quotes.map(quote => ({
    id: quote.id,
    customer_name: `${quote.customer_first_name} ${quote.customer_last_name}`,
    status: quote.status,
    total_amount: quote.basket.reduce((sum: number, item: Record<string, any>) => sum + (item.price * item.quantity), 0),
    created_at: quote.created_at,
    items_count: quote.basket.reduce((sum: number, item: Record<string, any>) => sum + item.quantity, 0)
  }))
} 