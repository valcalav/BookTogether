const express = require('express')
const router = express.Router()

const Event = require('../models/event.model')
const Reader = require('../models/reader.model')

//Endpoints




//Join Book Club
router.put('/joinBookClub/:bookClub_id', (req, res) => {

    //Cero segura de que esto es así ... Hago un Reader.find() primero ?... solo si quiero pasar otra info aparte del ID... 
    //AQUI UN PROMISE ALL !

    Event
        .findByIdAndUpdate(req.params.bookClub_id, { $push: { participants: req.user._id }}, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({code: 500, message: 'Error joining Book Club'}))

    Reader
        .findByIdAndUpdate(req.user._id, { $push: { myBookClubs: req.params.bookClub_id }}, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({code: 500, message: 'Error updating user'}))

})

//Leave Book Club



module.exports = router