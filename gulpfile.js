var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul"),
    path = require("path"),
    KarmaServer = require('karma').Server,
    rimraf = require('rimraf');
    
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clear', function (cb) {
    rimraf('./build', cb);
});
    
gulp.task("build", ["clear"], function() {
    
    var tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
                    
    return tsResult.js
        .pipe(sourcemaps.write('.', { 
            includeContent: false,
            sourceRoot: function (file) {
                // https://github.com/ivogabe/gulp-typescript/issues/201
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd);
            }
        }))
        .pipe(gulp.dest('.'));
    
});

gulp.task("test", ["build"], function(done) {
   
   // https://github.com/karma-runner/gulp-karma
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
    
});

gulp.task("test-transform", ["test"], function() {
   
    return gulp.src('./build/**/coverage.json')
        .pipe(remapIstanbul({
            reports: {
                'html': './build/istanbul-html-report',
                'json': './build/istanbul-report.json',
                'lcovonly': './build/istanbul-lcov-report.info'
            }
        }));
    
});

gulp.task("default", ["clear", "build", "test", "test-transform"], function() {});