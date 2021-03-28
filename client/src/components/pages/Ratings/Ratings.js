import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";

import '../ClubDashboard/ClubDashboard.css'

import BookClubService from '../../../service/bookclubs.service'

function BookRatings({ bookTitle, loggedUser, owner, clubId, clubStatus }) {
    
    const [ratingEnabled, setRatingEnabled] = useState(undefined)
    const [rating, setRating] = useState(0)

    const bookClubService = new BookClubService()

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    useEffect(() => {
        setRatingEnabled(clubStatus)
    })

    const enableRating = () => {
        bookClubService
            .editClubStatus(clubId)
            .then(response => {
                console.log('esta es la respuesta del edit status', response)
            })
            .catch(err => console.log(err))
    }
    

    return (
        <div>
        {
            !ratingEnabled ?
            <>
                {
                    owner === loggedUser._id && <>
                        <Card className="ratings-card">
                            <Card.Header>Done reading? Rate the book !</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    When done reading the book, enable this section so that all participants rate <strong>"{bookTitle}"</strong>.
                                    <hr />
                                </Card.Text>
                                <Button block variant="outline-danger" onClick={() => enableRating()}>Finished book, enable book rating</Button>
                                <small>Once this section is enabled, the Club will be categorized as "Closed"</small>
                            </Card.Body>
                        </Card>
                    </>
                }
            </>
            :
            <>
                <Card className="ratings-card">
                    <Card.Header>Done reading? Rate <strong>"{bookTitle}"</strong> !</Card.Header>
                    <Card.Body className="rating-stars">
                        <Card.Text >
                            <ReactStars count={5}
                            onChange={ratingChanged}
                            size={64}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffbf00"/>
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </>
        }
        </div>
    )
}

export default BookRatings