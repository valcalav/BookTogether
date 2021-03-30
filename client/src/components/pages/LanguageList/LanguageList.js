import React from 'react'

import { Col } from 'react-bootstrap'

import { LanguagesObj } from '../../shared/LanguagesList'

import './LanguageList.css'

function LanguageList({handleLanguage}) {
    
    return (
        <Col className="languages-container">
            <h5>Search by language</h5>
            <hr />
            <ul>
                {
                    Object.keys(LanguagesObj).map((language, idx) => {

                       return  <li onClick={(language)=> handleLanguage(language)} key={idx}>{LanguagesObj[language]}</li>
                    })
                }
            </ul>
        </Col>
    )
}

export default LanguageList