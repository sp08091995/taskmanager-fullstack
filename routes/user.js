const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const methodOverride = require('method-override');



module.exports = (app,passport)=>{
    
    const router = express.Router();
    router.use(methodOverride('_method'))


    
    router.get('/login',auth.checkNotAuthenticated,(req,res)=>{
        res.send("login")
    })

    router.get('/me', auth.checkAuthenticated, async (req, res) => {
        console.log("At me: "+await req.user)
        const resUser = new User(req.user)
        res.send(JSON.stringify(resUser.toJSON()))
    })


    router.post('/new', async (req,res)=>{
        const user = new User(req.body)

        try {
            const result = await user.save()
            if(!result){
                return res.status(422).send("Unable to Save")
            }
            res.send("User Saved: "+JSON.stringify(result))
        } catch (error) {
            console.log("Error at /users: "+error)
            return res.status(422).send(error.toString())
            
        }
    })

    router.post('/login', auth.checkNotAuthenticated ,passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    }))

    
    
    router.patch('/me', auth.checkAuthenticated, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    router.delete('/logout', (req,res)=>{
        req.logOut();
        res.redirect('/')
    })
    
    router.delete('/me', auth.checkAuthenticated, async (req, res) => {
        try {
            await req.user.remove()
            res.send(req.user)
        } catch (e) {
            res.status(500).send()
        }
    })


    return router;
}