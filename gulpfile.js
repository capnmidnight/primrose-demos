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

gulp.task("js:release", demos);

gulp.task("html", [html.default]);
gulp.task("html:debug", [html.debug]);
gulp.task("html:release", [html.release]);

gulp.task("css", [css.default]);
gulp.task("css:debug", [css.debug]);
gulp.task("css:release", [css.release]);

gulp.task("default", [ "html", "css" ], devServer);
gulp.task("test", [ "release" ], devServer);

gulp.task("debug", ["html:debug", "css:debug"]);
gulp.task("release",  ["js:release", "html:release", "css:release"]);
