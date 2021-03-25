const mongoose = require('mongoose')
const transporter = require('../config/nodemailer.config')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    rating: {
        type: Number,
        required: true,
    },
    voters: {
        type: [String],
        required: true
    },
    bookClub: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    }
}, {
    timestamps: true
})

ratingSchema.statics.createAndAssingToEvent = function(ratingData, event_id, emailList, user_id) {
    return this
        .create(ratingData, { $push: { voters: user_id }})
        .then(rating => {
            return mongoose.model('Event')
                .findByIdAndUpdate(event_id, { bookRating: rating }, { new: true })
        })
        .then(() => {
            let emails = emailList.join(', ')
            let mailContent = {
                from: 'Book Together <booktogether@info.com>',
                to: emails,
                subject: 'Time to rate the book!',
                text: 'Your Book Club has come to an end and the time has come to rate the book! Visit the Book Club Dashboard for more information.'
            }
            transporter
                .sendMail(mailContent)
                .then(details => {
                    console.log('Email sent:', details)
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ code: 500, message: 'Error creating rating'})
        })
}

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating