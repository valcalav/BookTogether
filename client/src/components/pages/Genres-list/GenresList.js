import React from 'react'

import { Col } from 'react-bootstrap'

import './GenresList.css'

function GenresList() {
    
    return (
        <Col md={4} className="genres-container">
            <h5>Search by genre</h5>
            <hr />
            <ul>
                <li><a href={`/bookclubs-genre-list/action and adventure`}>Action & Adventure</a></li>
                <li><a href="/">Art & Photography</a></li>
                <li><a href="/">Biography</a></li>
                <li><a href="/">Children’s literature</a></li>
                <li><a href={`/bookclubs-genre-list/classics`}>Classics</a></li>
                <li><a href="/">Comics & Graphic Novels</a></li>
                <li><a href="/">Contemporary Fiction</a></li>
                <li><a href="/">Dystopian</a></li>
                <li><a href="/">Essays</a></li>
                <li><a href="/">Fantasy</a></li>
                <li><a href="/">Food & Drink</a></li>
                <li><a href="/">Guide / How-to</a></li>
                <li><a href="/">Historical Fiction</a></li>
                <li><a href="/">History</a></li>
                <li><a href="/">Horror</a></li>
                <li><a href="/">Humanities & Social Sciences</a></li>
                <li><a href="/">Humor</a></li>
                <li><a href="/">LGBTQ+</a></li>
                <li><a href="/">Literary Fiction</a></li>
                <li><a href="/">Magical Realism</a></li>
                <li><a href="/">Memoir & Autobiography</a></li>
                <li><a href="/">Mystery</a></li>
                <li><a href="/">New Adult</a></li>
                <li><a href="/">Parenting & Families</a></li>
                <li><a href="/">Plays & Screenplays</a></li>
                <li><a href="/">Poetry</a></li>
                <li><a href="/">Religion & Spirituality</a></li>
                <li><a href={`/bookclubs-genre-list/romance`}>Romance</a></li>
                <li><a href="/">Science Fiction</a></li>
                <li><a href="/">Science & Technology</a></li>
                <li><a href="/">Self-help</a></li>
                <li><a href="/">Short Story</a></li>
                <li><a href="/">Thriller & Suspense</a></li>
                <li><a href="/">Travel</a></li>
                <li><a href="/">True Crime</a></li>
                <li><a href="/">Women’s Fiction</a></li>
                <li><a href="/">Young Adult</a></li>
            </ul>
        </Col>
    )
}

export default GenresList
