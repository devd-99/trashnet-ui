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
  const [weightofrematerialcollec, SetWeightofrematerialcollec] = useState("");
  const [mfrecyclingfacility, setMfrerecyclingfacility] = useState("");
  // const [collecimage, setCollecimage] = useState("");
  const [mfcollecvehicle, setMfcollecvehicle] = useState("");
  var showdate = new Date();
  var displaytodaydate = showdate.getDate() + '/' + showdate.getMonth() + '/' + showdate.getFullYear();
  var displaytimenow = showdate.getHours() + ' : ' + showdate.getMinutes();

  const manusubmit = async (e) => {
    e.preventDefault();
    if (weightofrematerialcollec === "") {
      alert("Form not filled completely.")
    } else {
      console.log("working")
      const mfsubmitRef = collection(db, 'Manuconfirm')
      // const imageRef = ref(storage, `collector/${collecimage.name}`)
      // await uploadBytes(imageRef, collecimage)
      await addDoc(mfsubmitRef, { 
        "1. Form": "Manufacturer Confirmation", 
        "2. date": displaytodaydate, 
        "3. time": displaytimenow, 
        "4. weight of material received": weightofrematerialcollec + " kgs", 
        "5. Recycler": mfrecyclingfacility, 
        "6. Vehicle no.": mfcollecvehicle  
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
          <Typography variant="h2"> Manufacturer Confirmation</Typography>
          <Card >
            <Card.Header>
              <Stack gap={3} direction="horizontal">
                <div>

                  <Recycle size={24} />
                </div>
                <div>
                  <Typography variant="paragraph">3775207r35</Typography>
                </div>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label>Weight of Material Received</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <Scales size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="100"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={e => SetWeightofrematerialcollec(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Recycling Facility</Form.Label>
                  <Form.Select aria-label="Default select example"
                  onChange={e => setMfrerecyclingfacility(e.target.value)}>
                    <option>Click to Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Pictures of Received Material</Form.Label>
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
                      onChange={e => setMfcollecvehicle(e.target.value)}
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
                      onClick={manusubmit}
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
