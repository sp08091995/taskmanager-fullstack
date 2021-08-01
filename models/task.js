
require('../config/db');
const mongoose = require('mongoose');
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: required
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task

// const tsk = new Task({
//     description: "Sants",
//     completed: true
// })

// tsk.save().then(() => {
//     console.log(tsk)
// }).catch(error => {
//     console.log("Error: " + error)
// })