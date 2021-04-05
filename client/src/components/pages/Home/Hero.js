import React from 'react'
import './Hero.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Books from '../../../images/hero3.jpeg'

const Hero = ({loggedUser}) => {

    
    return (
        <>
            <Col lg={7} md={7}>
                <div className="hero-title">
                    <h1>Meet new people and</h1>
                    <h1>read together</h1>
                </div>

                <div className="hero-buttons">
                {
                    loggedUser ?
                        <Link to='/create-club'>
                            <button className="herobtn">Create a Book Club</button>
                        </Link>
                        :
                        <Link to='/login'>
                            <button className="herobtn">Create a Book Club</button>
                        </Link>
                }
                    <Link to='/bookclubs-list'>
                        <button className="herobtn">Join a Book Club</button>
                    </Link>
                </div>
            </Col>
            <Col lg={4} md={4}>
                <img className='hero-img' src={Books} alt='books'/>
            </Col>
        </>
    )
}

export default Hero
