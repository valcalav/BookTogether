import axios from 'axios'

class UploadService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/files`,
            withCredentials: true
        })
    }

    uploadFile = fileForm => this.api.post('/upload', fileForm)
}

export default UploadService