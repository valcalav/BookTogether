import React from 'react'
import { Card, Button } from 'react-bootstrap'


function MeetingsCard(props) {

    const {
        setModalShow
    } = props

    return (
        <div>
            <Card>
                <Card.Header>Club meetings</Card.Header>
                <Card.Body>
                    <Card.Text>
                    AQUI DEBO LISTAR LAS MEETINGS QUE HAY
                    </Card.Text>
                    <Button block variant="primary" onClick={() => setModalShow(true)}>Create meeting</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MeetingsCard
