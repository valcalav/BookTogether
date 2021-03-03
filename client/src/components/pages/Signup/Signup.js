import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'

import { Form, Button, Container, Row, Col } from 'react-bootstrap'

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

                <Col md={{ span: 4, offset: 4 }}>

                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={this.state.email} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="firstName" name="firstName" value={this.state.firstName} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="lastName" name="lastName" value={this.state.lastName} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>

                    <Button variant="dark" block type="submit">Sign up</Button>
                </Form>
                <small>Already registered? <a href="/signup" >Log in</a></small>

                </Col>

                </Row>
            </Container>
        )
    }
}

export default Signup