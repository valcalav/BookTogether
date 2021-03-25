const express = require('express')
const router = express.Router()

const Ratings = require('../models/ratings.model')
const Event = require('./../models/event.model')

//Endpoints

//Find ratings by Book Club

router.get('/getRatings/:club_id', (req, res) => {
    const bookClub = req.params.bookClub

    Ratings
        .find({bookClub})
        .then(rating => {res.json(rating)})
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Rating', err}))
})

//Edit ratings

router.put('/editRatings/:rating_id', (req, res) => {

    const user_id = req.user._id
    //console.log(req.body)
    //TO DO: IF USER ALREADY VOTED HE CANT VOTE AGAIN.

    Ratings
        .findByIdAndUpdate(req.params.rating_id, req.body, { $push: {voters: user_id}})
        .then(rating => res.json(rating))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing rating'}))
})

//Create ratings

router.post(':event_id/createRating', (req, res) =>{
    const event_id = req.params.event_id
    const user_id = req.user._id
    const ratingData = { ...req.body, bookClub: event_id }

    Event
        .findById(event_id)
        .then(response => {
            let emailList = response.participantsEmails
            return emailList
        })
        .then(emailList => {
            Ratings
                .createAndAssingToEvent(ratingData, event_id, emailList, user_id)
                .then(rating => res.json(rating))
                .catch(err => res.status(500).json({code: 500, message: 'Error'}))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ code: 500, message: 'Error creating rating'})
        })

})

module.exports = router