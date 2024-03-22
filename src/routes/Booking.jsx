import React from "react";
import BookingTable from "../components/BookingTable";
import { Paper } from "@mui/material";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

import Calendar from "../components/Calendar";
import DateTimePicker from "../components/DateTimePicker";

const style = {
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
};

const Booking = ({ parkingLots }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper style={{ maxHeight: "100%" }}>
      <Header title={"Booking"} />
      <Paper sx={style} elevation={3}>
        <BookingTable handleBook={handleClickOpen} />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DateTimePicker />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            {/* <Button type="submit">Subscribe</Button> */}
          </DialogActions>
        </Dialog>
      </Paper>
      <NavBar nav={"home"} />
    </Paper>
  );
};

export default Booking;
