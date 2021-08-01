const express = require('express');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

//**Routing */
app.get('/', (req,res)=>{
    res.send("index")
})
app.use(userRouter())

app.listen(PORT, ()=> {
    console.log("Server is up on http://localhost:"+PORT)
})