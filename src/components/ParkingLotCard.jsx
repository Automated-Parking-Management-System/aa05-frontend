import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const parkingLotImageDir = "images/parking_lots/";

export default function ParkingLotCard({image}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          src={parkingLotImageDir + image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ryerson Parking Lot
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This parking lot is perfect for student parking.
            It is 121 parking spots and is open from 7-11pm 7 days a week.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}