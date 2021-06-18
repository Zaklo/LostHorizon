module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src("./fonts/main/*.{ttf,otf}")
      .pipe(plugins.fontgen({
        dest: "../public/fonts/main/"
      }));
  };
};
