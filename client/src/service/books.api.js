import axios from 'axios'

class GBookService {
    constructor(){
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1',
            withCredentials: false
        })
    }

    getByTitle (title) {
        return this.api.get(`/volumes?q=intitle:${title}&key=${MYAPIKEY}`)
    }

    getByAuthor (author, startIdx, maxResults) {
        return this.api.get(`/volumes?q=inauthor:${author}&startIndex=${startIdx}&maxResults=${maxResults}&key=${MYAPIKEY}`)
    }
    
    getByTitleAndAuthor (title, author) {
        return this.api.get(`/volumes?q=${title}+inauthor:${author}&key=${MYAPIKEY}`)
    }

}

export default GBookService