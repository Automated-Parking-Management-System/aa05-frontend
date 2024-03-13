import Paper from '@mui/material/Paper';
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Profile() {

  return (
    <Paper sx={{ maxHeight: "100%" }}>
      <Header title={"Account"} />
      <Paper sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Avatar sx={{margin: "2%"}}>
          <AccountCircleIcon />
        </Avatar>
        

      </Paper>
      <NavBar nav={"profile"} />
    </Paper>
  );
}

export default Profile;
