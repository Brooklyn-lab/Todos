import { ROUTES } from "../infastructure/constants";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Button } from "@mui/material";
import "../App.scss";

const HomePage = () => {
  return (
    <div className="container home-container">
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button variant="contained" component={Link} to={ROUTES.todos}>
          Todos
        </Button>
        <Button variant="contained" component={Link} to={ROUTES.login}>
          Login
        </Button>
        <Button disabled variant="contained" component={Link} to={ROUTES.registration}>
          Registration
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default HomePage;
