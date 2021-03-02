import React, { useEffect, useState} from 'react'
import { Col } from 'react-bootstrap'


import BookClubCard from './Book-club-card'

function BookClubsList({ bookClubs }) {
    
    return (
        <>
            {bookClubs.allEvents ? bookClubs.allEvents.map(elm => <BookClubCard {...elm} key={elm._id} />) : null }
        </>
    )
}

export default BookClubsList
