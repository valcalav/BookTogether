import axios from 'axios'

class RatingsService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/ratings`,
            withCredentials: true
        })
    }

    newRatings = (bookClub_id) => this.api.post(`/${bookClub_id}/createRatings`)
    
    editRatings = (rating_id, newRating) => this.api.put(`/editRatings/${rating_id}`, newRating)

    findRatings = bookClub_id => this.api.get(`/getRatings/${bookClub_id}`)

}

export default RatingsService