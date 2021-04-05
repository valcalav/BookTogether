import React, { useEffect, useState } from 'react'
import { AllCountries } from '../../shared/AllCountries'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { GenresArr } from '../../shared/AllGenres'
import { Link } from 'react-router-dom'

import editIcon from '../../../images/edit-icon.jpg'

import ReaderService from '../../../service/reader.service'
import UploadService from '../../../service/upload.service'
import Spinner from '../../shared/Spinner/Spinner'

import './Profile.css'

function EditProfile(props) {

    const { loggedUser } = props

    const readerService = new ReaderService()
    const uploadService = new UploadService()

    const [myInfo, setMyInfo] = useState({
        firstName:'',
        lastName:'',
        favoriteGenre:'',
        profileImg:'',
        country:''
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setMyInfo({...myInfo,
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            profileImg: loggedUser.profileImg
        })
    }, [])

    function handleSubmit() {
        const reader_id = props.match.params._id
        readerService.editProfile(reader_id, myInfo)
            .then(() => {
                props.history.push('/profile')
            })
            .catch(err => console.log(err))
    }

    function handleFileUpload(e) {

        setLoading(true)

        const uploadData = new FormData()
        uploadData.append('profileImg', e.target.files[0])

        uploadService
            .uploadFile(uploadData)
            .then(response => {
                console.log('respuesta', response)
                setMyInfo({...myInfo, profileImg: response.data.secure_url})
                setLoading(false)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div className="edit-body">
            <Container fluid>
                <Row>
                    <Col className="container-edit align-items-center" lg={{ span: 8, offset: 2 }}>

                    <Form onSubmit={e => handleSubmit(e)}>
                    <h5><img src={editIcon} alt="edit-icon" />Edit profile</h5>
                    <hr />
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" name="firstName" value={myInfo.firstName} onChange={(e) => setMyInfo({...myInfo, firstName: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" name="lastName" value={myInfo.lastName} onChange={(e) => setMyInfo({...myInfo, lastName: e.target.value})} />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group>
                            <Form.Label>Imagen (File) {loading && <Spinner />}</Form.Label>
                            <Form.Control type="file" name="profileImg" onChange={e => handleFileUpload(e)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select" name="country" value={myInfo.country} onChange={(e) => setMyInfo({...myInfo, country: e.target.value})}>
                                {AllCountries.map((country, idx) => <option key={idx} >{country}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Favorite genre</Form.Label>
                            <Form.Control as="select" name="favoriteGenre" value={myInfo.favoriteGenre} onChange={(e) => setMyInfo({...myInfo, favoriteGenre: e.target.value})}>
                                {GenresArr.map((elm, idx) => <option key={idx} >{elm}</option>)}
                            </Form.Control>
                        </Form.Group>

                        {
                            error && <span>Not able to edit profile</span>
                        }

                        <Button block className="btn-edit" variant="light" type="submit">Edit</Button>
                        <Link to='/profile' className="btn btn-info btn-back">Go back</Link>
                    </Form>
                    </Col>
                    

                </Row>
            

            
            
        </Container>
        </div>
    )
}

export default EditProfile