import React from "react";
import { Row, Col, Card, OverlayTrigger, Tooltip, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../routes";
import { Nav } from "react-bootstrap";
import { House, MagnifyingGlass, Plus} from "phosphor-react";


import {List, User, Bell, Phone } from "phosphor-react";

import { ThemeProvider } from "@material-tailwind/react";
import {

  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Container } from "react-floating-action-button";


const iconSize = 32;

// Footer V.2. to look more like the bottom nav bar from the figma designs.

export default () => {
  return (
    <>
{/*    
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
       */}
    </>
  )
}