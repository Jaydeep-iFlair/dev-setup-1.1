var gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
var browserSync = require("browser-sync").create();

gulp.task("sass", function () {
  return gulp
    .src("source/scss/**/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return (
    gulp
      .src("source/js/**/*.js")
      .pipe(gulp.dest("public/js"))
      .pipe(browserSync.stream()) 
  );
});

gulp.task("copyImage", function () {
  return gulp.src("source/img/**/*.*").pipe(gulp.dest("public/img"));
});

gulp.task("copyFont", function () {
  return gulp.src("source/font/**/*.*").pipe(gulp.dest("public/font"));
});

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "/index.html",
    },
  });

  gulp
    .watch("source/**/*.scss", gulp.series(["sass"]))
    .on("change", browserSync.reload);
  gulp.watch("**/*.html").on("change", browserSync.reload);
  gulp
    .watch("source/**/*.js", gulp.series(["js"]))
    .on("change", browserSync.reload);
  gulp
    .watch("source/img/**/*.*", gulp.series(["copyImage"]))
    .on("change", browserSync.reload);
  gulp
    .watch("source/font/**/*.*", gulp.series(["copyFont"]))
    .on("change", browserSync.reload);
});
