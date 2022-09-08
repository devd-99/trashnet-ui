import React, { useState } from 'react'
import db from '../../../firebase.config'
import storage from '../../../firebase.config'
import {ref, uploadBytes} from 'firebase/storage'
import {
    Navbar,
    Container,
    Button,
    Image,
    Row,
    Col,
    Stack,
    Figure,
    Form,
    Card,
    InputGroup,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';

export default () => {
    const [imageUpload, setImageupload] = useState(null)
    const uploadimage =()=>{
        if (imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then(()=>
        {
            alert("Uploaded")
        })


    }
    return (
        <>
            <Container>  
                <br/> <Form>
                <Form.Control type='text' />   
                <input 
                type="file"
                onChange={(event) => {setImageupload(event.target.files[0])}}
                />   
                <br/>
                <Button type='submit' onClick={uploadimage}>Submit</Button> 
                 </Form></Container>

        </>
    )
}