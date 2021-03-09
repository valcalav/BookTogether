const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'project.booktogether@gmail.com',
        pass: 'Ironhack0121'
    }
})