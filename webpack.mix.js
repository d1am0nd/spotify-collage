const mix = require('laravel-mix');

mix
  .setPublicPath('./')
  .copy('src/static', './public')
  .ts('src/ts/index.tsx', './public/js/app.js');
