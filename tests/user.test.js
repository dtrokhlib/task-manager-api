const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/db/models/user.js');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db.js');

beforeEach(setupDatabase);

// afterEach(() => {
//     console.log('afterEach');
// });

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Andres',
        email: "test@sdasdddssdd.com",
        password: "myPass123312!3",
        age: 25
    }).expect(201);


    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: 'Andres',
            email: "test@sdasdddssdd.com",
            age: 25
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('myPass123312!3');
});

test('Should login a test user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(response.body.user._id);

    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should deny login a test user with invalid password', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password + '!1'
    }).expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token + '141' }`)
        .send()
        .expect(401);
});

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200);

    const user = await User.findById(userOne._id);

    expect(user).toBeNull();
});

test('Should NOT delete account NOT Authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token + '412' }`)
        .send()
        .expect(401);
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .attach('upload', 'tests/fixtures/6a6c39517e244882.png')
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            name: "Ahmed",
            age: 97,
            email: "ahmed@ahmed.com"
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toMatchObject({
        name: "Ahmed",
        age: 97,
        email: "ahmed@ahmed.com"
    });
});

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            location: 'Philadelphia'
        })
        .expect(400);
})