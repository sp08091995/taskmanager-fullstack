const mongoose = require('mongoose');
const connectionUrl = "mongodb://admin:password@127.0.0.1:27017/taskmanager"
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
})