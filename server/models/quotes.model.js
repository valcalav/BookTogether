const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quotesPostSchema = new Schema({
    quote: {
        required: true,
        type: String
    },
    book: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
}, {
    timestamps: true
})

const quotesPost = mongoose.model('quotesPost', quotesPostSchema)

module.exports = quotesPost