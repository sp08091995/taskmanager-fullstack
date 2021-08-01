const express = require('express');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

/**Authentication */
const passportInit = require('./config/passport')
passportInit(passport);


/**Stattic */
app.use(express.static(__dirname + '/public'));
app.use('/user',express.static(__dirname+'public/'))

//**Routing */
app.get('/', (req,res)=>{
    res.send("index")
})
app.use('/user',userRouter())

app.listen(PORT, ()=> {
    console.log("Server is up on http://localhost:"+PORT)
})