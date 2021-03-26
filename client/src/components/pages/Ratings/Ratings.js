import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

import '../ClubDashboard/ClubDashboard.css'

function BookRatings({ bookTitle, loggedUser, owner }) {
    
    const [ratingEnabled, setRatingEnabled] = useState(false)
    const [rating, setRating] = useState(0)

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    return (
        <div>
        {
            !ratingEnabled ?
            <>
                {
                    owner === loggedUser._id && <>
                        <Card>
                            <Card.Header>Done reading? Rate the book !</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    When done reading the book, enable this section so that all participants rate <strong>"{bookTitle}"</strong>.
                                    <hr />
                                </Card.Text>
                                <Button block variant="outline-danger" onClick={() => setRatingEnabled(true)}>Finished book, enable book rating</Button>
                                <small>Once this section is enabled, the Club will be categorized as "Closed"</small>
                            </Card.Body>
                        </Card>
                    </>
                }
            </>
            :
            <>
                <Card>
                    <Card.Header>Done reading? Rate the book !</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Rate <strong>"{bookTitle}"</strong>
                            Rating:
                            <ReactStars count={5}
                            onChange={ratingChanged}
                            size={44}
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