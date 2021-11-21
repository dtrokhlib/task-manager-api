const { celsiusToFahrenheit, fahrenheitToCelsius } = require('./temperature.js');

test('test cels to fahr calc', () => {
    const temp = celsiusToFahrenheit(32);
    expect(temp).toBe(89.6)
});

test('test fahr to cels calc', () => {
    const temp = fahrenheitToCelsius(57.2);
    expect(Math.floor(temp)).toBe(14);
});