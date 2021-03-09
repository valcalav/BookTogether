import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'

import ProfileCard from './ProfileCard'
import MyClubsCard from './CreatedClubCard'
import JoinedClubsCard from './JoinedClubCard'
import QuotesPostsCard from '../QuotesPosts/QuotePostsCard'
import CreateQuotePost from '../QuotesPosts/CreateQuotePost'

import './Profile.css'

import BookClubService from '../../../service/bookclubs.service'
import QuotesService from '../../../service/quotes.service'
import { Link } from 'react-router-dom'


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
        setModalShow(false);}

    function handleShow(){
        setModalShow(true);
    } 
    

    return (
        <>
        <Container>
            
            <Row>
                <Col md={4} className="profile-cards">
                    <ProfileCard {...loggedUser} />
                    <div>
                        <Link to='/create-club' className="btn btn-dark">Create a Book Club</Link>
                    </div>
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

                                <Button block variant="primary" onClick={() => setModalShow(true)}>Add quote</Button>

                            </Card.Body>
                        </Card>
                    </Row>
                </Col>

            </Row>

        </Container>

        {
            modalShow === true && <Modal centered show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateQuotePost closeModal={handleClose} loggedUser={loggedUser} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        }

        </>
    )
}

export default Profile
