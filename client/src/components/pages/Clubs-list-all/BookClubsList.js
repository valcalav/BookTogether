import BookClubCard from './BookClubCard'
import { Row } from 'react-bootstrap'


function BookClubsList({ bookClubs }) {
    
    return (
        <Row>
            {bookClubs ? bookClubs.map(elm => <BookClubCard {...elm} key={elm._id} />) : null }
        </Row>
    )
}

export default BookClubsList
