/* global __dirname */
/* global System */
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
                    // http://wallabyjs.com/docs/integration/systemjs.html
                    'src/*': {
                        scriptLoad: true,
                        format: 'register'
                    }
                }
            });

            var promises = [];
            for (var i = 0, len = wallaby.tests.length; i < len; i++) {
                promises.push(System['import'](wallaby.tests[i].replace(/\.ts$/, '')));
            }

            System.import('angular2/testing').then(function(angularTesting) {
                return System.import('angular2/platform/testing/browser').then(function(angularPlatformTestingBrowser) {
                    angularTesting.setBaseTestProviders(
                        angularPlatformTestingBrowser.TEST_BROWSER_PLATFORM_PROVIDERS,
                        angularPlatformTestingBrowser.TEST_BROWSER_APPLICATION_PROVIDERS
                    );        
                });
            })
            .then(function () {
                return Promise.all(promises).then(function () {
                    // starting wallaby test run when everything required is loaded
                    wallaby.start();
                });
            });
        }
    };
};
