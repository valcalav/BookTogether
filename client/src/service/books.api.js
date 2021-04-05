import axios from 'axios'

class GBookService {
    constructor(){
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1',
            withCredentials: false
        })
    }

    getByTitle (title, startIdx, maxResults) {
        return this.api.get(`/volumes?q=intitle:${title}&startIndex=${startIdx}&maxResults=${maxResults}&key=AIzaSyAywZQ7AYD9e8CsWESjbejIV_1vMpJq_YM`)
    }

    getByAuthor (author, startIdx, maxResults) {
        return this.api.get(`/volumes?q=inauthor:${author}&startIndex=${startIdx}&maxResults=${maxResults}&key=AIzaSyAywZQ7AYD9e8CsWESjbejIV_1vMpJq_YM`)
    }
    
    getByTitleAndAuthor (title, author, startIdx, maxResults) {
        return this.api.get(`/volumes?q=${title}+inauthor:${author}&startIndex=${startIdx}&maxResults=${maxResults}&key=AIzaSyAywZQ7AYD9e8CsWESjbejIV_1vMpJq_YM`)
    }
}

export default GBookService