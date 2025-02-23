module.exports = {
  siteUrl: 'https://wangamoort.com.au',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://wangamoort.com.au/server-sitemap.xml',
    ],
  },
} 