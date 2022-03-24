module.exports = {
  proxy: 'localhost:8000',
  files: ['**/*.scss', '**/*.pug', '**/*.js'],
  ignore: ['node_modules', 'public'],
  reloadDelay: 10,
  ui: false,
  notify: false,
  port: 3000,
};
