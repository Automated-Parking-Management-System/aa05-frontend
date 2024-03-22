import Paper from '@mui/material/Paper';
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Button } from '@mui/material';
import { useEffect } from 'react';

const style = {
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
};

function Test() {
    useEffect(()=> {
        console.log("Hello");
    }, [])
  return (
    <Paper style={{ maxHeight: "100%" }}>
      <Header title={"Hello"} />
      <Paper sx={style} elevation={3}>
        <Button>Hello</Button>
      </Paper>
      <NavBar nav={"home"} />
    </Paper>
  );
}
export default Test;
