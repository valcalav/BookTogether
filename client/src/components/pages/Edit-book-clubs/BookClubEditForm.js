import { Component } from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import BookClubsService from '../../../service/bookclubs.service'
import { GenresArr } from '../../shared/AllGenres'

import './BookClubEditForm.css'

class BookClubForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            bookClub: undefined,
            bookClubName: '',
            bookTitle: '',
            bookAuthor: '',
            genre: '',
            startDate: '',
            duration:'',
            recurrence:'',
            language:'',
            description:'',
            imgBookCover:'',
            error: null,
            loading: false
        }
        this.bookClubsService = new BookClubsService()
    }

    componentDidMount() {
        const bookClub_id = this.props.match.params.bookClub_id
        console.log('bookClub_id', bookClub_id)

        this.setState({ loading: true })

        this.bookClubsService
            .getBookClubDetails(bookClub_id)
            .then(response => {
                const date = response.data.startDate.slice(0,10)
                this.setState({ 
                    bookClub: response.data,
                    bookClubName: response.data.bookClubName,
                    bookTitle: response.data.bookTitle,
                    bookAuthor: response.data.bookAuthor,
                    genre: response.data.genre,
                    startDate: date,
                    duration: response.data.duration,
                    recurrence: response.data.recurrence,
                    language: response.data.language,
                    description: response.data.description,
                    imgBookCover: response.data.imgBookCover,
                    loading: false
                })
                console.log(this.state.bookClub)
            })
            .catch(err => this.setState({ error: err }))
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        this.setState({loading: true})
        
        const bookClub_id = this.props.match.params.bookClub_id

        e.preventDefault()

        this.bookClubsService.editBookClub(bookClub_id, this.state)
            .then((response) => {
                this.props.fetchUser()
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({error: err})
                console.log("error", err)
            })
    }

    deleteClub() {
        const bookClub_id = this.props.match.params.bookClub_id

        this.setState({loading:true})
        this.bookClubsService
            .deleteBookClub(bookClub_id)
            .then(() => this.props.fetchUser())
            .then(() => this.props.history.push('/profile'))
            .catch(err => this.setState({error: err}))
    }

    render(){
        const { bookClub_id } = this.props.match.params

        return(
            <div class="new-club-form">
            {
                this.state.loading ?

                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner> 
                :
                <Container className="container-edit-club">
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Book Club's Name</Form.Label>
                            <Form.Control type="text" name="bookClubName" value={this.state.bookClubName} onChange={e => this.handleInputChange(e)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Title of the Book the club will read</Form.Label>
                            <Form.Control type="text" name="bookTitle" value={this.state.bookTitle} onChange={e => this.handleInputChange(e)} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Author of the book</Form.Label>
                                    <Form.Control type="text" name="bookAuthor" value={this.state.bookAuthor} onChange={e => this.handleInputChange(e)} />
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Book genre</Form.Label>
                                    <Form.Control value={this.state.genre} as="select" name="genre" onChange={e => this.handleInputChange(e)}>
                                        {GenresArr?.map(elm => <option>{elm}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Write a brief description of the Book Club's goal. Is there a main theme to the discussions? Will the discussions have a social or political focus?</Form.Label>
                            <Form.Control as="textarea" name="description" value={this.state.description} onChange={e => this.handleInputChange(e)} rows={2} />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>When will the book club begin?</Form.Label>
                                    <Form.Control type="date" name="startDate" value={this.state.startDate} onChange={e => this.handleInputChange(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>What is the duration of the Book Club?</Form.Label>
                                    <Form.Control value={this.state.duration} as="select" name="duration" onChange={e => this.handleInputChange(e)}>
                                        <option >4 weeks</option>
                                        <option >5 weeks</option>
                                        <option >6 weeks</option>
                                        <option >7 weeks</option>
                                        <option >8 weeks</option>
                                        <option >3 months</option>
                                        <option >6 months</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>How often will be the meetings?</Form.Label>
                                    <Form.Control value={this.state.recurrence} as="select" name="recurrence" onChange={e => this.handleInputChange(e)}>
                                        <option>once a week</option>
                                        <option>twice a week</option>
                                        <option>every two weeks</option>
                                        <option>once a month</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>In what language will the meetings be?</Form.Label>
                                    <Form.Control value={this.state.language} as="select" name="language" onChange={e => this.handleInputChange(e)}>
                                        <option>english</option>
                                        <option>spanish</option>
                                        <option>portuguese</option>
                                        <option>french</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Form.Group>
                            <Form.Label>Book cover image URL</Form.Label>
                            <Form.Control type="text" name="imgBookCover" value={this.state.imgBookCover} onChange={e => this.handleInputChange(e)} />
                        </Form.Group>

                        {
                            this.state.error && <span>Not able to create book Club</span>

                        }
                            <Button variant="light" block type="submit" className="btn-edit">Edit Book Club</Button>

                    </Form>
                    <Button className="delete-club" variant="outline-danger" block onClick={() => this.deleteClub()}>Delete Book Club</Button>
                    <Link to={`/club-dashboard/${bookClub_id}`} className="btn btn-info btn-back">Go back</Link>
                </Container>
            }
            </div>
        )
    }

}

export default BookClubForm