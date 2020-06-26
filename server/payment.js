'use strict';

exports.payment = (cardHolder, cardNumber, cardCvv, coast) => {
    return new Promise((resolve, reject) => {
        if(cardHolder && cardNumber && cardCvv && coast){
            resolve("OK");
        } else {
            reject("NO");
        }
    })
}