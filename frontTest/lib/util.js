
const fs = require('fs'),
    config = require('../config/test.js'),
    _ = require('lodash');

module.exports = {
    initialize: function () {
        if(!fs.existsSync(config.imgPath)) {
            fs.mkdirSync(config.imgPath);
        }
    },
    randomStringCreate: function (stringLegth) {
        const randomString = "abcdefghijklmnopqrstuvwxyz0123456789",
            createLength = stringLegth ? stringLegth : 8,
            randomStringLength = randomString.length;

        let returnLength = '';

        for(let i = 0; i < createLength; i++){
            returnLength += randomString[Math.floor(Math.random() * randomStringLength)];
        }

        return returnLength;
    },
    driverCaptureAction: function (target, driver, path) {
        const saveName = target + '.png',
            splitPath = path.split(/\//);
        let bondPath = '';

        return driver.takeScreenshot().then(function(data) {
            _.each(splitPath, function (result) {
                bondPath = (bondPath + '/' + result);

                if(!fs.existsSync(config.imgPath + bondPath)) {
                    fs.mkdirSync(config.imgPath + bondPath);
                }
            });

            fs.writeFile(config.imgPath + bondPath + '/' + saveName, data.replace(/^data:image\/png;base64,/,''), 'base64',
                function(error) {
                    if(error) throw error;
                }
            );
        });
    }
};
