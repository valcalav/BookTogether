module.exports = app => {

    // Catch 404 error in case no route matches and render not-found template
    app.use((req, res) => res.status(404).json({ code: 404, message: 'Not found' }))

    // Catch 500 error in case of server error, log it and render error template
    app.use((err, req, res) => {
        console.error('Server error:', req.method, req.path, err)
        if (!res.headersSent) {
            res.status(500).json({ code: 500, message: 'Server error' })
        }
    })
}