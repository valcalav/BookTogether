import React, { useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

function MeetingCalendar({createMeeting, setCreateMeeting}) {


    const [dateState, setDateState] = useState(new Date())

    function changeDate(e) {
        let meetingDate = moment(e).format('MMMM Do YYYY')
        setCreateMeeting({...createMeeting, date: meetingDate})
        setDateState(e)    
    }

    return (
        <div>
            <Calendar value={dateState} onChange={changeDate} />

            <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
            
        </div>
    )
}

export default MeetingCalendar
