import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import '../Profile/Profile.css'

import MyClubsCard from '../Profile/ProfileClubCard'

import BookClubService from '../../../service/bookclubs.service'


function AllMyClubsPage(props) {

    const { loggedUser } = props

    const bookClubService = new BookClubService()

    const [userClubs, setUserClubs] = useState([])
    const [userJoinedClubs, setUserJoinedClubs] = useState([])
    
    useEffect(() => {
        props.fetchUser()
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

    return (
        <Container className="all-my-clubs-container">
            <Row>
                <Col lg={12}>
                    <div className="my-clubs-header">
                        <h5>Created clubs</h5>
                        <Link to='/create-club' className="btn btn-outline-info">Create a Book Club</Link>
                    </div>
                    <hr />
                </Col>
                {
                    userClubs && userClubs.map((userClub, idx)=> <MyClubsCard clubInfo={userClub} key={idx} />)
                }
                <Col lg={12}>
                    <div className="my-clubs-header">
                        <h5>Joined clubs</h5>
                        <Link to='/bookclubs-list' className="btn btn-outline-info">Join a Book Club</Link>
                    </div>
                    <hr />
                </Col>
                {
                    userJoinedClubs && userJoinedClubs.map((userClub, idx)=> <MyClubsCard clubInfo={userClub} key={idx} />)
                }
            </Row>
        </Container>
    )
}

export default AllMyClubsPage
