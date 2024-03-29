import React from 'react'
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap'

import { GenresObj } from '../../shared/AllGenres'

import './GenresList.css'

function GenresList({handleGenre}) {
    
    return (
        <Col className="genres-container">
            <h5>Search by genre</h5>
            <hr />
            <ul>
                {
                    Object.keys(GenresObj).map((genre, idx) => {
                       return  <li onClick={(genre)=> handleGenre(genre)} key={idx}>{GenresObj[genre]}</li>
                    })
                }
            </ul>
        </Col>
    )
}
// GenresList.PropTypes = {
//     handleGenre: PropTypes.function
//   };

export default GenresList
