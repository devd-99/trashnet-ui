import React, { useState} from "react";

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
import Mobiletopnavbar from "../../datacomponents/navtop-mobile";
import Mobilebottomnavbar from "../../datacomponents/navbar-bottom-mobile";
import Greetings from "../../datacomponents/greeting-mobile";
import { db } from "../../../firebase.config";
import { addDoc, collection } from "firebase/firestore";

export default () => {
  const [weightofmaterialcollec, setWeightofmaterialcollec] = useState("");
  const [reprocessingmethod, setReprocessingmethod] = useState("");

  const [manufacility, setManufacility] = useState("");
  // const [collecimage, setCollecimage] = useState("");
  const [reicollecvehicle, setReicollecvehicle] = useState("");
  var showdate = new Date();
  var displaytodaydate = showdate.getDate() + '/' + showdate.getMonth() + '/' + showdate.getFullYear();
  var displaytimenow = showdate.getHours() + ' : ' + showdate.getMinutes();

  const recyinputsubmit = async (e) => {
    e.preventDefault();
    if (weightofmaterialcollec === "") {
      alert("Form not filled completely.")
    } else {
      console.log("working")
      const recyinputRef = collection(db, 'Recyinput')
      // const imageRef = ref(storage, `collector/${collecimage.name}`)
      // await uploadBytes(imageRef, collecimage)
      await addDoc(recyinputRef, { 
        "1. Form": "Recycler Input", 
        "2. date": displaytodaydate, 
        "3. time": displaytimenow, 
        "4. Weight of Plastic Recieved": "nothing",
        "5. Weight of Processed Material": weightofmaterialcollec + " kgs", 
        "6. Processing Method": reprocessingmethod, 
        "7. Manufacturing Facility": manufacility, 
        "8. Vehicle no.": reicollecvehicle  
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
          <Typography variant="h2"> Recycler Input</Typography>
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
              <Form>
              <Form.Group className="mb-3">
                  <Form.Label>Weight of Received Plastic</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <Scales size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="100"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      disabled

                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Weight of Processed Material</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <Scales size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="100"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setWeightofmaterialcollec(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Processed Method</Form.Label>
                  <Form.Select aria-label="Default select example"
                   onChange={e => setReprocessingmethod(e.target.value)}>
                    <option>Click to Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Manufacturing Facility</Form.Label>
                  <Form.Select aria-label="Default select example"
                   onChange={e => setManufacility(e.target.value)}>
                    <option>Click to Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Pictures of Processed Material</Form.Label>
                  <Stack direction="Vertical" gap={3}>
                    <Button variant="outline-secondary">
                      <label for="weight-collector">
                        <Camera />
                      </label>
                    </Button>
                    <input
                      accept="image/*"
                      id="weight-collector"
                      name="weight-collector"
                      capture="environment"
                      style={{ display: "none" }}
                    ></input>
                  </Stack>
                  <Form.Text className="text-muted">
                    Pictures of Plastic Received
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Vehicle No.</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <CarSimple size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="KAXX 00 XXXX"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => setReicollecvehicle(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                    //  as={Link}
                    //  to={Routes.mobiledashboard.path}
                    onClick={recyinputsubmit}
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
      <br/>
      <br/>
      <br/>
    </>
  );
};
