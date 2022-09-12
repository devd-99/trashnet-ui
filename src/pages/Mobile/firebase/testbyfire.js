// import React, { useState } from "react";
// import { db } from "../../../firebase.config";
// import Mobilebottomnavbar from "../../datacomponents/navbar-bottom-mobile";
// import {storage} from "../../../firebase.config";
// import { ref, uploadBytes } from "firebase/storage";
// import { addDoc, collection } from "firebase/firestore";

// import {
//   Navbar,
//   Container,
//   Button,
//   Image,
//   Row,
//   Col,
//   Stack,
//   Figure,
//   Form,
//   Card,
//   InputGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { Routes } from "../../../routes";


// export default () => {
//     const [imageUpload, setImageupload] = useState(null)
//     const uploadimage = () => {
//         if (imageUpload === null) return;
//         const imageRef = ref(storage, `images/${imageUpload.name}`)
//         uploadBytes(imageRef, imageUpload).then(() => {
//             alert("Uploaded")
//         })

//     }
//     const testRef = collection(db, 'test')
//             console.log(testRef)

// <<<<<<< Updated upstream
//     return (
//         <>
//             <Container>
//                 <br /> <Form>
//                     <Form.Control type='text' />
//                     <input
//                         type="file"
//                         onChange={(event) => { setImageupload(event.target.files[0]) }}
//                     />
//                     <br />
//                     <Button type='submit' onClick={uploadimage}>Submit</Button>
//                 </Form></Container>
// =======
// // render data
//     useEffect(() => {
//             setLists(querySnapshot.docs.map((doc) => [{...doc.data(), id: doc.id}]))
//         }
//         pleaseWork();

//     })
//     console.log(setLists)

//     // console.log(testRef)
//     // useEffect(() => {
//     //     const getData = [];
//     //     const pleaseWork = db.collection("test").onSnapshot((querySnapshot) => {
//     //         querySnapshot.forEach((doc) => {
//     //             getData.push({
//     //                 ...doc.data(),
//     //                 key: doc.id,
//     //             });

//     //         });
//     //         setLists(getData);
//     //     });
//     //     return () => subscriber();
//     //     console.log(lists)
// >>>>>>> Stashed changes

//         </>
//     )
// }



// // export default () => {

// //     const testRef = collection(db, 'test')
// //         console.log(testRef)
   
// //     return (
// //         <>
// //             <Container>
// //                 <h1> Something</h1>
// //             </Container>

// //         </>
// //     )
// // }

//             let queryData = querySnapshot.docs;
//             console.log(queryData)
//         console.log('swag')