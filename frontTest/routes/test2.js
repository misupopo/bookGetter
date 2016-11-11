//chromeTest.js
const test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build(),
    By = webdriver.By,
    action = driver.actions(),
    $ = driver.findElement.bind(driver),
    expect = require('expect.js'),
    async = require('neo-async'),
    config = require('../config/test.js'),
    util = require('../lib/util.js'),
    execute = require('../lib/execute.js');

test.describe('client', function() {
    before(function () {
        util.initialize();
    });

    after(function() {
        // driver.quit();
    });

    test.describe('set', function() {
        test.it('Should update client data', function(done) {
            driver.get('http://localhost:9000/').then(function() {
                async.waterfall([
                    // move to client detail
                    function(done) {
                        driver.wait(function() {
                            return false;
                        }, 2000).catch(function () {

                            // driver.findElement(By.css("tbody > tr:nth-child(3)"));

                            // let target = $(By.css("tbody > tr:nth-child(3)"));
                            // $(action.mouseDown("tbody > tr:nth-child(3)", "2000"));
                            // driver.findElements(By.css("html > body"));
                            // $(By.cssSelector("tbody > tr:nth-child(3)"));

                            // $(By.xpath("//span[@id='demo-simple']")).mouseDown();
                            // $(action.mouseDown("body", "2000"));

                            // $(By.xpath("//div[@id='test']")).click();

                            // action.dragAndDrop(driver.findElement(By.id("test")), { x: 100, y: -100 });
                            // action.dragAndDrop(driver.findElement(By.id("test")), { x: -100, y: 0 }).perform();
                            // action.mouseDown($(By.css("#test .item:nth-child(1)")))
                            //     .mouseMove($(By.css("#test .item:nth-child(1)")), { x: -100, y: 0 })
                            //     .mouseUp()
                            //     .perform();

                            // action.dragAndDrop({ x: 60, y: 0 }, $(By.css("#test .item:nth-child(1)")));

                            // action.dragAndDrop($(By.css("#test .item:nth-child(1)")), $(By.css("#test .item:nth-child(2)"))).perform();
                            //
                            // util.driverCaptureAction('01', driver, 'test');
                            //
                            // action.dragAndDrop($(By.css("#test .item:nth-child(2)")), $(By.css("#test .item:nth-child(3)"))).perform();
                            //
                            // util.driverCaptureAction('02', driver, 'test');

                            driver.executeScript("var script = window.document.createElement('script');" +
                            "script.src = 'execute.js';" +
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
                    },
                    function () {
                        done();
                    }
                ]);
            });
        });
    });
});

