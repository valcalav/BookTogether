import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'

import '../Login/Login.css'

import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import openBook from '../../../images/openbook.jpeg'


export class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
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
            .signup(this.state)
            .then(response => {
                this.props.storeUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => console.log({ err }))
    }

    render() {
        return (
            <Container>
                <Row>

                <Col className="login-container align-items-center" lg={{ span: 6, offset: 3 }}>

                <Form onSubmit={e => this.handleSubmit(e)}>
                    <img className="openBook" src={openBook} alt="open book"/>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="input" type="text" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="input" type="email" name="email" value={this.state.email} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className="input" type="firstName" name="firstName" value={this.state.firstName} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className="input" type="lastName" name="lastName" value={this.state.lastName} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="input" type="password" name="password" value={this.state.password} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>

                    <Button variant="dark" block type="submit" className="input">Sign up</Button>
                    <br/>
                    <small className="note-to-user">Already registered? <a href="/login" >Log in</a></small>
                </Form>

                </Col>

                </Row>
            </Container>
        )
    }
}

export default Signup