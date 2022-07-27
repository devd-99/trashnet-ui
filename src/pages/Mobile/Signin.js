import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

//firebase
import db from '../../firebase.config';
import { doc, onSnapshot, collection, query, where,getDocs } from "firebase/firestore";
import {useState,useEffect} from 'react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const initialFormData = Object.freeze({
  password: "",
  email: ""
});

export default () => {

  const auth = getAuth();
  const q = query(collection(db, "users"));
  const [formData, updateFormData] = useState(initialFormData);
  const history = useHistory();
  const [users,setUsers]=useState([])

  useEffect(() => {
    // fetchUsers();
  }, [])
  const fetchUsers=async()=>{
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }


  const handleChange = (e) => {
    console.log("handleChange called")
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
    
  };
  const logInWithEmailAndPassword = async () => {
    var res = null
    // console.log(formData)
    try {
      const email = String(formData.email)
      const password = String(formData.password)
      console.log(email, password)
      res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    finally {
      const user = res.user;
      console.log(user)
      history.push("/dashboard/overview");
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required name="email" type="email" onChange={handleChange}  placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required name="password" type="password" onChange={handleChange}  placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  {/* <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button> */}
                  {/* <Button variant="primary" as={Link} to={Routes.DashboardOverview.path} className="w-100">
                  Login 
                  </Button> */}
                  <Button variant="primary" onClick={logInWithEmailAndPassword} className="w-100">
                  Login 
                  </Button>
                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                 
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Sign Up `}
                    </Card.Link>
                  </span>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                 
                    <Card.Link as={Link} to={Routes.CollectorInput.path} className="fw-bold">
                      {` Collector Input `}
                    </Card.Link>
                  </span>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    <Card.Link as={Link} to={Routes.RecyclerConfirmation.path} className="fw-bold">
                      {` Recycler Confirmation`}
                    </Card.Link>
                  </span>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
             
                    <Card.Link as={Link} to={Routes.RecyclerInput.path} className="fw-bold">
                      {`Recycler Input`}
                    </Card.Link>
                  </span>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">

                    <Card.Link as={Link} to={Routes.ManufacturingProcess.path} className="fw-bold">
                      {` Manufacturer Confirmation `}
                    </Card.Link>
                  </span>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                   
                    <Card.Link as={Link} to={Routes.GSTBill.path} className="fw-bold">
                      {` GST Bill `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};