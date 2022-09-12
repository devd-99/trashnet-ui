

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

        </>
    )
}

export default DashboardCard;