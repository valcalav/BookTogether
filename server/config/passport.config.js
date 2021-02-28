const session = require("express-session")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash")


const { User } = require('../models/user.model')
const Client = require("../models/client.model")


module.exports = app => {

    app.use(session({
        secret: "passport-bookclub",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((user, next) => next(null, user._id))
    
    passport.deserializeUser((id, next) => {
        User
            .findById(id, (err, user) => {
                if (err) { return next(err); }
                else if (!user) {
                    Client
                        .findById(id, (err, user) => {
                        if (err) { return next(err); }
                        next(null, user);
                    });
                } else {
                    next(null, user);
                }
            });
    })

    app.use(flash())

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {

        User
            .findOne({'email' : username})
            .then(user => {
                if (user) {
                    return next(null, user)
                } else {
                    Client
                        .findOne({ 'userInfo.email' : username }, (err, user) => {
                        if (err) {
                            return next(err);
                        }
                        if (!user) {
                            return next(null, false, { message: "Incorrect email" });
                        }
                        if (!bcrypt.compareSync( password, user.userInfo.password)) {
                            return next(null, false, { message: "Incorrect password" });
                        }
            
                        return next(null, user);
                    })
            }})
            .catch(err => res.status(500).json(err))
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}