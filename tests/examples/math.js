const calculateTip = (total, tipPercent = .25) => {
    return total + (total * tipPercent);
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject("Values must be positive!");
            }
            resolve(a + b);
        }, 10);
    });
}


module.exports = { calculateTip, add };