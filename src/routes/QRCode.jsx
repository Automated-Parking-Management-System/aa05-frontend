import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Paper, Typography } from "@mui/material";
import { getDatabase, ref, set, onValue } from "firebase/database";
import NavBar from "../components/NavBar";

import Header from "../components/Header";

import { shuffle } from "../components/Shuffle";
import { FullscreenExit } from "@mui/icons-material";

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

  const updateRTDB = (obj) => {
    set(ref(rtdb, 'QR-Code/'), obj);
  }

  const getRTDB = (path) => {
    const verifyCheck = ref(rtdb, 'QR-Code/' + path);
    let isSucess = false;
    onValue(verifyCheck, (snapshot) => {
      const data = snapshot.val();
      if (data === false) {
        // console.log('succcess (for now)');
        isSucess = true;
        // throw new Error("CAM didnt verify");  // uncomment for the future when firebase has been integrated
        try {
          set(ref(rtdb, 'QR-Code/' + path), true);  // Setting it true for now, CAM shud check
        } catch (error) {
          isSucess = false;
          throw new Error("Doesnt matter what happens here tbh");
        }
      }
    });

    return isSucess;    
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
    updateRTDB(qrObj);

    try {
      if (getRTDB(shuffled) === undefined) throw new Error("Something went wrong ...");
      else setVerification(true);
    } catch (error) {
      alert(error);
    }
  };


  useEffect(() => {
    generateQRCode();
  }, [src]);

  return (
    <Paper style={{ maxHeight: "100%" }}>
      {!verification && <Typography variant="h5" >QR-Code Generated </Typography>}
      {!verification && <Typography variant="h6" >Show it to the camera </Typography>}
      {verification && <Typography variant="h5">Gate verification successful !</Typography>}
      {!verification && <Paper sx={style} elevation={3}>
        <img style={{ margin: "5%" }} src={src}></img>
      </Paper>}
    </Paper>
  );
};

export default QRCode;
