//chromeTest.js
const test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    driver = new webdriver.Builder()
        // .forBrowser('firefox')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build(),
    By = webdriver.By,
    action = driver.actions(),
    $ = driver.findElement.bind(driver),
    expect = require('expect.js'),
    async = require('neo-async'),
    config = require('../config/test.js'),
    util = require('../lib/util.js'),
    argv = require('yargs').argv,
    mail = config.id,
    pass = config.password;

let getNumber = 0;

test.describe('action', function() {
    before(function () {
        util.initialize();
    });

    after(function() {
        // driver.quit();
    });

    // console.log(argv);

    test.describe('set', function() {
        test.it('Should login page access', function(done) {
            driver.get(config.url).then(function () {
                util.driverCaptureAction('login', driver, 'action');
                done();
            });
        });

        test.it('Should create login session', function(done) {
            driver.get(config.url + '/my/-/login/auth/').then(function() {

                $(By.name('login_id')).sendKeys(mail);
                $(By.name('password')).sendKeys(pass);

                driver.executeScript("document.getElementsByClassName('btn-login')[0].querySelectorAll('input')[0].click()");

                // driver.executeScript("return document.getElementsByClassName('box-txt-error')[0].childNodes[0].innerText;").then(function (data) {
                //     console.log(data);
                // });

                driver.wait(function() {
                    return false;
                }, 5000).catch(function () {
                    done();
                });
            });
        });

        let goToAccessPageHref = '';

        test.it('Should topPage click to library', function(done) {
            driver.executeScript("$('#click_book')[0].click()").then(function (data) {
                goToAccessPageHref = data;

                driver.wait(function() {
                    return false;
                }, 5000).catch(function () {
                    done();
                });
            });
        });

        test.it('Should access bookPage session', function(done) {
            driver.wait(function() {
                return false;
            }, 5000).catch(function () {
                util.driverCaptureAction('03', driver, 'action');
            });

            driver.executeScript("return document.getElementsByClassName('m-boxListBookProductBlock__item')[0].querySelectorAll('a')[0].href").then(function (data) {
                goToAccessPageHref = data;
            });

            done();
        });

        test.it('Should view display off', function(done) {
            console.log('goToAccessPageHref:' + goToAccessPageHref);

            driver.get(goToAccessPageHref).then(function() {
                driver.wait(function() {
                    return false;
                }, 5000).catch(function () {
                    // document.getElementsByClassName('flipsnap')[0].getElementsByClassName('view-sheet').length
                    let elementLength = 0;

                    driver.executeScript("return document.getElementsByClassName('flipsnap')[0].getElementsByClassName('view-sheet').length").then(function (data) {
                        elementLength = (data);
                    }).then(function () {
                        driver.executeScript("$('.btn-close-dialog')[0].click();");
                        driver.executeScript("document.getElementsByClassName('view-protection')[0].style.display = 'none';");
                    }).then(function() {
                        done();
                    });
                });
            });
        });

        test.it('Should download into proper folder', function(done) {
            driver.executeScript("var script = window.document.createElement('script');" +
                "script.src = 'http://localhost:9000/execute.js';" +
                "document.getElementsByTagName('head')[0].appendChild(script);" +
                "return $('.flipsnap').children().length").then(function (length) {
                const maxPageNumber = length;

                function setTimeoutAsync(delay, loopCount) {
                    let _loopCount = loopCount;

                    return new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            driver.executeScript("return execAction();").then(function() {
                                if(_loopCount <= 0) {
                                    done();
                                    return;
                                } else {
                                    util.driverCaptureAction('clientUpdate' + ((maxPageNumber - _loopCount) + 1), driver, 'page/target');
                                }

                                setTimeoutAsync(3000, (_loopCount - 1));

                                resolve();
                            });
                        }, delay);
                    });
                }

                setTimeoutAsync(3000, length);
            });
        });
    });
});
