import React from 'react'
import './Hero.css'
import { Button } from 'react-bootstrap'


function Hero() {
    return (
        <div className="hero-container">
            <div className="hero-title">
                <h1>Meet new people and</h1>
                <h1>read together</h1>
            </div>

            <div className="hero-buttons">
                <Button className="first-hero-btn" variant="outline-dark">Create a Book Club</Button>
                <Button variant="outline-dark">Join a Book Club</Button>
            </div>
        </div>
    )
}

export default Hero
