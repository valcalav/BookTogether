const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')
const Reader = require('./../models/reader.model')

//Endpoints


//Book clubs list
router.get('/allBookClubs', (req, res) => {

    Event
        .find()
        .select('bookClubName bookTitle bookAuthor startDate participants imgBookCover')
        .then(allEvents => res.json({allEvents}))
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Book Clubs', err}))

})

//Book clubs list by genre
router.get('/allBookClubs/:genre', (req, res) => {

    const genre = req.params.genre

    Event
        .find({genre})
        .then(bookClubs => { res.json(bookClubs) })
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Book Clubs', err}))
})

//Book clubs list by language
router.get('/allBookClubs/language/:language', (req, res) => {

    const language = req.params.language

    Event
        .find({language})
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

    console.log('ESTE ES EL REQ USER', req.user)
    const club = { ...req.body, owner: req.user._id }
    const userId = req.user._id

    Event.createAndAssingToReader(club, userId)
    .then((response) => res.json(response))
    .catch(err => res.status(500).json({code:500, message:'Error'}))
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

    Reader
        .findByIdAndUpdate(req.user._id, { $pull: { clubsCreated: req.params.bookClub_id}}, { new: true })
        .then(() => {
            Event
                .findByIdAndDelete(req.params.bookClub_id)
                .then(() => {
                    res.json({message: 'Book club deleted'})
                })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting BookClub', err}))
})


module.exports = router