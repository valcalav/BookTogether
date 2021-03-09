import BookClubCard from './BookClubCard'
import { Row } from 'react-bootstrap'


function BookClubsList({ bookClubs }) {
    
    return (
        <Row>
            {bookClubs.allEvents ? bookClubs.allEvents.map(elm => <BookClubCard {...elm} key={elm._id} />) : null }
        </Row>
    )
}

export default BookClubsList
