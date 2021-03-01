import axios from 'axios'

class QuotesService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/quotes`,
            withCredentials: true
        })
    }

    getAllUserQuotes = user_id => this.api.get(`/myQuotes/${user_id}`)

    newQuote = QuoteDetails => this.api.post('/newQuote', QuoteDetails)

    editQuote = (quote_id, quoteDetails) => this.api.put(`/editQuote/${quote_id}`, quoteDetails)

    deleteQuote = quote_id => this.api.delete(`/delete/${quote_id}`)

}

export default QuotesService