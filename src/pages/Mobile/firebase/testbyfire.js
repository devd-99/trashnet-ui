import React, { useState, useEffect } from "react";
import { db } from "../../../firebase.config";
import Mobilebottomnavbar from "../../datacomponents/navbar-bottom-mobile";
import { storage } from "../../../firebase.config";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, getDocs, getDoc, collection, QuerySnapshot } from "firebase/firestore";
import { app } from "../../../firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

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
import { Link } from "react-router-dom";
import { Routes } from "../../../routes";
import { async } from "@firebase/util";
import { ContactSupportOutlined, ListSharp, PostAddSharp } from "@material-ui/icons";
import { query } from "chartist";


export default () => {
    const [imageUpload, setImageupload] = useState(null)
    const [lists, setLists] = useState([]);

    //image stuff
    const uploadimage = () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Uploaded")
        })

    }
    const testRef = collection(db, 'test')

// render data
    useEffect(() => {
        const pleaseWork = async () => {
            const querySnapshot = await getDocs(query(testRef));
            setLists(querySnapshot.docs.map((doc) => [{...doc.data(), id: doc.id}]))
        }
        pleaseWork();

    })
    console.log("dogfish")

    // console.log(testRef)
    // useEffect(() => {
    //     const getData = [];
    //     const pleaseWork = db.collection("test").onSnapshot((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             getData.push({
    //                 ...doc.data(),
    //                 key: doc.id,
    //             });

    //         });
    //         setLists(getData);
    //     });
    //     return () => subscriber();
    //     console.log(lists)



    // }, [])

    return (
        <div>
            <h1> something</h1>
            {/* {lists.length > 0 ? ( lists.map ((list)=> <div key={lists.key}>{lists.title}</div>))  (<h1> ""</h1>)} */}

        </div>
    )
}

