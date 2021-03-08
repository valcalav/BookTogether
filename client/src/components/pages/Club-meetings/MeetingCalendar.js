import React, { useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

function MeetingCalendar(props) {

    const {
        createMeeting,
        setCreateMeeting
    } = props

    const [dateState, setDateState] = useState(new Date())

    function changeDate(e) {
        setDateState(e)
        let meetingDate = moment(dateState).format('MMMM Do YYYY')
        setCreateMeeting({...createMeeting, date: meetingDate})
        console.log("esto es:", meetingDate)
    }

    return (
        <div>
            <Calendar value={dateState} onChange={changeDate} />

            <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
            
        </div>
    )
}

export default MeetingCalendar
