const gulp = require("gulp");
const miniCss = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const connect = require("gulp-connect");
const sass = require("gulp-sass");

gulp.task("html",function() {
    gulp.src("incake/index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
    gulp.src("incake/html/**/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
})

gulp.task("css",function () {
  gulp.src("incake/scss/**/*.scss")
      .pipe(sass())
      .pipe(miniCss())
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
})

gulp.task("js",function () {
  gulp.src("incake/js/**/*.js")
      .pipe(babel({
        presets:['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest("dist/js"))
      .pipe(connect.reload());
})

gulp.task("module",function () {
  gulp.src("incake/module/**/*.js")
      .pipe(babel({
        presets:['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest("dist/module"))
      .pipe(connect.reload());
})

gulp.task("libs",function () {
  gulp.src("incake/libs/**/*")
      .pipe(gulp.dest("dist/libs"))
      .pipe(connect.reload());
})

gulp.task("img",function () {
  gulp.src("incake/images/**/*")
      .pipe(gulp.dest("dist/images"))
      .pipe(connect.reload());
})

gulp.task("server",function () {
  connect.server({
    livereload:true,
    port:1807,
    root:"dist"
  })
})

gulp .task("watch",function () {
  gulp.watch("incake/index.html",["html"]);
  gulp.watch("incake/html/**/*.html",["html"]);
  gulp.watch("incake/scss/**/*.scss",["css"]);
  gulp.watch("incake/js/**/*.js",["js"]);
  gulp.watch("incake/module/**/*.js",["module"]);
  gulp.watch("incake/images/**/*",["img"]);
})

gulp.task("default",["html","css","js","module","img","libs","server","watch"]);
