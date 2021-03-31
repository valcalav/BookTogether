import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ProfileCard from './ProfileCard'
import MyClubsCard from './ProfileClubCard'
import QuotesPostsCard from '../QuotesPosts/QuotePostsCard'
import CreateQuotePost from '../QuotesPosts/CreateQuotePost'

import './Profile.css'

import quoteImg from '../../../images/quotes-icon.png'

import BookClubService from '../../../service/bookclubs.service'
import QuotesService from '../../../service/quotes.service'

function Profile(props) {

    const { loggedUser } = props

    const bookClubService = new BookClubService()
    const quotesService = new QuotesService()

    const [userClubs, setUserClubs] = useState([])
    const [userJoinedClubs, setUserJoinedClubs] = useState([])
    const [quotePost, setQuotePost] = useState([])
    const [modalShow, setModalShow] = useState(false)
    
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
                return response.data ? [...prevState, response.data] : [...prevState];
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

    function handleClose(){
        setModalShow(false)
    }
    

    return (
        <>
        <Container className="profile-container" fluid>
            
            <Row>
                <Col lg={{ span: 3, offset: 1 }}>
                    <ProfileCard {...loggedUser} />
                </Col>
                <Col lg={{ span: 7, pull: 1 }}>
                    <div className="my-clubs-header">
                        <h5>Created clubs</h5>
                        <Link to='/create-club' className="btn btn-outline-info">Create a Book Club</Link>
                    </div>
                    <hr />
                    <Row>
                        {
                            userClubs && userClubs.slice(0, 4).map((userClub, idx)=> <MyClubsCard clubInfo={userClub} key={idx} />)
                        }
                    </Row>

                    <div className="my-clubs-header">
                        <h5>Joined clubs</h5>
                        <Link to='/bookclubs-list' className="btn btn-outline-info">Join a Book Club</Link>
                    </div>
                    <hr />
                    <Row>
                        {
                            userJoinedClubs && userJoinedClubs.slice(0, 4).map((userClub, idx)=> <MyClubsCard clubInfo={userClub} key={idx} />)
                        }
                    </Row>
                    <Row>
                        <Card className="card-quotes" >
                            <Card.Header as="h5">
                            <img src={quoteImg} alt="quotes-icon"/>
                            Favorite Quotes</Card.Header>
                            <Card.Body>
                                {quotePost.posts && quotePost.posts.map((quote, idx) => <QuotesPostsCard quoteInfo={quote} key={idx} />)}

                                <Button block className="mt-auto" variant="info" onClick={() => setModalShow(true)}>Add quote</Button>

                            </Card.Body>
                        </Card>
                    </Row>
                </Col>

            </Row>

        </Container>

        {
            modalShow === true && <Modal centered show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img src={quoteImg} alt="quotes-icon"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateQuotePost refreshList={() => favoriteQuotes()} closeModal={handleClose} loggedUser={loggedUser} {...props} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        }

        </>
    )
}


export default Profile
