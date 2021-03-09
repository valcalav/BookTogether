const mongoose = require('mongoose')
const transporter = require('../config/nodemailer.config')
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


meetingPostSchema.statics.createAndAssignToEvent = function(meetingData, eventId, emailList) {
    return this
    .create(meetingData)
    .then(meeting => {
        return mongoose.model('Event')
            .findByIdAndUpdate(eventId, { $push: { meetings: meeting._id }}, { new: true })
        })
    .then(meeting => {
        let emails = emailList.join(', ')
        let mailContent = {
            from: 'Book Together <booktogether@info.com>',
            to: emails,
            subject: 'New Book Club meeting!',
            text: 'Your next Book Club meeting has been scheduled for ' + meeting.date + ' at ' + meeting.time + ' hours. The link to enter the meeting is: ' + meeting.meetingLink + 'Visit the Book Club Dashboard for more information.'
        }
        transporter
            .sendMail(mailContent)
            .then(details => {
                console.log('Email sent:', details)
            })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ code: 500, message: 'Error creating meeting'})})
    }



const Meeting = mongoose.model('Meeting', meetingPostSchema)



module.exports = Meeting