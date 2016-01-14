module.exports = function (wallaby) {
  
    wallaby.defaults.files.instrument = false;
  
    return {
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js', // https://github.com/wallabyjs/public/issues/379#issuecomment-165926502
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/testing.dev.js',

            { pattern: 'src/**/*.ts', instrument: true, load: false },
            { pattern: 'src/**/*.spec.ts', ignore: true }
        ],

        tests: [
            { pattern: 'src/**/*.spec.ts', load: false }
        ],

        env: {
            runner: "node_modules/phantomjs2-ext/lib/phantom/phantomjs"
        },

        debug: true,

        compilers: {
            // see const enum ModuleKind
            // https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts
            'src/*.ts': wallaby.compilers.typeScript({
                "module": 4,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true
            })
        },
    
        // https://github.com/wallabyjs/wallaby-typescript-angular-seed/blob/master/wallaby.js#L75
        // serving node modules contents as is if/when requested
        middleware: function (app, express) {
            app.use('/node_modules',
                express.static(
                require('path').join(__dirname, 'node_modules')));
        },
    
        bootstrap: function (wallaby) {
            wallaby.delayStart();

            System.config({
                defaultJSExtensions: true,
                paths: {
                    'angular2/*': 'node_modules/angular2/*.js',
                    'rxjs/*': 'node_modules/rxjs/*.js'
                },
                meta: {
                    'src/**/*.spec.js': {
                        scriptLoad: true,
                        format: 'register'
                    }
                }
            });

            var promises = [];
            for (var i = 0, len = wallaby.tests.length; i < len; i++) {
                promises.push(System['import'](wallaby.tests[i].replace(/\.ts$/, '')));
            }

            System.import('angular2/src/platform/browser/browser_adapter')
                .then(function (browser_adapter) {
                    browser_adapter.BrowserDomAdapter.makeCurrent();
                })
                .then(function () {
                    return Promise.all(promises).then(function (loadedTests) {
                    // Angular 2 exports main function from tests, so let's call it
                    loadedTests.forEach(function (test) {
                        test.main && test.main();
                    });

                    // starting wallaby test run when everything required is loaded
                    wallaby.start();
                    });
                });
        }
    };
};