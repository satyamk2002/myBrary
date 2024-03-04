const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/book')

const mongoose = require('mongoose');
const env = require('./.env');
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const connectDB = async () => {
    try {
        const connectionInsurance = await mongoose.connect("mongodb+srv://sethromandean002:satyam002@cluster0.tcmhfy2.mongodb.net/own");
        console.log(`\n mongoDB connected !!`);
    } catch (error) {
        console.log("MONGO DB connection failed ",error);
        process.exit(1);
    }
}

connectDB()


app.use('/', indexRouter)
app.use('/authors',authorRouter);
app.use('/books',bookRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`the app is ruuning at port ${port}`);
})