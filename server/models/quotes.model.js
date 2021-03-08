const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quotesPostSchema = new Schema({
    quote: {
        required: true,
        type: String
    },
    source: {
        type: String
    },
    author: {
        required: true,
        type: String
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Reader',
        required: true,
    },
}, {
    timestamps: true
})

const QuotesPost = mongoose.model('QuotesPost', quotesPostSchema)

module.exports = QuotesPost