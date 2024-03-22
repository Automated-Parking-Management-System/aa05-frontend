import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ParkingLotCard from '../components/ParkingLotCard';

const style = {
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
};

function Home({parkingLots}) {

  return (
    <Paper style={{ maxHeight: "100%" }}>
      <Header title={"Parking Lot"} />
      <Paper sx={style} elevation={3}>
        <List>
          {parkingLots?.map(({id, name, img, description}) => (
            <ParkingLotCard key={id} id={id} name={name} img={img} description={description} />
          ))}
        </List>
      </Paper>
      <NavBar nav={"home"} />
    </Paper>
  );
}
export default Home;
