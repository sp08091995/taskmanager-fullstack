
require('../config/db');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(emailVal) {
            if(!validator.isEmail(emailVal)){
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(passwordVal) {
            if(passwordVal.length < 7){
                throw new Error("Password must be atleast 6 characters")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

userSchema.pre('save', async function(next){
    const user = this;
    console.log("Just before saving")
    if(user.password){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findByCredentials = async function (email,passwod){
    try {
        const user = await User.findOne({ email })
        if(!user){
            throw new Error('User not registered')
        }

    } catch (error) {
        
    }
}

userSchema.statics.findById = async function (id) {
    try {
        const user = await User.findOne({ id })
        if(!user){
            logger.error("Unable to find User with Id: "+id)
            return 
        }
        
        return user;
    } catch (error) {
        logger.error(error.toString())
    }
}

const User = mongoose.model('User', userSchema);






module.exports = User
// const me = new User({
//     firstname: "Mike",
//     email: 'whataemail'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch(error => {
//     console.log("Error: " + error)
// })