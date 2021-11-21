const {
    calculateTip,
    add
} = require('./math.js');

test('should calculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
})

test('should calculate totatl with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})

// test('async test demo', (done) => {
//     setTimeout(() => {
//         expect(2).toBe(1);
//         done();
//     }, 2000);
// })

test('Async math func demo', (done) => {
    add(2, 3).then(sum => {
        expect(sum).toBe(5);
        done();
    })
})

test('should add two numbers async/await', async () => {
    const sum = await add(10, 22);
    expect(sum).toBe(32);
})