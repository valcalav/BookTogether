const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        // required: true,
    },
    duration: {
        type: String,
        enum: ["1 hour", "2 hours", "3 hours"],
        required: true,
    },
    meetingLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Meeting = mongoose.model('Meeting', meetingPostSchema)

module.exports = Meeting