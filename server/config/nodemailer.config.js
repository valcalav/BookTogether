const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'project.booktogether@gmail.com',
        pass: `${process.env.NODEMAILER_PW}`
    }
})