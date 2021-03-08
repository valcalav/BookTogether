import { Card, ButtonGroup } from 'react-bootstrap'

import { Link } from 'react-router-dom'

function ProfileCard({ userInfo, firstName, lastName, profileImg, country, favoriteGenre, _id }) {

    return (
        
            <Card className="clubs-card">
                <Card.Img variant="top" src={profileImg} />
                <Card.Body>
                    <h5>{firstName} {lastName} </h5>
                    <h6>{userInfo.username}</h6>
                    <p> <strong>Email:</strong> {userInfo.email} </p>
                    {country && <p>{country}</p>}
                    {favoriteGenre && <p>Favorite genre: {favoriteGenre}</p>}       

                    <ButtonGroup size="sm" style={{ width: '100%' }}>
                        <Link to={`/edit-profile/${_id}`} className="btn btn-dark">Edit</Link>
                    </ButtonGroup>

                </Card.Body>
            </Card>
    )
}

export default ProfileCard