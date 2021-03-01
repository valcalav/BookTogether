import axios from 'axios'

class BookClubService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/bookclubs`,
            withCredentials: true
        })
    }

    getAllBookClubs = () => this.api.get('/allBookClubs')
    getAllBookClubsByGenre = () => this.api.get(`/allBookClubs/${genre}`)
    getBookClubDetails = bookClub_id => this.api.get(`/details/${bookClub_id}`)
    newBookClub = bookClubDetails => this.api.post('/newBookClub', bookClubDetails)
    editBookClub = (bookClub_id, bookClubDetails) => this.api.put(`/editBookClub/${bookClub_id}`, bookClubDetails)
    deleteBookClub = (bookClub_id) => this.api.delete(`/delete/${bookClub_id}`)

}

export default BookClubService