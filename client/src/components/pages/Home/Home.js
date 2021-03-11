import React, { Component } from 'react'

import { Container } from 'react-bootstrap'

import Hero from './Hero'
import './Hero.css'

export class Home extends Component {
    
    
    render() {
        return (
            <div>
                <Container fluid >
                    
                        <Hero loggedUser={this.props.loggedUser} />
                    
                </Container>
            </div>
        )
    }
}

export default Home