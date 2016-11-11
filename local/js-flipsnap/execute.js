function execAction(index) {
    const loopCount = index | 1;

    function promiseAction (loopCount) {
        let target = $('.flipsnap'),
            fireMouseEvent,
            promiseActionNest,
            elemDrag = target[0],
            childTarget = test.children.length;

        fireMouseEvent = function (type, elem, clientX, clientY, screenX, screenY) {
            let evt = document.createEvent('MouseEvents');
            evt.initMouseEvent(type, true, true, window, 1, screenX, screenY, clientX, clientY, false, false, false, false, 0, elem);
            elem.dispatchEvent(evt);
        };

        promiseActionNest = function (count) {
            return new Promise(function(resolve, reject) {
                return setTimeout(function () {
                    fireMouseEvent('mousedown', elemDrag, 134, 65, 156, 184);
                    console.log('action1');
                    return resolve();
                }, 500);
            }).then(function () {
                return new Promise(function(resolve, reject) {
                    setTimeout(function () {
                        fireMouseEvent('mousemove', elemDrag, 354, 65, 356, 184);
                        console.log('action2');
                        return resolve();
                    }, 500);
                });
            }).then(function () {
                return new Promise(function(resolve, reject) {
                    setTimeout(function () {
                        fireMouseEvent('mousemove', elemDrag, 474, 65, 456, 184);
                        console.log('action3');
                        return resolve();
                    }, 500);
                });
            }).then(function () {
                return new Promise(function(resolve, reject) {
                    setTimeout(function () {
                        fireMouseEvent('mousemove', elemDrag, 584, 65, 556, 184);
                        console.log('action4');
                        return resolve();
                    }, 500);
                });
            }).then(function () {
                return new Promise(function(resolve, reject) {
                    setTimeout(function () {
                        fireMouseEvent('mouseup', elemDrag, 609, 65, 731, 184);
                        console.log('action5');
                        return resolve();
                    }, 500);
                });
            }).then(function () {
                console.log(count);

                if(count < 2) {
                    return;
                }

                promiseActionNest((count - 1));
            });
        };

        return promiseActionNest(loopCount);
    }

    return promiseAction(loopCount);
}

function getText(value) {
    let text = value,
        arrayData = [],
        scriptData = '',
        returnValue = '';

    arrayData = text.split(/\r\n|\r|\n/);

    for (let i = 0; i < arrayData.length; i++) {
        scriptData = (scriptData + arrayData[i]);
    }

    returnValue = scriptData.replace(/\s+/g, ' ');

    return returnValue;
}


