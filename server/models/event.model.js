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
        type: [String],
        required: true
    },
    genre: {
        type: String,
        enum: ["fantasy", "science fiction", "dystopian", "action and adventure", "mystery", "horror", "thriller and suspense", "historical fiction", "romance", "womens fiction", "LGBTQ+", "classics", "contemporary fiction", "plays and screenplays", "poetry", "literary fiction", "magical realism", "comics and graphic novels", "short story", "young adult", "new adult", "childrens literature", "memoir and autobiography", "biography", "food and drink", "art and photography", "self-help", "history", "travel", "true crime", "humor", "essays", "guide how-to", "religion and spirituality", "humanities and social sciences", "parenting and families", "science and technology"],
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
    recurrence: {
        type: String,
        enum: ["once a week", "twice a week", "every two weeks", "once a month"],
        required: true
    },
    language: {
        type: String,
        enum: ["english", "spanish", "portuguese", "french"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgBookCover: {
        type: String,
        required: true,
        default: "https://www.événementiel.net/wp-content/uploads/2014/02/default-placeholder.png"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Reader', 
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Reader'
    }],
    participantsEmails: [String],
    meetings: [{
        type: Schema.Types.ObjectId,
        ref: 'Meeting'
    }],
    bookRating: {
        type: Schema.Types.ObjectId,
        ref: 'Reader',
        default: undefined
    }
}, {
    timestamps: true
})

eventSchema.statics.createAndAssingToReader = function(clubData, userId) {
    return this
    .create(clubData)
    .then(newClub => {
        return mongoose.model('Reader')
        .findByIdAndUpdate(userId, { $push: { clubsCreated: newClub._id}}, { new: true })
        .catch(err => console.log(err))
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ code:500, message:'Error saving new Book Club', err})})
}

const Event = mongoose.model('Event', eventSchema)

module.exports = Event