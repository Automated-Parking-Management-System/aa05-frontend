import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavBar({ nav }) {
  const { signOut } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    if (newValue !== "logout") {
      navigate("/" + newValue);
    }
  };

  return (
    <React.Fragment>
      <BottomNavigation value={nav} onChange={handleChange}>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          label="Data"
          value="data"
          icon={<DataThresholdingIcon />}
        />
        <BottomNavigationAction
          label="Logout"
          value="logout"
          icon={<LogoutIcon />}
          onClick={handleClickOpen}
        />
      </BottomNavigation>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to logout?"}</DialogTitle>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              signOut();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
