process.env.CHROME_BIN = require('chromium').path

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'dist/index.js', type: 'module' },
      { pattern: 'test/test.js', type: 'module' }
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage']
      }
    },
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  })
}
