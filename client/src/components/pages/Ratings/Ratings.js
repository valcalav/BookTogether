import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";

import '../ClubDashboard/ClubDashboard.css'

import BookClubService from '../../../service/bookclubs.service'
import RatingsService from '../../../service/ratings.service'

function BookRatings(props) {
    
    const { bookTitle, loggedUser, owner, clubStatus, setBookClubInfo, bookClubInfo, match, params } = props

    const [ratingEnabled, setRatingEnabled] = useState(undefined)
    const [ratingScore, setRatingScore] = useState(0)
    const [ratingLoading, setRatignLoading] = useState(true)
    const [ratingInfo, setRatingInfo] = useState([])

    const bookClubService = new BookClubService()
    const ratingService = new RatingsService()
    
    useEffect(() => {
        setRatingEnabled(clubStatus)
        findCurrentRating()
    }, [clubStatus])

    const findCurrentRating = () => {
        if (!clubStatus) {
            setRatingScore(0)
        } else if (clubStatus) {
            setRatignLoading(true)
            ratingService
                .findRatings(match.params.bookClub_id)
                .then(response => {
                    setRatingInfo(response.data[0])
                    setRatingScore(response.data[0].rating)
                    setRatignLoading(false)
                })
                .catch(err => {
                    setRatignLoading(false)
                    console.log(err)
                })
        }
    }

    const enableRating = () => {
        bookClubService
        .editClubStatus(match.params.bookClub_id)
        .then(() => {
            setBookClubInfo({...bookClubInfo, clubClosed: true })
        })
        .catch(err => console.log(err))
        
        ratingService
        .newRatings(match.params.bookClub_id)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    
    const ratingChanged = (score) => {
        let newScore = 0

        if (ratingInfo.voters.length === 0) {
            newScore = score + ratingScore
        } else {
            newScore = score + ratingScore / ratingInfo.voters.length
        }

        const newRating = {
            rating: newScore
        }

        ratingService
            .editRatings(bookClubInfo.bookRating, newRating)
            .then(() => console.log('Edit done'))
            .catch(err => console.log(err))
    };

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
                        { !ratingLoading && 
                        <>
                            <ReactStars count={5}
                            onChange={ratingChanged}
                            value={ratingScore}
                            size={64}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffbf00"/>
                            <small>Participants average rating of the book</small>
                        </>
                        }
                        </Card.Text> 
                        
                    </Card.Body>
                </Card>
            </>
        }
        </div>
    )
}

export default BookRatings