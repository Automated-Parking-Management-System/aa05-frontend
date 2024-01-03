import Typography from "@mui/material/Typography";

const b_img_style = {
  backgroundImage: "url(/background_img.jpg)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const btn_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function App() {
  return (
    <div>
      <div style={b_img_style}>
        <div>
          <Typography variant="h1" component="h2">
            Automated Parking Management System
          </Typography>
          <button style={btn_style}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default App;
