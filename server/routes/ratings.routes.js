const express = require('express')
const router = express.Router()

const Ratings = require('../models/ratings.model')
const Event = require('./../models/event.model')

//Endpoints

//Find ratings by Book Club

router.get('/getRatings/:event_id', (req, res) => {
    const event_id = req.params.event_id

    Ratings
        .find({ bookClub: event_id })
        .then(rating => res.json(rating))
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Rating', err}))
})

//Edit ratings

router.put('/editRatings/:rating_id', (req, res) => {

    console.log("this is req.body", req.body)
    console.log('this is req.user', req.user)
    console.log('este es el id del rating', req.params.rating_id)

    const user_id = req.user._id
    const rating_id = req.params.rating_id

    // Ratings
    //     .findByIdAndUpdate(rating_id, {$set: req.body, $push: {voters: user_id}})
    //     .then(rating => {
    //         console.log('funciona', rating)
    //         res.json(rating)})
    //     .catch(() => res.status(500).json({ code: 500, message: 'Error editing rating'}))

    Ratings
        .findById(rating_id)
        .then(rating => {
            console.log('esta es la primera respuesta', rating)

            if (rating.voters.length === 0) {
                Ratings
                        .findByIdAndUpdate(rating_id, {$set: req.body, $push: {voters: user_id}})
                        .then(editedRating => {
                            console.log('funciona', editedRating)
                            res.json(editedRating)})
                        .catch(() => res.status(500).json({ code: 500, message: 'Error editing rating'}))
            } else {
                rating.voters.map(elm => {
                if (elm.includes(user_id)) {
                    res.json({ message: 'Sorry, this book was already rated.'})
                } else {
                    Ratings
                        .findByIdAndUpdate(rating_id, {$set: req.body, $push: {voters: user_id}})
                        .then(editedRating => {
                            console.log('funciona', editedRating)
                            res.json(editedRating)})
                        .catch(() => res.status(500).json({ code: 500, message: 'Error editing rating'}))
                }
            })
            }
        }) 
        .catch(err => res.status(500).json({code: 500, message: 'Error'}))
})

//Create ratings

router.post('/:event_id/createRatings', (req, res) =>{
    const event_id = req.params.event_id
    const user_id = req.user._id

    Event
        .findById(event_id)
        .then(response => {
            let emailList = response.participantsEmails
            return emailList
        })
        .then(emailList => {
            Ratings
                .createAndAssingToEvent(event_id, emailList, user_id)
                .then(rating => {
                    res.json(rating)})
                .catch(err => res.status(500).json({code: 500, message: 'Error'}))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ code: 500, message: 'Error creating rating'})
        })

})

module.exports = router