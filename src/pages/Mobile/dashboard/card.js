

import { Link } from "react-router-dom";
import { Routes } from "../../../routes";

import { Typography } from "@material-tailwind/react";
import {
    Recycle,
    CarSimple,
    MapPinLine,
    Clock,
  } from "phosphor-react";

import {
    Button,
    Card
} from "react-bootstrap";

const DashboardCard = (props) => {
    return (
        <>
            <Card>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Recycle />
                  <Typography> {props.cycle_id}</Typography>
                  <Typography variant="h4"> Plastic Type</Typography>
                  <Typography variant="h5">
                    {" "}
                    Arriving at <MapPinLine />{" "}
                    <div><Typography variant="h6"> Station</Typography></div>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    Vehicle no. <CarSimple />{" "}
                    <div><Typography variant="h6"> KA00 XX 0000</Typography></div>
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    at <Clock /> <div><Typography variant="h6"> 12:00</Typography></div>
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

        </>
    )
}

export default DashboardCard;