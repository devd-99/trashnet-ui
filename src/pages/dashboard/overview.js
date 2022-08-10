import React from "react";
import { Routes } from "../../routes";
import { House, List, User, Plus, Bell, Phone } from "phosphor-react";
import { Test } from "./test";
import { ThemeProvider } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Container, Link } from "react-floating-action-button";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Row, Col} from "react-bootstrap";
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "./g.png";

export default () => {
  const [value, setValue] = React.useState(0);
  const [time, setTime] = React.useState();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        
        <div class="box-border h-16 w-32 p-2 border-4 ...">
          <List size={32} />

          <Button> <Phone size={16} /> Contact Us</Button>
          <Bell size={32} />

          {/* <div style={{ display: "flex" }}> */}

    
          {/* </div> */}

          {/* <a class="navbar-brand" href="#"> */}

          {/* </a> */}
          {/* <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> */}
        </div>
        <ReactRoundedImage
            image={MyPhoto}
            roundedSize="0"
            imageWidth="30"
            imageHeight="30"
          />

      
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#"></a>
            </li>
          </ul>
        </div>
      </nav>
      {/* floating action button */}
      <Container>
        <Link href="#" tooltip="Create note link" icon="far fa-sticky-note" />
        <Link href="#" tooltip="Add user link" icon="fas fa-user-plus" />

        <Button
          type="button"
          class="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
          tooltip="Action"
          rotate={true}
        >
          {" "}
          <Plus />
        </Button>
      </Container>
      <div class="box-border h-32 w-32 p-4 border-4 ...">
  
       <Typography variant="h1"> Good Morning,</Typography>
       <Typography variant="h2"> Arya Stark</Typography>

       <Typography>Today's</Typography>
       <Typography>Date</Typography>
       <Typography>Time: {time}</Typography>
       
    

  
      </div>
      <div class="box-border h-32 w-32 p-4 border-4 ...">
        <div className="d-grid gap-2">
          {/* <Button  type="button" class="btn btn-primary" variant="primary" size="lg"> */}
          {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Plus size={32} />
            <Typography>Start CGP cycle</Typography>
          </button> */}
          <Button variant="primary">
            {" "}
            " <Plus size={16} /> Start CGP cycle
          </Button>
        </div>
      </div>
      {/* cards */}
      <div class="box-border h-32 w-32 p-4 border-4 ...">
        <Card className="w-96">
          <CardHeader floated={false} className="h-80"></CardHeader>
          <CardBody className="text-center"></CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
        </Card>
      </div>
      {/* <div class="box-border h-32 w-32 p-4 border-4 ...">
        <Card className="w-96">
          <CardHeader floated={false} className="h-80"></CardHeader>
          <CardBody className="text-center"></CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
        </Card>
      </div> */}

      
      {/* bottom navigation bar */}
     <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            position: "bottom";
          }}
        >
         
          <BottomNavigationAction label="User" icon={<User size={32} />} />
          <BottomNavigationAction label="House" icon={<House size={32} />} />
          <BottomNavigationAction label="List" icon={<List size={32} />} />
        </BottomNavigation>
      </Box>
    </>
  );
};
