
require('../config/db');
const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('User', {
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