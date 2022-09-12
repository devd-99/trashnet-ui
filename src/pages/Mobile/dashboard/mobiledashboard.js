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
import { Routes } from "../../../routes";
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
import { Link, useHistory } from "react-router-dom";
import Mobiletopnavbar from "../../datacomponents/navtop-mobile";
import Mobilebottomnavbar from "../../datacomponents/navbar-bottom-mobile";
import Greetings from "../../datacomponents/greeting-mobile";
import DashboardCard from "./card";
import{ db }from "../../../firebase.config";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, getDocs, where , doc, setDoc} from "firebase/firestore";

var list = [];
export default () => {

  //auth and redirection
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUser(user)
      console.log(user.uid)
      // document.getElementById('collector_id').value = uid;
      // ...
    } else {
      // User is signed out
      // ...
      console.log(auth)
      console.log("you shouldn't be here")
      history.push("/mobile/dashboard/signinmobile")
    }
  });
  
  // const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [transactionCardList, setTransactionCardList] = useState([])
  //list of tuples, 1) id, 2) collector/recycler/manufacturer data
  const cycleList = []

  //list of tuples, 1) cycle id, 2) list of transaction objects (max len 4)
  const transactionList = []

  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  const [imageUrl, setImageUrl] = React.useState("");
  const imageUrlref = React.useRef(null);

  function somethingimage() {
    const [display, setdisplay] = React.useState("");

    function uploaderu(e) {
      const imageUrlfile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setdisplay(e.target.result);
      });
      reader.readAsDataURL(imageUrlfile);
    }
    return { display, uploaderu };
  }
  const { display, uploaderu } = somethingimage();

  const { result1, uploader1 } = useDisplayImage();

  const history = useHistory();

  const searchTransactions = async(cycle_id) => {

    
    var transactionInfo = []
    const q = query(collection(db, "transactions"), where("cycle_id", "==", cycle_id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // store doc ids into array, then search for all records in transactions for each doc id.
      console.log(doc.id, " => ", doc.data());
      var singleTransactionData = [doc.id, doc.data()]
      transactionInfo.push(singleTransactionData)
    });
    transactionList.push([cycle_id, transactionInfo])

    console.log(transactionList)
  }
  

  useEffect(() => {
    
    const getRelevantTransactions = async() => {
      if(user){
        //get user data
        //search transactions collection for collector_id
        const q = query(collection(db, "cycles"), where("collector", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // store doc ids into array, then search for all records in transactions for each doc id.
          console.log(doc.id, " => ", doc.data());

          cycleList.push([doc.id, doc.data()])
        });

        
        for (const cycle of cycleList) {
          console.log(cycle[0])
          await searchTransactions(cycle[0])
        }
        setTransactionCardList(transactionList.map(txn => {
          <DashboardCard cycle_id = {txn[0]}></DashboardCard>
        }))
        console.log(transactionList.length)

      }

      
    }

    getRelevantTransactions().catch(console.error);
    
  }, [user] )

  

  return (
    <>
      <Mobilebottomnavbar />
      <Mobiletopnavbar />
      <Greetings />
      <Container className="mb-3">
        <div className="d-grid gap-2">
          <Button as={Link} to={Routes.CollectorInput.path}>
            <Col>
              <Plus size={20} /> <span>{"   "}</span>
              Start a CGP cycle
            </Col>
          </Button>
        </div>
      </Container>

      <Stack>
        <Container className="mb-3">
          <Typography variant="h5"> Cycles in Progress</Typography>
          <Stack gap={3}>
            {transactionCardList}
            <DashboardCard cycle_id = "12345"></DashboardCard>
            <Card>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Recycle />
                  <Typography> 472103847283</Typography>
                  <Typography variant="h4"> Plastic Type</Typography>
                  <Typography variant="h5">
                    {" "}
                    Arriving at <MapPinLine />{" "}
                    <Typography variant="h5"> Station</Typography>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    Vehicle no. <CarSimple />{" "}
                    <Typography variant="h5"> KA00 XX 0000</Typography>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    at <Clock /> <Typography variant="h5"> 12:00</Typography>
                  </Typography>
                  <Button
                    as={Link}
                    to={Routes.RecyclerConfirmation.path}
                    variant="outline-primary"
                  >
                    {" "}
                    Update Status
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Recycle />
                  <Typography> 472103847283</Typography>
                  <Typography variant="h4"> Plastic Type</Typography>
                  <Typography variant="h5">
                    {" "}
                    Arriving at <MapPinLine />{" "}
                    <Typography variant="h5"> Station</Typography>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    Vehicle no. <CarSimple />{" "}
                    <Typography variant="h5"> KA00 XX 0000</Typography>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    at <Clock /> <Typography variant="h5"> 12:00</Typography>
                  </Typography>
                  <Button variant="outline-primary"> Update Status</Button>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Recycle />
                  <Typography> 472103847283</Typography>
                  <Typography variant="h4"> Plastic Type</Typography>
                  <Typography variant="h5">
                    {" "}
                    Arriving at <MapPinLine />{" "}
                    <Typography variant="h5"> Station</Typography>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    Vehicle no. <CarSimple />{" "}
                    <Typography variant="h5"> KA00 XX 0000</Typography>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    at <Clock /> <Typography variant="h5"> 12:00</Typography>
                  </Typography>
                  <Button variant="outline-primary"> Update Status</Button>
                </div>
              </Card.Body>
              </Card>
            <br/>
            <br/>
            <br/>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

{
  /* <Container>
            <Link href="#"
                tooltip="Create note link"
                icon="far fa-sticky-note" />
            <Link href="#"
                tooltip="Add user link"
               ><Plus/></Link>
               
            <Button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false"
                tooltip="The big plus button!"
                rotate={true}
                ><Plus/></Button>
                
        </Container>

  */
}
