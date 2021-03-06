import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProfileCard from './Profile-card'
import MyClubsCard from './my-clubs-card'
import './Profile.css'
import BookClubService from '../../../service/bookclubs.service'

const bookClubService = new BookClubService()

function Profile({ loggedUser }) {

    const [userClubs, setUserClubs] = useState([])
    
    useEffect(() => {
        const clubsIds = loggedUser.clubsCreated
        Promise.all(
            clubsIds.map(async (club) => {
              const response = await bookClubService.getBookClubDetails(club)
              setUserClubs( prevState => {
                  console.log('prevState', prevState)
                return [...prevState, response.data];
            })
        }
          ))
    }, [loggedUser])

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
                    
                        {userClubs && userClubs.map((userClub)=> <MyClubsCard clubInfo={userClub} />)}
                    
                    </Row>
                    <h5>Joined clubs</h5>
                    <Row>
                    
                        {userClubs && userClubs.map((userClub)=> <MyClubsCard clubInfo={userClub} />)}
                    
                    </Row>

                </Col>

            </Row>

        </Container>
        </>
    )
}

export default Profile
