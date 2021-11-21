const request = require('supertest');
const Task = require('../src/db/models/task.js');
const app = require('../src/app.js');
const {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
} = require('./fixtures/db.js');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            description: "Test 1 task manger",
            completed: false
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should return task for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2);
});

test('Should not allow user to delete task owned by other user', async () => {
    await request(app)
        .delete(`/tasks/${ taskOne._id }`)
        .set('Authorization', `Bearer ${ userTwo.tokens[0].token }`)
        .send()
        .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})