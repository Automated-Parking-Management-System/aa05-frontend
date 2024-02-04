import Paper from '@mui/material/Paper';
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function Profile() {

  return (
    <Paper style={{ maxHeight: "100%" }}>
      <Header title={"Account"} />
      <div>
        Profile
      </div>
      <NavBar nav={"profile"} />
    </Paper>
  );
}

export default Profile;
