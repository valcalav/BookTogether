import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function QuotesPostsCard({quoteInfo}) {

    return (
            <>
                <blockquote className="blockquote mb-0">
                <p>
                    {' '}
                    {quoteInfo.quote}{' '}
                </p>
                <footer className="blockquote-footer">
                {quoteInfo.author}, <cite title="Source Title">{quoteInfo.source}</cite>
                </footer>
                </blockquote>
                <Link to={`/edit-quote/${quoteInfo._id}`} style={{marginLeft: "auto"}} className="btn btn-secondary">Edit</Link>
                <hr />
            </>
    )
}

export default QuotesPostsCard
