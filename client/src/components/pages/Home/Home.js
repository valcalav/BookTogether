import React, { Component } from 'react'

import { Row, Container } from 'react-bootstrap'

import Hero from './Hero'
import './Hero.css'

export class Home extends Component {
    
    
    render() {
        return (
            <div>
                <Container fluid >
                    <Row>
                        <Hero loggedUser={this.props.loggedUser} />
                    </Row>
                    
                </Container>
            </div>
        )
    }
}

export default Home