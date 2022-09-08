import React, { useState } from "react";
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
import { Routes } from "../../../routes";
import { Link } from "react-router-dom";
import { Typography, Color } from "@material-tailwind/react";
import {
  Scales,
  CaretDown,
  Camera,
  List,
  Recycle,
  CarSimple,
  House,
  User,
  Plus,
  MapPinLine,
  Clock,
} from "phosphor-react";
import { addDoc, collection } from "firebase/firestore";
// import {storage}from "./../../../firebase"
import { connectStorageEmulator, ref, uploadBytes } from "firebase/storage"
import Mobiletopnavbar from "../../datacomponents/navtop-mobile";
import Mobilebottomnavbar from "../../datacomponents/navbar-bottom-mobile";
import Greetings from "../../datacomponents/greeting-mobile";
import db from "../../../firebase.config";
import storage from "../../../firebase.config";





export default () => {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [weightofplacollec, setWeightofplacollec] = useState("");
  const [plastictype, setPlastictype] = useState("");
  const [recyclingfacility, setRecyclingfacility] = useState("");
  // const [collecimage, setCollecimage] = useState("");
  const [collecvehicle, setCollecvehicle] = useState("");
  var showdate = new Date();
  var displaytodaydate = showdate.getDate() + '/' + showdate.getMonth() + '/' + showdate.getFullYear();
  var displaytimenow = showdate.getHours() + ' : ' + showdate.getMinutes();

  const collecsumbmit = async (e) => {
    e.preventDefault();


    console.log(date)
    if (weightofplacollec === '' && collecimage == null) {
      alert("Form not filled completely.")
    } else {
      console.log("working" + weightofplacollec)
      console.log(plastictype)
      const collecinputRef = collection(db, 'Colinput')
      // const imageRef = ref(storage, `collector/${collecimage.name}`)
      // await uploadBytes(imageRef, collecimage)
      await addDoc(collecinputRef, { 
        "1. Form": "Collector Input", 
        "2. date": displaytodaydate, 
        "3. time": displaytimenow, 
        "4. weight": weightofplacollec + " kgs", 
        "5. plastic-type": plastictype, 
        "6. Recycler": recyclingfacility, 
        "7. Vehicle no.": collecvehicle 
      })

    }
  }



  return (
    <>
      {" "}
      <Mobilebottomnavbar />
      <Mobiletopnavbar />
      <Greetings />
      <Container>
        <Stack direction="vertical">

          <Typography variant="h2"> Collector Input</Typography>
          <Card>
            <Card.Header>
              <Stack gap={3} direction="horizontal">
                <Recycle size={24} />
                <div>
                  <Typography variant="paragraph">3775207r35</Typography>
                </div>
              </Stack>
            </Card.Header>
            <Card.Body>
              {/* <label for="imageFile">Select some images:</label>
              <input type="file" id="imageFile" accept="image/*" multiple onChange={(event) => { setCollecimage(event.target.files[0]) }} />
              <input
                accept="file"
                id="weight-collector"
                name="weight-collector"
                capture="environment"
              // style={{ display: "none" }}
              // onChange={(event)=>{setCollecimage(event.target.files[0])}}
              /> */}
              <Form>
                <Form.Group className="mb-3" controlId="weightofplacollec">
                  <Form.Label>Weight of Plastic Collected</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <Scales size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      onChange={e => setWeightofplacollec(e.target.value)}
                      placeholder="100"
                      aria-label="Username"
                      aria-describedby="basic-addon1"

                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type of Plastic</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={e => { setPlastictype(e.target.value) }}>
                    <option>Click to Select</option>
                    <option value="hey hey hey">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Recycling Facility</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={e => { setRecyclingfacility(e.target.value) }}>
                    <option>Click to Select</option>
                    <option value="react react react">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Pictures of Collected Plastic</Form.Label>
                  <Stack direction="Vertical" gap={3}>
                    {/* <Button variant="outline-secondary">
                      <label for="weight-collector">
                        <Camera />
                      </label>
                    </Button> */}

                  </Stack>
                  <Form.Text className="text-muted">
                    Pictures of Plastic Received
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight-collected">
                  <Form.Label>Vehicle No.</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <CarSimple size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="KAXX 00 XXXX"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setCollecvehicle(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="weight-collected">
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      // as={Link}
                      // to={Routes.mobiledashboard.path}
                      onClick={collecsumbmit}
                    >
                      {" "}
                      Submit
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Stack>
      </Container>
      <br />
      <br />
      <br />
    </>
  );
};
