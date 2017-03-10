var gulp = require("gulp"),
  glob = require("glob").sync,
  pkg = require("./package.json"),
  nt = require("notiontheory-basic-build"),

  builder = nt.setup(gulp, pkg),

  demoFiles = "demos/*/app.js",
  demos = glob(demoFiles).map(function(file) {

    var name = file.match(/demos\/(\w+)\/app\.js/)[1],
      taskName = "Demo:" + name,
      min = builder.min(taskName, file);

    return min.release;
  }),

  pugFiles = ["*.pug", "demos/**/*.pug"],
  html = builder.html("Primrose", pugFiles, "src"),

  stylusFiles = ["*.styl", "demos/**/*.styl"],
  css = builder.css("Primrose", stylusFiles),

  stopOnFiles = [demoFiles]
    .concat(pugFiles)
    .concat(stylusFiles),

  reloadOnFiles = [
    "*.js",
    "!gulpfile.js",
    "*.css",
    "*.html",
    "demos/**/*.js",
    "demos/**/*.css",
    "demos/**/*.html"
  ],

  devServer = builder.devServer(stopOnFiles, reloadOnFiles);


gulp.task("copy", () => gulp.src([
    "node_modules/primrose/Primrose.js",
    "node_modules/primrose/Primrose.min.js",
    "node_modules/primrose/preloader.js",
    "node_modules/primrose/preloader.min.js",
    "node_modules/three/build/three.js",
    "node_modules/three/build/three.min.js"
  ])
  .pipe(gulp.dest("vendor")));

gulp.task("js:release", demos);

gulp.task("html", [html.default]);
gulp.task("html:debug", [html.debug]);
gulp.task("html:release", [html.release]);

gulp.task("css", [css.default]);
gulp.task("css:debug", [css.debug]);
gulp.task("css:release", [css.release]);

gulp.task("default", [ "copy", "html", "css" ], devServer);
gulp.task("test", [ "copy", "release" ], devServer);

gulp.task("debug", [ "copy", "html:debug", "css:debug"]);
gulp.task("release",  [ "copy", "js:release", "html:release", "css:release"]);
