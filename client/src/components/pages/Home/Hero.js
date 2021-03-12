import React from 'react'
import './Hero.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hero = ({loggedUser}) => {

    
    return (
        <div className="hero-container">
        <br />
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
        </div>
    )
}

export default Hero
