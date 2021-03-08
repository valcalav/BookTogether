import axios from 'axios'

class GBookService {
    constructor(){
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1',
            withCredentials: false
        })
    }

    getByTitle (title, startIdx, maxResults) {
        return this.api.get(`/volumes?q=intitle:${title}&startIndex=${startIdx}&maxResults=${maxResults}&key=AIzaSyCL85Aun0K58V1YhjUtm0fryvRoBHNUREE`)
    }

    getByAuthor (author, startIdx, maxResults) {
        return this.api.get(`/volumes?q=inauthor:${author}&startIndex=${startIdx}&maxResults=${maxResults}&key=AIzaSyCL85Aun0K58V1YhjUtm0fryvRoBHNUREE`)
    }
    
    getByTitleAndAuthor (title, author, startIdx, maxResults) {
        return this.api.get(`/volumes?q=${title}+inauthor:${author}&startIndex=${startIdx}&maxResults=${maxResults}&key=AIzaSyCL85Aun0K58V1YhjUtm0fryvRoBHNUREE`)
    }
}

export default GBookService