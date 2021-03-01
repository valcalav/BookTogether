const express = require('express')
const router = express.Router()

const QuotesPost = require('./../models/quotes.model')

//Endpoints


//New quote-post
router.post('/newQuote', (req, res) => {

    const newQuote = { ...req.body, postedBy: req.user._id }

    QuotesPost
        .create(newQuote)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving new post', err}))
})

// All quotes posted by user
router.get('/myQuotes/:user_id', (req, res) => {

    const user_id = req.params.user_id

    QuotesPost
        .find( {postedBy: req.user._id} )
        .then(posts => res.json({posts}))
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching posts', err}))
})

// Edit quote-post
router.put('/editQuote/:quote_id', (req, res) => {

    QuotesPost
        .findByIdAndUpdate(req.params.quote_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing post', err}))
})

// Delete quote-post
router.delete('/delete/:quotePost_id', (req, res) => {

    QuotesPost
        .findByIdAndDelete(req.params.quotePost_id, req.body)
        .then(() => res.json({message: 'Post deleted'}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting post'}))
})

module.exports = router