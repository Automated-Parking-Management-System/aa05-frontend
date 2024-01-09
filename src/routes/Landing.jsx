import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const b_img_style = {
  backgroundImage: "url(/background_img.jpg)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const btn_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Landing = () => {
  return (
    <div style={b_img_style}>
      <Container maxWidth="lg">
        <Typography style={{ marginBottom: "2.5%" }} variant="h1">
          Automated Parking Management System
        </Typography>
        <Link to="/login">
          <button style={btn_style}>Get Started</button>
        </Link>
      </Container>
    </div>
  );
};

export default Landing;
