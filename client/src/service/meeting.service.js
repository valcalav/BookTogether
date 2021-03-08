import axios from 'axios'

class MeetingService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/meetings`,
            withCredentials: true
        })
    }

    newMeeting = (bookClub_id, meetingDetails) => this.api.post(`/${bookClub_id}/createMeeting`, meetingDetails)
    
    editMeeting = (meeting_id, meetingDetails) => this.api.put(`/editMeeting/${meeting_id}`, meetingDetails)

    deleteMeeting = meeting_id => this.api.delete(`/delete/${meeting_id}`)

    findMeetings = bookClub_id => this.api.get(`/findMeetings/${bookClub_id}`)

    findOne = meeting_id => this.api.get(`/details/${meeting_id}`)

}

export default MeetingService