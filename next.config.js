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
    domains: ["f4d9cfc13291836aa3fc818ee5fc87a3.serveo.net"], // Домен сайта
  },
};