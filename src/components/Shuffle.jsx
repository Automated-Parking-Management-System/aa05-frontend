import React from 'react'

const Shuffle = () => {
  return null;
}

function shuffle(input) {
    let str = input.split('');

    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length - 1; j++) {
            let temp = str[j];
            str[j] = str[j + 1];
            str[j + 1] = temp;
        }
    }

    return str.join('');
}

function unshuffle(reversed) {
    let str = reversed.split('');

    for (let i = str.length - 1; i >= 1; i--) {
        for (let j = str.length - 1; j >= i; j--) {
            let temp = str[j];
            str[j] = str[j - 1];
            str[j - 1] = temp;
        }
    }

    return str.join('');
}

export { Shuffle, shuffle, unshuffle };