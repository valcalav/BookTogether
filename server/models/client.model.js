const mongoose = require('mongoose');
const { userSchema } = require ('./user.model')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    userInfo: userSchema,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    favoriteGenres: {
        type: [String],
        enum: ["a", "b", "c", "d"],
    },
    profileImg: String,
}, {
    timestamps: true
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client