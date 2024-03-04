const express = require('express')
const router = express.Router()
const Book = require('../models/books.js');
const Author = require('../models/author.js');


const path = require('path');
const uploadPath = path.join('public',Book.coverImageBasePath);
const imageMimeTypes = ['image/jpeg','image/png','image/gif']


const multer = require('multer')
const upload = multer({
    dest : uploadPath,
    fileFilter: (req,res,callback) => {
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})


//All book route
router.get('/', async (req, res) => {
    res.send('All books')
})

//New book route
router.get('/new', async (req,res) => {
    renderNewPage(res,new Book())
})

// Create book route
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null? req.file.filename:null;
    const book = new Book({
        title : req.body.title,
        author: req.body.author,
        publishedDate : new Date (req.body.publishedDate),
        pageCount : req.body.pageCount,
        coverImage : fileName,
        description : req.body.description
    })

    try {
        const newBook = await Book.save();
        res.redirect(`books`);
    } catch {
        renderNewPage(res,book,true);
    }
})

async function renderNewPage(res,book,hasError = false) {
    try {
        const authors =  await Author.find({});
        const book = new Book();
        const params = {
            authors: authors,
            book:book
        }
        if(hasError) params.errorMessage = 'Error while creating book'
        res.render('books/new', params)
    } catch {
        res.redirect('/books');
    }
}

module.exports = router 