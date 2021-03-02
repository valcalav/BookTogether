const cors = require('cors')

const whitelist = [process.env.DOMAIN]


const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    },
    credentials: true
}


module.exports = app => app.use(cors(corsOptions))