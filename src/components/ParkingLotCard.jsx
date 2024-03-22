import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const parkingLotImageDir = "images/parking_lots/";

export default function ParkingLotCard({ id, name, img, description }) {

  const navigate = useNavigate();

  const handleDropIn = () => {
    navigate("drop-in/"+id);
  }

  const handleBook = () => {
    navigate("book/"+id);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        src={parkingLotImageDir + img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDropIn}>Drop-In</Button>
        <Button size="small" onClick={handleBook}>Book</Button>
      </CardActions>
    </Card>
  );
}