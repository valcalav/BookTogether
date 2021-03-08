import React from 'react'
import { Card } from 'react-bootstrap'

function QuotesPostsCard({quoteInfo}) {

    return (
        
            <>
                <blockquote className="blockquote mb-0">
                <p>
                    {' '}
                    "{quoteInfo.quote}"{' '}
                </p>
                <footer className="blockquote-footer">
                {quoteInfo.author}, <cite title="Source Title">{quoteInfo.source}</cite>
                </footer>
                </blockquote>
            </>
    )
}

export default QuotesPostsCard
