// // DB connection
// require('./../config/db.config')


// Seed here!
const mongoose = require("mongoose")
const { User } = require("./../models/user.model")
const Client = require("./../models/client.model")

const dbName = 'bookclub-app'
mongoose.connect(`mongodb://localhost/${dbName}`)

const bcrypt = require("bcrypt")
const bcryptSalt = 10

// const password = "toto"
// const salt = bcrypt.genSaltSync(bcryptSalt)
// const hashPass = bcrypt.hashSync(password, salt)

// const client = [
//     {
//         userInfo: {
//             email: "toto@toto.com",
//             username: "toto",
//             password: password,
//         },
//         role: "CLIENT",
//         firstName: "toto",
//         lastName: "toto",       
//     },
    
// ]

// Client
//     .create(client)
//     .then(response => {
//         console.log("Number of clients created:", response.length)
//         // mongoose.connection.close()
//     })
//     .catch(err => console.log("Error", err))


const password = "catboss"
const salt = bcrypt.genSaltSync(bcryptSalt)
const hashPass = bcrypt.hashSync(password, salt)


const admin = {
    email: "catboss@catboss.com",
    username: "catboss",
    password: password,
    role: "ADMIN"
}

User
    .create(admin)
    .then(response => {
        console.log("We have catboss")
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
