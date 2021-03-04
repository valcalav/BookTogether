import React, { useEffect, useState } from 'react'
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap'
import ProfileCard from './Profile-card'
import MyClubsCard from './my-clubs-card'

import './Profile.css'

import BookClubService from '../../../service/bookclubs.service'

function Profile({ loggedUser }) {

    const bookClubService = new BookClubService()


    const [userClubs, setUserClubs] = useState([])
    
    useEffect(() => {
        const clubsIds = loggedUser.clubsCreated
        Promise.all(
            clubsIds.map(async (club) => {
              const response = await   bookClubService.getBookClubDetails(club)
              setUserClubs( prevState => {
                  console.log('prevState', prevState)
                return [...prevState, response.data];
            })
        }
          ))
    }, [])
    return (
        <>
        <Container>
            
            <Row>
                <Col md={4} className="profile-cards">
                    <ProfileCard {...loggedUser} />
                </Col>
                <Col md={6}>
                    <h5>Created clubs</h5>

                    {userClubs && userClubs.map((userClub)=> <MyClubsCard clubInfo={userClub} />)}

                </Col>

            </Row>

        </Container>
        </>
    )
}

export default Profile
