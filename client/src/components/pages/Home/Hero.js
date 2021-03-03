import React from 'react'
import './Hero.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hero = ({loggedUser}) => {

    console.log("LOGGED USER:", loggedUser)
    
    return (
        <div className="hero-container">
            <div className="hero-title">
                <h1>Meet new people and</h1>
                <h1>read together</h1>
            </div>

            <div className="hero-buttons">
            {
                loggedUser ?
                    <Link to='/create-club'>
                        <Button className="first-hero-btn" variant="outline-dark">Create a Book Club</Button>
                    </Link>
                    :
                    <Link to='/login'>
                        <Button className="first-hero-btn" variant="outline-dark">Create a Book Club</Button>
                    </Link>
            }
                <Link to='/bookclubs-list'>
                    <Button variant="outline-dark">Join a Book Club</Button>
                </Link>
            </div>
        </div>
    )
}

export default Hero
