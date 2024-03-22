import { useEffect, useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Data from "./routes/Data";

import ForgotPassword from "./routes/ForgotPassword";

import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from "./firebase/Firebase";
import AuthLayout from "./layout/AuthLayout";
import QRCode from "./routes/QRCode";
import Booking from "./routes/Booking";

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [parkingLots, setParkingLots] = useState();
  const docRef = collection(db, `parking_lots`);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const parkingLotsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      console.log(parkingLotsData);
      setParkingLots(parkingLotsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<AuthLayout />}>
        <Route index element={<Home parkingLots={parkingLots} />} />
        <Route path="drop-in/:lotId" element={<QRCode />} />
        <Route path="book/:lotId" element={<Booking parkingLots={parkingLots} />} />
      </Route>
      <Route path="/profile" element={<AuthLayout />} >
        <Route index element={<Profile />} />
      </Route>
      <Route path="/data" element={<AuthLayout />} >
        <Route index element={<Data />} />
      </Route>
      {/* <Route path="home/:id" element={<ParkingLot parkingLots={parkingLots} />} /> */}
        {/* <Route path="lot">
          <Route path=":id" element={<RequireAuth><ParkingLot parkingLots={parkingLots} /></RequireAuth>} />
        </Route> */}
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}
