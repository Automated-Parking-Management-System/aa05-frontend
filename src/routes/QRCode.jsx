import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Paper, Typography } from "@mui/material";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { shuffle } from "../components/Shuffle";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
};


const QRCode = () => {
  const { currentUser } = useContext(AuthContext);
  const { lotId } = useParams();
  const [code, setCode] = useState("Example");
  const [src, setSrc] = useState("");
  const [verification, setVerification] = useState(false);
  const rtdb = getDatabase();

  

  const getRTDB = (path) => {
    const verifyCheck = ref(rtdb, 'QR-Code/' + path);
    let isSucess = false;
    onValue(verifyCheck, async (snapshot) => {
      const data = snapshot.val();
      if (data === true) {
        isSucess = true;
        await remove(verifyCheck);
        setVerification(true);
        return;
      }
    });
 
    
  }

  const generateQRCode = () => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${code}`;
    const original = currentUser.uid + "+" + lotId;
    const shuffled = shuffle(original);
    setCode(shuffled);
    setSrc(url);

    // Updating rtdb
    const qrObj = {};
    qrObj[shuffled] = false;
    
  };

  useEffect(() => {
    getRTDB("JdeQsCeNA1T3ZQaUtQhcHGf1s343" + "/" + "entranceAuth") // Hard setting 
  }, [code])
  

  useEffect(() => {
    generateQRCode();
  }, [src]);

  return (
    <Paper style={{ maxHeight: "100%" }}>
      {!verification && <Typography variant="h5" >QR-Code Generated </Typography>}
      {!verification && <Typography variant="h6" >Show it to the camera </Typography>}
      {verification && <Typography variant="h5" style={{ padding: '1.5rem' }}>Gate verification successful !</Typography>}
      {!verification && <Paper sx={style} elevation={3}>
        <img style={{ margin: "5%" }} src={src}></img>
      </Paper>}
    </Paper>
  );
};

export default QRCode;
