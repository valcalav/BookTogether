module.exports = app => {

    // Base URLS
    app.use('/api/bookclubs', require('./bookclubs.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
}