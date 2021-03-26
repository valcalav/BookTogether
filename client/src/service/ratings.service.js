import axios from 'axios'

class RatingsService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/ratings`,
            withCredentials: true
        })
    }

    newRatings = (bookClub_id, ratingsDetails) => this.api.post(`/${bookClub_id}/createRatings`, ratingsDetails)
    
    editRatings = (rating_id, ratingsDetails) => this.api.put(`/editRatings/${rating_id}`, ratingsDetails)

    findRatings = bookClub_id => this.api.get(`/findRatings/${bookClub_id}`)

}

export default RatingsService