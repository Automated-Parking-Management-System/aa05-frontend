import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ParkingLotCard from '../components/ParkingLotCard';
import QRCode from "../routes/QRCode"
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

const style = {
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
};


function Home({parkingLots}) {

  const [displayQR, setDisplayQR] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log('button clicked');
    setDisplayQR(true);
  }

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
      {!displayQR && <div className="qr-question-container">
        <Typography variant='h6' style={{ padding: '2rem', paddingLeft: '1rem' }}>Click to generate qr-code</Typography>
        <Button style={{ marginLeft: '1rem', marginBottom: '2rem' }} onClick={handleClick} variant='contained'>QR-Code</Button>
      </div>}     
      {displayQR && <QRCode/>}
      <NavBar nav={"home"} />
    </Paper>
  );
}
export default Home;
