const express = require('express')
const router = express.Router()

const quotesPost = require('./../models/quotes.model')

//Endpoints


//New quote-post
router.post('/newQuote', (req, res) => {

    const newQuote = req.body

    quotesPost
        .create(newQuote)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving new post'}))
})

// All quotes posted by user
router.get('/:user_id', (req, res) => {

    const user_id = req.params.user_id

    quotesPost
        .find( {postedBy: req.user._id} )
        .then(posts => res.json({posts}))
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching posts'}))
})

// Edit quote-post
router.put('/editQuote/:quotePost_id', (req, res) => {

    quotesPost
        .findByIdAndUpdate(req.params.quotePost_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing post'}))
})

// Delete quote-post
router.delete('/delete/:quotePost_id', (req, res) => {

    quotesPost
        .findByIdAndDelete(req.params.quotePost_id, req.body)
        .then(() => res.json({message: 'Post deleted'}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting post'}))
})

module.exports = router