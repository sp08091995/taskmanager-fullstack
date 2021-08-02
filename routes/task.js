const express = require('express');
const Task = require('../models/task');
const User = require('../models/user');
const logger = require('../config/logger');
const auth = require('../middlewares/auth');

module.exports = (app,passport)=>{
    const router = express.Router();
    router.post('/new', auth.checkAuthenticated, async (req,res)=>{
        const loggedUser = new User(
            await req.user
        ) 

        const task = new Task({
            ...req.body,
            owner: await loggedUser.id
        })
        console.log("loggedUser: ",loggedUser.id)
        console.log(task)

        try {
            const result = await task.save()
            if(!result){
                return res.status(422).send("Unable to Save")
            }
            res.send("Task Saved: "+JSON.stringify(result))
        } catch (error) {
            console.log("Error at /tasks: "+error)
            return res.status(422).send(error.toString())
            
        }
    })

    router.get('/tasks', async (req, res) => {
        try {
            const tasks = await Task.find({})
            res.send(tasks)
        } catch (e) {
            res.status(500).send()
        }
    })
    
    router.get('/:id', async (req, res) => {
        const _id = req.params.id
    
        try {
            const task = await Task.findById(_id)
    
            if (!task) {
                return res.status(404).send()
            }
    
            res.send(task)
        } catch (e) {
            res.status(500).send()
        }
    })
    
    router.patch('/:id', async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            const task = await Task.findById(req.params.id)
    
            updates.forEach((update) => task[update] = req.body[update])
            await task.save()
    
            if (!task) {
                return res.status(404).send()
            }
    
            res.send(task)
        } catch (e) {
            res.status(400).send(e)
        }
    })
    
    router.delete('/:id', async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id)
    
            if (!task) {
                res.status(404).send()
            }
    
            res.send(task)
        } catch (e) {
            res.status(500).send()
        }
    })
    


    return router;
}