import { Card, ButtonGroup } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import placeIcon from '../../../images/places.png'
import email from '../../../images/email.png'

function ProfileCard({ userInfo, firstName, lastName, profileImg, country, favoriteGenre, _id }) {

    return (
            
            <Card className="profile-card-img">
                <Card.Img className="profile-img" variant="top" src={profileImg} />
                <Card.Body className="profile-card-body">
                    <h5>{firstName} {lastName} </h5>
                    <h6>{userInfo.username}</h6>
                    <p><img src={email} alt="email-icon" /> {userInfo.email} </p>
                    {country && <p><img src={placeIcon} alt="place-icon" /> {country}</p>}
                    {favoriteGenre && <p><strong>Favorite genre:</strong> {favoriteGenre}</p>}       

                    <ButtonGroup className="mt-auto" size="sm" style={{ width: '100%' }}>
                        <Link to={`/edit-profile/${_id}`} className="btn btn-light btn-edit">Edit</Link>
                    </ButtonGroup>

                </Card.Body>
            </Card>
    )
}

export default ProfileCard