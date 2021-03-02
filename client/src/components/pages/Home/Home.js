import React, { Component } from 'react'

import { Container, Row } from 'react-bootstrap'

import Hero from './Hero'
import Features from '../Home/Features'

export class Home extends Component {
    render() {
        return (
            <Container >
                <Row>
                    <Hero />
                </Row>
                
                <Row>
                    <Features />
                </Row>
            </Container>
        )
    }
}

export default Home