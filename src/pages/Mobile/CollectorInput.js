import React, { useRef, useEffect, useState } from "react";

import Webcam from "react-webcam";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Scales, CaretDown, AddressBook } from "phosphor-react";



import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Card,
  Button,
  FormCheck,
  Container,
} from "react-bootstrap";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faWeightHanging,
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, getDocs, where , doc, setDoc} from "firebase/firestore";
import db from '../../firebase.config';

const initialFormData = Object.freeze({
  weight: "",
  typeOfPlastic: "",
  vehicle_no: ""
});

var list = []
var PWP_List = [];
var loc = null

export default () => {

  const auth = getAuth();
  const [formData, updateFormData] = useState(initialFormData);
  
  const position = () => {

    navigator.geolocation.getCurrentPosition(
      (position) => {console.log(position); loc = position},
      err => console.log(err)
    )
    console.log(loc)
    console.log(formData)
    console.log(list)
  }

  const handleChange = (e) => {
    console.log("handleChange called")
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });

  };

  // useEffect(() => {
  //   getPWPs();
  // }, [])
  const getPWPs = async() => {
    const q = query(collection(db, "users"), where("role", "==", "r"));
    console.log(PWP_List)
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      PWP_List.push(doc.data())
      
      
      console.log(PWP_List)
      
    });
    list = PWP_List.map(pwp => <option value={pwp.uid} key = {pwp.uid}>{pwp.username}</option>)
  }

  const handleSubmit = async () => {

    const a = document.getElementById('recycler_name');
    const t = {recycler: a.value}
    await addDoc(collection(db, "tid_master"), t).then(async(tid) => {


      
      console.log(tid)
      console.log("handlesubmit called")

      console.log(formData.password);

      const cycle_id = String(tid.uid)
      const weight = String(formData.weight)
      const typeOfPlastic = String(formData.typeOfPlastic)
      const recycler_name = String(a.value)
      const transporterName = String(formData.transporterName)
      const vehicle_no = String(formData.vehicle_no)
      const geolocationPosition = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        timestamp: loc.timestamp
      }
      console.log(geolocationPosition)

      const payload = {
        // uid: user.uid,
        cycle_id: cycle_id,
        weight: weight,
        typeOfPlastic: typeOfPlastic,
        recycler_name: recycler_name,
        transporterName : transporterName,
        vehicle_no: vehicle_no,
        geolocationPosition: geolocationPosition
      }

      console.log(payload)

      const docRef = await addDoc(collection(db, "transactions"), payload)


    })


    
    


  };
  var fileInput = document.getElementById('weight-collector');
  var fileDisplayArea = document.getElementById('fileDisplayArea');

  window.onload = function() {
    getPWPs()
    var fileInput = document.getElementById('weight-collector');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
      // Put the rest of the demo code here.
      var file = fileInput.files[0];
      var imagetype = /image.*/;
      if (file.type.match(imagetype)) {
        var reader = new FileReader();
        reader.onload = function(e){
          fileDisplayArea.innerHTML = "";
          var img = new Image();
          img.src = reader.result;
          fileDisplayArea.appendChild(img);
        }
        reader.readAsDataURL(file);
    }else{
      fileDisplayArea.innerHTML = "File not supported!";
    }
    });
  }


  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.DashboardOverview.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              homepage
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  {/* Header */}
                  <h3 className="mb-0">Collector Input</h3>
                </div>
                <Form className="mt-4">
                  <div className="mt-3 mb-4 text-center"></div>
                  <div className=" justify-content-center my-4">
                    {/* Weight */}
                    <Form.Group id="weight" className="mb-4">
                      <Form.Label>Weight of Collected waste</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                        <Scales size={32} />
                        </InputGroup.Text>

                        <Form.Control id="weight" name="weight" autoFocus required type="weight" placeholder="100" onChange={handleChange}/>
                        <InputGroup.Text>kgs</InputGroup.Text>
                      </InputGroup>
                       {/* Camera */}
                    </Form.Group>
                    

                    {/* { Images of weight collected} */}
                    <Form.Group id="weight_img" className="mb-4">
                      <Form.Label>Picture of Weight</Form.Label>
                      <input
                        type="file"
                        id="weight-collector"
                        name="weight-collector"
                        accept="image/*"
                        capture="environment"
                      ></input>

                      <input
                        type="file"
                        id="weight-collector"
                        name="weight-collector"
                        accept="image/*"
                        capture="environment"
                      ></input>

                      <input
                        type="file"
                        id="weight-collector"
                        name="weight-collector"
                        accept="image/*"
                        capture="environment"
                      ></input>
                       <div id="fileDisplayArea"></div> 
              


                     
                    </Form.Group>
                    {/* <div classname="camera">
                     <video ref={videoref}></video>
                    <Button
                      variant="outline-light"
                      className="btn-icon-only btn-pil text-dark"
                    >
                      SNAP!
                      <FontAwesomeIcon icon={faCameraRetro} />
                    </Button>
                    </div>
                    <div classname={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                      <canvas ref={photoref}>
                        <button>
                          CLOSE!
                        </button>
                      </canvas>
                    </div> */}
                  </div>

                  {/* Type of Plastic */}
                  <Form.Group id="typeOfPlastic" className="mb-4">
                    <Form.Label>Type of Plastic</Form.Label>
                    <InputGroup>
                  
                      <Form.Select aria-label="Role Selection" name="typeOfPlastic" onChange={handleChange}>
                          <option>Open this select menu</option>
                          <option value="w1">Waste Type 1</option>
                          <option value="w2">Waste Type 2</option>
                          <option value="w3">Waste Type 3</option>
                          <option value="w4">Waste Type 4</option>
                      </Form.Select>
                      {/* <DropdownButton
                        variant="outline-secondary"
                       
                        id="input-group-dropdown-2"
                        align="end"
                      >
                        <Dropdown.Item href="#">Pla-Plastic</Dropdown.Item>
                        <Dropdown.Item href="#">Pla-Plastic</Dropdown.Item>
                        <Dropdown.Item href="#">Pla-Plastic</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="Text input with dropdown button" /> */}
                    </InputGroup>
                  </Form.Group>
                  {/* Recycling Facility */}
                  <Form.Group id="typeOfPlastic" className="mb-4">
                    <Form.Label>Type of Plastic Collected</Form.Label>
                    <InputGroup>
                      <DropdownButton
                        variant="outline-secondary"
                        title="Dropdown"
                        id="input-group-dropdown-2"
                        align="end"
                      >
                        <Dropdown.Item href="#">Facility 1</Dropdown.Item>
                        <Dropdown.Item href="#">Facility 2</Dropdown.Item>
                        <Dropdown.Item href="#">Facility 3</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="Text input with dropdown button" />
                    </InputGroup>
                  </Form.Group>
                  

                  {/* Recycler Name */}
                  <Form.Group className="mb-4">
                    <Form.Label>Recycler Name</Form.Label>
                    <InputGroup>
                      {/* <Form.Control
                        autoFocus
                        required
                        type="weight"
                        placeholder="Sample Recycler Name"
                        id="recycler_name" name="recycler_name" onChange={handleChange}
                      /> */}
                      <Form.Select aria-label="Role Selection" name="role"  id="recycler_name" onChange={handleChange}>
                        {/* <option>Open this select menu</option> */}
                        {list}
                        {/* {PWP_List.map(item => <option value={item.uid} key={item.uid}>{item.username} </option>)} */}
                        {/* <option value = "1">2</option> */}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="transporterName" className="mb-4">
                      <Form.Label>Transporter Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                        <AddressBook size={32} />
                        </InputGroup.Text>

                        <Form.Control id="transporterName" name="transporterName" autoFocus required type="weight" placeholder="Sample Logistics" onChange={handleChange}/>
                      </InputGroup>
                  </Form.Group>

                  {/* Vehicle No. */}
                  <Form.Group id="vehicle_no" className="mb-4">
                    <Form.Label>Vehicle no.</Form.Label>
                    <InputGroup>
                      <Form.Control
                        autoFocus
                        required
                        type="weight"
                        placeholder="KAXX 0001"
                        id="vehicle_no" name="vehicle_no" onChange={handleChange}
                      />
                    </InputGroup>
                  </Form.Group>


                  {/* Summary */}
                  <Button variant="primary"  className="w-100" onClick = {handleSubmit}>
                    Summary
                  </Button>
                  <Button onClick = {position}>get location</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
