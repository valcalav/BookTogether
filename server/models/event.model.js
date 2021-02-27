const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    bookClubName: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        enum: ["4 weeks", "5 weeks", "6 weeks", "7 weeks", "8 weeks", "3 months", "6 months"],
        required: true
    },
    meetings: {
        type: String,
        enum: ["once a week", "twice a week", "every two weeks", "once a month"],
        required: true
    },
    language: {
        type: String,
        enum: ["English", "Spanish"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event