import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProfileCard from './ProfileCard'
import MyClubsCard from './CreatedClubCard'
import JoinedClubsCard from './JoinedClubCard'
import './Profile.css'
import BookClubService from '../../../service/bookclubs.service'


function Profile(props) {

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
                return [...prevState, response.data];
            })
        }))
    }

    function bookClubsJoined() {
        const joinedClubsIds = loggedUser.clubsJoined
        console.log(joinedClubsIds, 'joinedClubsIds')
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
        <>
        <Container>
            
            <Row>
                <Col md={4} className="profile-cards">
                    <ProfileCard {...loggedUser} />
                </Col>
                <Col>
                    <h5>Created clubs</h5>
                    <Row>
                        {userClubs && userClubs.map((userClub, idx)=> <MyClubsCard clubInfo={userClub} key={idx} />)}
                    </Row>

                    <h5>Joined clubs</h5>
                    <Row>
                        {userJoinedClubs && userJoinedClubs.map((userClub, idx)=> <JoinedClubsCard clubInfo={userClub} key={idx} />)}
                    </Row>

                </Col>

            </Row>

        </Container>
        </>
    )
}

export default Profile
