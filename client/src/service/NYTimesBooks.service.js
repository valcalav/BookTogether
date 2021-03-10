import axios from 'axios'

class NYTBooksService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/bestsellers`,
            withCredentials: true
        })
    }

    getFictionBestsellers = () => this.api.get('/fiction')

    getNonFictionBestsellers = () => this.api.get('/non-fiction')

}

export default NYTBooksService