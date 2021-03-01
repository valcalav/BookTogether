require('dotenv').config()

// DB connection
require('./config/db.config')

// Debug
require('./config/debug.config')

// App
const express = require('express')
const app = express()

// App settings
require('./config/middleware.config')(app)
require('./config/locals.config')(app)
require('./config/cors.config')(app)
require('./config/passport.config')(app)



// Routes index
require('./routes')(app)

// Error handling
require('./config/error-handlers.config')(app)

module.exports = app