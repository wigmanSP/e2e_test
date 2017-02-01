'use strict';

const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const jasmineReporters = require('jasmine-reporters');
const failFast = require('protractor-fail-fast');

const chromeOptions = {
    args: ['no-sandbox']
};

let specs = ['specs/bet-desktop/*.js'];
let baseUrl = process.env.BASE_URL || 'http://sgbettest01/';
let reportPrefix = '';
let screenshotPostfix = '';

if (process.env.MOBILE) {
    reportPrefix = 'mobile-';
    screenshotPostfix = ' (mobile)';
    chromeOptions.mobileEmulation = {
        deviceName: 'Apple iPhone 6'
    };
    specs = ['specs/bet-mobile/*.js'];
    baseUrl += 'mobil/';
}

const reporter = new HtmlScreenshotReporter({
    dest: 'reports/screenshots',
    ignoreSkippedSpecs: true,
    captureOnlyFailedSpecs: true,
    pathBuilder(currentSpec) {
        return currentSpec.fullName + screenshotPostfix;
    }
});

exports.config = {
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions
    },
    baseUrl,
    specs,
    exclude: ['*.page.js'],
    suites: {
        smoke: [
            'specs/bet-desktop/cart.js',
            'specs/bet-desktop/lotto5.js',
            'specs/bet-desktop/lotto6.js',
            'specs/bet-desktop/lotto7.js',
            'specs/bet-desktop/usermenu.js',
            'specs/bet-desktop/diary.js',
            'specs/bet-desktop/eurojackpot.js',
            'specs/bet-desktop/login.js',
            'specs/bet-desktop/logout.js',
            'specs/bet-desktop/keno.js',
            'specs/bet-desktop/gamemenu.js'
        ],
        mobile: [
            'specs/bet-mobile/cart.js',
            'specs/bet-mobile/lotto5.js',
            // 'specs/bet-mobile/lotto7.js',
            'specs/bet-mobile/usermenu.js',
            'specs/bet-mobile/diary.js',
            'specs/bet-mobile/eurojackpot.js',
            'specs/bet-mobile/login.js',
            'specs/bet-mobile/logout.js',
            'specs/bet-mobile/keno.js',
            'specs/bet-mobile/gamemenu.js'
        ]
    },
    params: {
        username: '*****',
        password: '*****',
        name: '*********',
        email: 'sgbet@aol.com',
        bankAccountNo: '11111111-22222222-33333333',
        retailerID: 123456, // any 6 numeric character
        retailerPassword: 'loginpwd',
        lotto5BasePrice: '230',
        lotto6BasePrice: '225',
        lotto7BasePrice: '225',
        jokerBasePrice: '250',
        kenoBasePrice: '230',
        luxorBasePrice: '180',
        ejpBasePrice: '660',
        ft: ' Ft',
        defaultWaitTimeout: process.env.DEFAULT_TIMEOUT || 30000
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 180000
    },
    getPageTimeout: 30000,
    allScriptsTimeout: 30000,
    beforeLaunch() {
        return new Promise((resolve) => {
            reporter.beforeLaunch(resolve);
        });
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: false,
            savePath: 'reports',
            modifyReportFileName(generatedFileName) {
                return `${reportPrefix}${generatedFileName}`;
            },
            modifySuiteName(generatedSuiteName) {
                if (process.env.MOBILE) {
                    generatedSuiteName += ' (mobile)';
                }
                return generatedSuiteName;
            }
        }));
        jasmine.getEnv().addReporter(reporter);

        jasmine.getEnv().addReporter(failFast.init());

        browser.driver.manage().window().setSize(1280, 800);
        const disableCssAnimate = function() {
            angular
            .module('disableCssAnimate', [])
            .run(() => {
                const style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '* {' +
                    '-webkit-transition: none !important;' +
                    '-moz-transition: none !important' +
                    '-o-transition: none !important' +
                    '-ms-transition: none !important' +
                    'transition: none !important' +
                    '}';
                document.getElementsByTagName('head')[0].appendChild(style);
            });
        };
        browser.addMockModule('disableCssAnimate', disableCssAnimate);
    },
    afterLaunch(exitCode) {
        failFast.clean();
        return new Promise((resolve) => {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};
