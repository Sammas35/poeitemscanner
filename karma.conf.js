// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            // require('karma-chrome-launcher'),
            require('karma-electron'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma'),
            require('karma-mocha-reporter')
        ],
        preprocessors: {
            '**/*.js': ['electron']
        },
        client: {
            // clearContext: false, // leave Jasmine Spec Runner output visible in browser
            useIframe: false
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        // reporters: ['progress', 'kjhtml'],
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Electron'],
        singleRun: false
    });
};
