const axios = require('axios')

class NYTimesApi {
    constructor(){
        this.api = axios.create({
            baseURL: 'https://api.nytimes.com/svc/books/v3'
        })
    }

    getListFiction() {
        return this.api.get(`/lists.json?list-name=hardcover-fiction&api-key=${process.env.NYT_KEY}`)
    }

    getListNonFiction(){
        return this.api.get(`/lists.json?list-name=paperback-nonfiction&api-key=${process.env.NYT_KEY}`)
    }


}

module.exports = NYTimesApi