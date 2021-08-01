const { json } = require('body-parser');
const express = require('express');
const User = require('../models/user');

module.exports = ()=>{
    const router = express.Router();

    // router.post('/', (req,res)=>{
    //     res.send()
    // })

    router.post('/user', async (req,res)=>{
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

        res.send("testing")
    })


    return router;
}