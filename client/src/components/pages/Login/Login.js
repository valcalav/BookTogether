import { Component } from 'react'
import AuthService from '../../../service/auth.service'

import { Form, Button, Container, Row, Col } from 'react-bootstrap'

import './Login.css'
import openBook from '../../../images/openbook.jpeg'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }

        this.authService = new AuthService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(response => {
                this.props.storeUser(response.data)
                this.props.history.push("/")
            })
            .catch(err => console.log({ err }))
    }

    render() {
        return (
            
            <Container>

                <Row>

                    <Col className="login-container align-items-center" md={{ span: 6, offset: 3 }}>

                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <img className="openBook" src={openBook} />
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control className="input" type="text" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="input" type="password" name="password" value={this.state.password} onChange={e => this.handleInputChange(e)} />
                            </Form.Group>

                            <Button variant="dark" block type="submit" className="input">Log in</Button>
                            <br/>
                            <small className="note-to-user">Don't have an account yet? <a href="/signup" >Register here</a></small>
                        </Form>
                    </Col>

                </Row>

            </Container>
            
        )
    }
}

export default Login