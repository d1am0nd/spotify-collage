const mix = require('laravel-mix');

mix
  .webpackConfig({
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
  })
  .setPublicPath('./')
  .copy('src/static', './public')
  .ts('src/ts/index.tsx', './public/js/app.js');
