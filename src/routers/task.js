const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Task = require('../db/models/task.js');
const User = require('../db/models/user.js');


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:asc
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {

    const match = {};
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? 1 : -1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });

        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(req.params.id);

        const task = await Task.findOne({
            _id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {

    const allowedUpdate = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update);
    })

    if (!isValidOperation) {
        return res.status(400).send({
            error: "Operation not allowed! Not correct update params."
        });
    }

    try {

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(field => {
            task[field] = req.body[field];
        })

        await task.save();
        res.send(task);

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // });
    } catch (e) {
        res.status(400).send(e);
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        const result = await task.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;