import React, { useRef, useEffect, useState } from "react";
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
import { Typography } from "@material-tailwind/react";
import { Scales, CaretDown, Camera, List, Recycle } from "phosphor-react";

export default () => {
  var fileInput = document.getElementById("weight-collector");
  var fileDisplayArea = document.getElementById("fileDisplayArea");

  window.onload = function () {
    var fileInput = document.getElementById("weight-collector");
    var fileDisplayArea = document.getElementById("fileDisplayArea");

    fileInput.addEventListener("change", function (e) {
      // Put the rest of the demo code here.
      var file = fileInput.files[0];
      var imagetype = /image.*/;
      if (file.type.match(imagetype)) {
        var reader = new FileReader();
        reader.onload = function (e) {
          fileDisplayArea.innerHTML = "";
          var img = new Image();
          img.src = reader.result;
          fileDisplayArea.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        fileDisplayArea.innerHTML = "File not supported!";
      }
    });
  };

  return (
    <>
      <Navbar variant="light">
        <Container>
          <Button variant="outline-*">
            <List size={24} />
          </Button>
        </Container>
        <Container>
          <Button variant="info" size="sm">
            Contact Us
          </Button>
          <Button variant="outline-*" size="sm">
            <img
              src="https://picsum.photos/40/40"
              width="20"
              height="20"
              class="rounded-circle"
            ></img>
          </Button>
        </Container>
      </Navbar>
      <Stack gap={3}>
        <Container>
          <Row>
            <Typography variant="h1">Good Morning John!</Typography>

            <Stack direction="horizontal" className="col-md-5 mx-auto">
              <Container>
                {" "}
                <Typography variant="lead"> Today's</Typography>
                <Typography variant="h6">Weight</Typography>
              </Container>
              <div className="vr" style={{ color: "white" }} />
              <Container>
                {" "}
                <Typography variant="lead"> Date's</Typography>
                <Typography variant="h6">15/07/14</Typography>
              </Container>
              <div className="vr" style={{ color: "white" }} />
              <Container>
                {" "}
                <Typography variant="lead">Time</Typography>
                <Typography variant="h6">10:22</Typography>
              </Container>
            </Stack>
          </Row>
        </Container>
        <Container>
          <Typography variant="h2"> Collector Input</Typography>
          <Card>
            {" "}
            <Card.Header>
              <Stack direction="horizontal" gap={3}>
                {" "}
                <Recycle size={24} />
                <div>
                  <Typography variant="paragraph">3775207r35</Typography>
                </div>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="weight-collected">
                  <Form.Label>Weight of Collected Waste</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <Scales size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="100"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <Form.Text className="text-muted">
                    Don't forget to Click a picture
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Upload Picture</Form.Label>
                  <Stack direction="Vertical" gap={3}>
                  <Button variant="outline-secondary">
                    <label for="weight-collector">
                      <Camera />
                    </label>
                  </Button>

                  <input
                    type="file"
                    id="weight-collector"
                    name="weight-collector"
                    accept="image/*"
                    capture="environment"
                    style={{ display: "none" }}
                  ></input>
                  <img src="weight-collector"  />
                  </Stack>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </Stack>
    </>
  );
};
