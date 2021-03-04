import axios from 'axios'

class GBookService {
    constructor(){
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1',
            withCredentials: true
        })
    }

    getByTitle (search) {
        return this.api.get(`/volumes?q=intitle:${search}&key=${MYAPYKEYHERE}`)
    }

    getByAuthor (search) {
        return this.api.get(`/volumes?q=inauthor:${search}&key=${MYAPYKEYHERE}`)
    }
    
    getByTitleAndAuthor (title, author) {
        return this.api.get(`/volumes?q=${title}+inauthor:${author}&key=${MYAPYKEYHERE}`)
    }

}

export default GBookService