import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

import ProfileCard from './ProfileCard'
import MyClubsCard from './CreatedClubCard'
import JoinedClubsCard from './JoinedClubCard'
import QuotesPostsCard from '../QuotesPosts/QuotesPostsCard'

import './Profile.css'

import BookClubService from '../../../service/bookclubs.service'
import QuotesService from '../../../service/quotes.service'


function Profile(props) {

    const { loggedUser } = props

    const bookClubService = new BookClubService()
    const quotesService = new QuotesService()

    const [userClubs, setUserClubs] = useState([])
    const [userJoinedClubs, setUserJoinedClubs] = useState([])
    const [quotePost, setQuotePost] = useState([])
    
    useEffect(() => {
        props.fetchUser()
        favoriteQuotes()
        bookClubsCreated()
        bookClubsJoined()
    }, [])
    
    function bookClubsCreated() {
        const clubsIds = loggedUser.clubsCreated
        Promise.all(
            clubsIds.map(async (club) => {
              const response = await bookClubService.getBookClubDetails(club)
              setUserClubs( prevState => {
                return [...prevState, response.data];
            })
        }))
    }

    function bookClubsJoined() {
        const joinedClubsIds = loggedUser.clubsJoined
        Promise.all(
            joinedClubsIds.map(async (club) => {
                const response = await bookClubService.getBookClubDetails(club)
                setUserJoinedClubs( prevState => {
                    return [...prevState, response.data]
                })
            })
        )
    }

    function favoriteQuotes() {
        quotesService.getAllUserQuotes(loggedUser._id)
            .then(response => {
                let data = response.data
                setQuotePost(data)  
            })
            .catch(err => console.log(err))
    }

    return (
        <>
        <Container>
            
            <Row>
                <Col md={4} className="profile-cards">
                    <ProfileCard {...loggedUser} />
                </Col>
                <Col>
                    <h5>Created clubs</h5>
                    <hr />
                    <Row>
                        {userClubs && userClubs.map((userClub, idx)=> <MyClubsCard clubInfo={userClub} key={idx} />)}
                    </Row>

                    <h5>Joined clubs</h5>
                    <hr />
                    <Row>
                        {userJoinedClubs && userJoinedClubs.map((userClub, idx)=> <JoinedClubsCard clubInfo={userClub} key={idx} />)}
                    </Row>
                    <Row>
                        <Card className="card-quotes" >
                            <Card.Header as="h5">Favorite Quotes</Card.Header>
                            <Card.Body>
                                {quotePost.posts && quotePost.posts.map((quote, idx) => <QuotesPostsCard quoteInfo={quote} key={idx} />)}
                    
                                <Button block variant="primary">Add quote</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>

            </Row>

        </Container>
        </>
    )
}

export default Profile
