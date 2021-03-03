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
        const clubId = loggedUser.myBookClubs
        const getUserClubDetails = () => {
            clubId.map(elm => {
                bookClubService
                    .getBookClubDetails(elm)
                    .then(res => {
                        setUserClubs(prevState => {
                            return {...prevState, ...res};
                          })
                    })
            })
        }
        getUserClubDetails()
    }, [])

    return (
        <>
        <Container>
            
            <Row>
                <Col md={4} className="profile-cards">
                    <ProfileCard {...loggedUser} />
                </Col>
                <Col md={6}>
                    <h5>My book clubs</h5>
                    <p>
                    {
                        userClubs.data ? <MyClubsCard clubInfo={userClubs.data} /> : null
                    }
                    
                    
                    </p>
                </Col>

                

            </Row>

        </Container>
        </>
    )
}

export default Profile
