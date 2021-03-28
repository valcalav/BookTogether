import axios from 'axios'

class BookClubService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/bookclubs`,
            withCredentials: true
        })
    }

    getAllBookClubs = () => this.api.get('/allBookClubs')
    
    getAllBookClubsByGenre = genre => this.api.get(`/allBookClubs/${genre}`)

    getAllBookClubsByLanguage = language => this.api.get(`/allBookClubs/language/${language}`)

    getBookClubDetails = bookClub_id => this.api.get(`/details/${bookClub_id}`)

    getCreatedClubs = user_id => this.api.get(``)
    //owner
    getJoinedClubs = user_id => this.api.get(``)
    //participants

    newBookClub = bookClubDetails => this.api.post('/newBookClub', bookClubDetails)

    editBookClub = (bookClub_id, bookClubDetails) => this.api.put(`/editBookClub/${bookClub_id}`, bookClubDetails)

    editClubStatus = (bookClub_id) => this.api.put(`/editStatus/${bookClub_id}`)

    deleteBookClub = (bookClub_id) => this.api.delete(`/delete/${bookClub_id}`)

}

export default BookClubService