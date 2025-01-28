import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // createMiddlewareClient'ı doğrudan req ve res ile kullan
  const supabase = createMiddlewareClient<Database>({ 
    req: req as any, 
    res: res as any 
  })

  // Oturum durumunu kontrol et
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Eğer oturum yoksa login sayfasına yönlendir
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

// Middleware'in çalışacağı rotalar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!_next/static|_next/image|favicon.ico|login).*)',
  ],
} 