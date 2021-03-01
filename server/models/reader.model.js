const mongoose = require('mongoose');
const { userSchema } = require ('./user.model')
const Schema = mongoose.Schema

const readerSchema = new Schema({
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
        enum: ["fantasy", "science fiction", "dystopian", "action and adventure", "mystery", "horror", "thriller and suspense", "historical fiction", "romance", "womens fiction", "LGBTQ+", "classics", "contemporary fiction", "plays and screenplays", "poetry", "literary fiction", "magical realism", "comics and graphic novels", "short story", "young adult", "new adult", "childrens literature", "memoir and autobiography", "biography", "food and drink", "art and photography", "self-help", "history", "travel", "true crime", "humor", "essays", "guide how-to", "religion and spirituality", "humanities and social sciences", "parenting and families", "science and technology"],
    },
    profileImg: String,
    myBookClubs: {
        type: [String]
    }
}, {
    timestamps: true
})

const Reader = mongoose.model('Reader', readerSchema)
module.exports = Reader