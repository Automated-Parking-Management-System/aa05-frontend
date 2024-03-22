import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Paper } from "@mui/material";
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

  const generateQRCode = () => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${code}`;
    const original = currentUser.uid + "+" + lotId;
    const shuffled = shuffle(original);
    setCode(shuffled);
    setSrc(url);
  };

  useEffect(() => {
    generateQRCode();
  }, [src]);

  return (
    <Paper style={{ maxHeight: "100%" }}>
      <Header title={"QR-Code"} />
      <Paper sx={style} elevation={3}>
        <img style={{ margin: "5%" }} src={src}></img>
      </Paper>
      <NavBar nav={"home"} />
    </Paper>
  );
};

export default QRCode;
