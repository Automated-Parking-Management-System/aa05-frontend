import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ParkingLotCard from '../components/ParkingLotCard';

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const parkingLots = ["ryerson_lot.jpg", "pearson_lot.jpg"];
const style = {
  alignItems: "center",
  justifyContent: "center",
};

function Home() {
  // const { currentUser, signOut } = useContext(AuthContext);

  return (
    <Paper sx={style} elevation={3}>
      <Header title={"Parking Lot"} />
      <CssBaseline />
      <List>
        {parkingLots.map((image, index) => (
          <ParkingLotCard key={index + image} image={image}/>
        ))}
      </List>
      <NavBar />
    </Paper>
  );
}
export default Home;
