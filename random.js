'use strict';

function range(max, min) {
    if (min === undefined) {
        min = 1;
    }
    return Array.from(new Array(max - min + 1), (x, i) => i + min);
}

function* chooseFromSet(set) {
    let len = set.length;
    while (len--) {
        const selectedIdx = Math.floor((Math.random() * len) + 1);
        yield set.splice(selectedIdx, 1)[0];
    }
}

function getRandomSubset(num, set) {
    const subset = [];
    const chooser = chooseFromSet(set);
    while (num--) {
        subset.push(chooser.next().value);
    }
    return subset;
}

function getRandomArray(num, set) {
    const randomArray = [];
    while (num--) {
        const selectedIdx = Math.floor(Math.random() * set.length);
        randomArray.push(set[selectedIdx]);
    }
    return randomArray;
}

const lowerAlpha = range(25).map(i => String.fromCharCode(i + 96));

module.exports = {
    // TODO: rename this module
    range,
    generateLotteryNumbers(num, max) {
        return getRandomSubset(num, range(max));
    },
    generateString(length) {
        length = length || 8;
        return getRandomArray(length, lowerAlpha).join('');
    },
    generatePhoneNumber() {
        return getRandomArray(7, range(9, 0)).join('');
    }
};
