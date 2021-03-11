const session = require("express-session")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash")


const { User } = require('../models/user.model')
const Reader = require("../models/reader.model")


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

                if (err) { 
                    next(err); 
                    return
                }
                else if (!user) {
                    Reader
                        .findById(id, (err, user) => {
                            if (err) { 
                                next(err); 
                                return
                            }
                        next(null, user);
                    });
                } else {
                    next(null, user);
                }
            });
    })

    app.use(flash())

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
    
        User.findOne({username: username})
            .then(user => {
                if (user) {
                    return next(null, user)
                } else {
                    return Reader
                        .findOne({ "userInfo.username": username }, (err, user) => {
                        if (err) {
                            return next(err);
                        }
                        if (!user) {
                            return next(null, false, { message: "Incorrect username" });
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