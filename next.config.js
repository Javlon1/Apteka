module.exports = {
  // Настройки прокси для решения проблем с CORS
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
      {
        source: '/:path*',
        destination: '/404', // Перенаправляем все остальные запросы на страницу 404
      },
    ];
  },

  // Настройки для компонента next/image
  images: {
    domains: ["a081870889502de05c7a82a5d155385b.serveo.net"], // Домен сайта
  },
};