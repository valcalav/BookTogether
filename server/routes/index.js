module.exports = app => {

    // Base URLS
    app.use('/api/bookclubs', require('./bookclubs.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/quotes', require ('./quotes.routes'))
    app.use('/api/meetings', require ('./meetings.routes'))
    app.use('/api/user', require ('./reader.routes'))
}