const express = require('express');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const bodyParser = require("body-parser");
const flash= require('express-flash')
const session=require('express-session')
const passport = require('passport');
const auth = require('./middlewares/auth');
const app = express()
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

/**Content-Type application/json */
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

/**Authentication */
const passportInit = require('./config/passport')
passportInit(passport);


/**Stattic */
app.use(express.static(__dirname + '/public'));
app.use('/user',express.static(__dirname+'public/'))
app.use('/task',express.static(__dirname+'public/'))

/**Flash and Session*/
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false    

}))
app.use(passport.initialize())
app.use(passport.session())



//**Routing */
app.get('/', auth.checkAuthenticated , (req,res)=>{
    res.send("index")
})
app.use('/user',userRouter(app,passport))
app.use('/task',taskRouter(app,passport))


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log("Server is up on http://localhost:"+PORT)
})

const Task = require('./models/task');

const main = async () => {
    const task = await Task.findById('61074167efb7832dd487bd2c')
    await task.populate('owner').execPopulate()
    console.log(task)
}

main()
