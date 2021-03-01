const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')

//Endpoints


//Book clubs list
router.get('/allBookClubs', (req, res) => {

    Event
        .find()
        .then(allEvents => res.json({allEvents}))
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Book Clubs', err}))

})

//Book clubs list by genre
router.get('/:genre', (req, res) => {

    const genre = req.params.genre

    Event
        .find( genre )
        .then(bookClubs => { res.json(bookClubs) })
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Book Clubs', err}))
})

//Book club details
router.get('/details/:bookClub_id', (req, res) => {

    const bookClub_id = req.params.bookClub_id

    Event
        .findById(bookClub_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message:'Error fetching Book Club', err}))
})

//New Book club
router.post('/newBookClub', (req, res) => {
    // console.log("Req user es:", req.user)

    const club = { ...req.body, owner: req.user._id }

    Event
        .create(club)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code:500, message:'Error saving new Book Club', err}))
})

//Edit Book club
router.put('/editBookClub/:bookClub_id', (req, res) => {

    Event
        .findByIdAndUpdate(req.params.bookClub_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code:500, message: 'Error editing Book Club', err}))
})

//Delete Book Club
router.delete('/delete/:bookClub_id', (req, res) => {

    Event
        .findByIdAndDelete(req.params.bookClub_id, req.body)
        .then(()=> res.json({message: 'Book Club deteled.'}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting BookClub', err}))
})



module.exports = router