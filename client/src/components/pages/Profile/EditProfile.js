import React, { useEffect, useState } from 'react'

import ReaderService from '../../../service/reader.service'


function EditProfile(props) {

    const { loggedUser } = props

    const readerService = new ReaderService()

    const [myInfo, setMyInfo] = useState({
        firstName:'',
        lastName:'',
        favoriteGenre:'',
        profileImg:'',
    })

    useEffect(() => {
        setMyInfo({...myInfo,
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            favoriteGenres: loggedUser.favoriteGenres,
            profileImg: loggedUser.profileImg
        })
    }, [])
    
    


    return (
        <div>
            <h1>Aquí editar perfil de: {myInfo.firstName}.</h1>
            <img src={myInfo.profileImg} />


            <p>Form con todos los campos para editar...</p>

            <p>Botón editar</p>
            <p>Botón cancelar y regresar al perfil</p>
        </div>
    )
}

export default EditProfile
