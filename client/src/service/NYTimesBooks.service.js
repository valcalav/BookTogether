import axios from 'axios'

class NYTBooksService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/bestsellers`,
            withCredentials: true
        })
    }



}

export default NYTBooksService