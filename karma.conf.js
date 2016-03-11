// Karma configuration
// Generated on Tue Dec 22 2015 13:09:39 GMT+0100 (Mitteleuropäische Zeit)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
        "karma-jasmine",
        "karma-coverage",
        "karma-chrome-launcher",
        "karma-phantomjs-launcher"
    ],

    // list of files / patterns to load in the browser
    files: [
        // paths loaded by Karma
        {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', included: true, watched: false},
        {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: false},
        {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false},
        {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false},
        {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: false},
        {pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: false},
        {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: false},
        {pattern: 'karma.test.shim.js', included: true, watched: true},
        
        // paths loaded via module imports
        {pattern: 'src/**/*.js', included: false, watched: true},
        
        // paths loaded via Angular's component compiler
        // (these paths need to be rewritten, see proxies section)
        //{pattern: 'src/**/*.html', included: false, watched: true},
        //{pattern: 'src/**/*.css', included: false, watched: true},
        
        // paths to support debugging with source maps in dev tools
        {pattern: 'src/**/*.ts', included: false, watched: false},
        {pattern: 'src/**/*.js.map', included: false, watched: false}
    ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      "/src/": "/base/src/"
    },

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/**/!(*.spec).js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
        dir: 'build',
        reporters: [
            { type: 'json', file: 'coverage.json' },
            { type: 'lcov', file: 'coverage.lcov' },
        ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
