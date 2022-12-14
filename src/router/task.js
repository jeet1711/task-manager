const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)  
    }
    catch(e) {
        res.status(400).send(e)
    }
})

//GET /tasks?completed=true
//GET /tasks?limit=2&skip=2
//GET /tasks?sortBy=createdAt:asc/desc
router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1; 
    }

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    
    try{
        //const tasks = await Task.find({owner: req.user._id})
        //res.send(tasks)
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send('Please authenticate')
        }
        res.send(task)
    }
    catch(e) {
        res.status(404).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({error: 'Invalid Update!!'})
    }

    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        if(!task) {
            return res.status(404).send('Please authenticate')
        }
        updates.forEach(update => task[update] = req.body[update]);
        await task.save()
        res.send(task)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task) {
            return res.status.send(404)
        }
        res.send(task)
    }
    catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router