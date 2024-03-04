const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/bookCovers';

const bookSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description: {
        type: String,
    },
    publishedDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImage: {
        type:String,
        required:true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required:true
    }
}
)

module.exports = mongoose.model('Book',bookSchema);
module.exports.coverImageBasePath = coverImageBasePath; 