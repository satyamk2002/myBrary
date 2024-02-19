
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose');
const env = require('./.env');
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const connectDB = async () => {
    try {
        const connectionInsurance = await mongoose.connect("mongodb+srv://sethromandean002:satyam002@cluster0.tcmhfy2.mongodb.net/own");
        console.log(`\n mongoDB connected !! DB HOST : ${connectionInsurance.connection.host}`);
    } catch (error) {
        console.log("MONGO DB connection failed ",error);
        process.exit(1);
    }
}

connectDB()


app.use('/', indexRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`the app is ruuning at port ${port}`);
})