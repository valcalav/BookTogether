import React from 'react'

import { Col } from 'react-bootstrap'

import { LanguagesObj } from '../../shared/LanguagesList'

import './LanguageList.css'

function LanguageList() {
    
    return (
        <Col className="languages-container">
            <h5>Search by language</h5>
            <hr />
            <ul>
                {
                    Object.keys(LanguagesObj).map((key, idx) => ( <li key={idx}><a href={`/bookclubs-language-list/${key}`}>{LanguagesObj[key]}</a></li>))
                }
            </ul>
        </Col>
    )
}

export default LanguageList