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

    passport.serializeUser((user, next) => {
        console.log(user)
        next(null, user._id)})
    
    passport.deserializeUser((id, next) => {
        console.log(id, "----------------------------------------------------------------------------- deseriliaze")
        Promise.all([User.findById(id), Reader.findById(id)])
        .then(res => {
            if(res[0]) next(null, res[0])
            else if(res[1]) next(null, res[1])
            else next(new Error("no user"))
        })
        .catch(err => next(err))
        
        // User
        //     .findById(id, (err, user) => {
        //         if (err) { 
        //             next(err); 
        //             return
        //         }
        //         else if (!user) {
        //             Reader
        //                 .findById(id, (err, user) => {
        //                     if (err) { 
        //                         next(err); 
        //                         return
        //                     }
        //                 next(null, user);
        //             });
        //         } else {
        //             next(null, user);
        //         }
        //     });
    })

    app.use(flash())

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        Promise.all([ User.findOne({username: username}), Reader.findOne({ "userInfo.username": username })])
            .then( res => {
                if(res[0]) next(null, res[0])
                else if(res[1]) next(null, res[1])
                else {
                    if(!bcrypt.compareSync( password, user.userInfo.password)) next(null, false, {message: "Incorrect password"})
                    else next(null, false, {message: ":ncorrect username"})
                }
            })
            .catch(err => res.status(500).json(err))
        // User.findOne({username: username})
        //     .then(user => {
        //         if (user) {
        //             return next(null, user)
        //         } else {
        //             return Reader
        //                 .findOne({ "userInfo.username": username }, (err, user) => {
        //                 if (err) {
        //                     return next(err);
        //                 }
        //                 if (!user) {
        //                     return next(null, false, { message: "Incorrect username" });
        //                 }
        //                 if (!bcrypt.compareSync( password, user.userInfo.password)) {
        //                     return next(null, false, { message: "Incorrect password" });
        //                 }
            
        //                 return next(null, user);
        //             })
        //     }})
        // .catch(err => res.status(500).json(err))
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}