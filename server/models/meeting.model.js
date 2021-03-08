const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        enum: ["1 hour", "1 hour 30 minutes", "2 hours", "2 hours 30 minutes", "3 hours", "4 hours"],
        required: true,
    },
    meetingLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    bookClub: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    }
}, {
    timestamps: true
})

const Meeting = mongoose.model('Meeting', meetingPostSchema)

module.exports = Meeting