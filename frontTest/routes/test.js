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
    pass = config.password,
    BufferedReader = require('bufferedreader');

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

                util.driverCaptureAction('01', driver, 'action');

                driver.wait(function() {
                    return false;
                }, 5000).catch(function () {
                    done();
                });
            });
        });

        test.it('Should topPage capture', function(done) {
            driver.get(config.url + '/top/').then(function() {
                util.driverCaptureAction('02', driver, 'action');
                done();
            });
        });

        test.it('Should access bookPage session', function(done) {
            let goToAccessPageHref = '';

            driver.get(config.url + '/library/').then(function() {

                driver.wait(function() {
                    return false;
                }, 5000).catch(function () {
                    util.driverCaptureAction('03', driver, 'action');
                });

                driver.executeScript("return document.getElementsByClassName('m-boxListBookProductBlock__item')[0].querySelectorAll('a')[0].href").then(function (data) {
                    goToAccessPageHref = data;
                });
            }).then(function () {
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
                            $(By.xpath("//span[@class='btn btn-close-dialog']")).click();

                            return driver.executeScript("document.getElementsByClassName('view-protection')[0].style.display = 'none';");
                        }).then(function() {

                            // driver.executeScript("var evt = document.createEvent('MouseEvents');" +
                            //     "evt.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);" +
                            //     "document.getElementsByClassName('flipsnap')[0].dispatchEvent(evt);");

                            done();
                        });

                        // action.dragAndDrop($(By.css(".flipsnap .view-sheet:nth-child(2)")), $(By.css("#test .item:nth-child(3)"))).perform();

                        // util.driverCaptureAction('01', driver, 'capture');
                    });
                });
            });
        });

        test.it('Should download into proper folder', function(done) {



            driver.executeScript(getText(execAction.toString())).then(function () {
                done();
            });
        });
    });
});
