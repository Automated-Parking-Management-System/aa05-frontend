import Paper from '@mui/material/Paper';
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function Data() {

  return (
    <Paper style={{ maxHeight: "100%" }}>
      <Header title={"Data"} />
      <div>
        Data
      </div>
      <NavBar nav={"data"} />
    </Paper>
  );
}
export default Data;
