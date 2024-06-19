const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const Userrouter = require('./router/user.router')

dotenv.config()




mongoose.connect('mongodb+srv://bsuryaprakash20:12345@cluster0.iarwzh0.mongodb.net/', {
    useUnifiedTopology: true,
    useNewUrlParser: true,

}).then(()=>{
    console.log('Database connected');

})
app.use(bodyparser.json())
app.use(cors({origin:"*"}))

app.use(Userrouter)


app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})