const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        enum: ["ADMIN", "READER"],
        default: "READER"
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = {
    userSchema, User
}