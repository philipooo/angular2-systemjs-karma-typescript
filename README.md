# angular2-systemjs-karma-typescript
Seed for a project using 


- Angular2
- Typescript
- Systemjs

For Testing
- Karma (with Jasmine + Istanbul)
- wallabyjs

For building
- Gulp

##Getting things started
```
> npm install
> gulp
```

##Code coverage
Results are mapped back to the Typescript files and are stored in `build/istanbul-html-report/index.html`.

##Wallaby.js
If you use the awesome [wallaby.js](http://wallabyjs.com/) test runner (I do for Visual Studio Code) there is already a preconfigured wallaby.js file. So you get instant inline test feedback.

#FAQ

##Why no jspm?
jspm just adds small value for me. I don't need to pull modules from Github or Bower. All I need I get directly from npm. The automatic configuration of systemjs can done by hand. The most reason I don't use it is because of Visual Studio Code does not provide code completion if angular2 is placed in `jspm_packages/npm` instead of `node_modules`.
