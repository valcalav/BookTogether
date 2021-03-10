const express = require('express')
const router = express.Router()
const NYTimesAPI = require('../config/nytimesapi.config')

const bestsellersHandler = new NYTimesAPI()

//Endpoints

//Fiction bestsellers
router.get('/fiction', (req, res) => {
    bestsellersHandler
        .getListFiction()
        .then(bestsellers => { 
            res.json(bestsellers.data) })
        .catch(err => {
            console.log(err)
            res.status(500).json({code: 500, message: 'Error fetching nonfiction bestsellers', err})})
})

//Non-fiction Bestsellers
router.get('/non-fiction', (req, res) => {
    bestsellersHandler
        .getListNonFiction()
        .then(bestsellers => { 
            res.json(bestsellers.data) })
        .catch(err => {
            console.log(err)
            res.status(500).json({code: 500, message: 'Error fetching nonfiction bestsellers', err})})
})

module.exports = router