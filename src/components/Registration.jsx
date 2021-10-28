import { ROUTES } from "../infastructure/constants";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Registration = () => {
  return (
    <>
      <h1>Registration</h1>
      <Button variant="contained" component={Link} to={ROUTES.home}>
        home
      </Button>
    </>
  );
};

export default Registration;
