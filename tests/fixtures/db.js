const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/db/models/user.js');
const Task = require('../../src/db/models/task.js');

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: "Amike",
    email: "tes1t@test3.com",
    password: "asdasd1AQ!3",
    age: 45,
    tokens: [{
        token: jwt.sign({
                _id: userOneId
            },
            process.env.JWT_SECRET
        )
    }]
};

const userTwo = {
    _id: userTwoId,
    name: "Amike23",
    email: "tes11t@tes1t3.com",
    password: "aasdas1d1AQ!3",
    age: 45,
    tokens: [{
        token: jwt.sign({
                _id: userTwoId
            },
            process.env.JWT_SECRET
        )
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}