import React from 'react'

import { Col } from 'react-bootstrap'

import { GenresObj } from '../../shared/AllGenres'

import './GenresList.css'

function GenresList() {
    
    return (
        <Col className="genres-container">
            <h5>Search by genre</h5>
            <hr />
            <ul>
                {
                    Object.keys(GenresObj).map((key, idx) => ( <li key={idx}><a href={`/bookclubs-genre-list/${key}`}>{GenresObj[key]}</a></li>))
                }
            </ul>
        </Col>
    )
}

export default GenresList
