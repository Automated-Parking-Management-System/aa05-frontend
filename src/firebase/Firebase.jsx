import { getFirebaseConfig } from "./FirebaseConfig";
import {
  getAuth,
  applyActionCode,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";

import { collection, addDoc } from "firebase/firestore";

import {
  connectAuthEmulator,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

const app = firebase.initializeApp(getFirebaseConfig());
const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const functions = getFunctions(getApp());
export const firestore = getFirestore(app);
export const rtdb = getDatabase(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, "http://localhost:9099");
  // connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(firestore, "localhost", 8081);
  connectDatabaseEmulator(rtdb, "localhost", 9000)
}

// Initialize the FirebaseUI Widget using Firebase.
export const ui = new firebaseui.auth.AuthUI(firebase.auth());
export const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: "select_account",
      },
    },
    {
      provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
    },
  ],
};

export const signInUser = async (email, password) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const userStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => await signOut(auth);

export const registerUser = async (email, password) => {
  if (!email && !password) return;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  if (userCredential && auth.currentUser) {
    try {
      sendEmailVerification(auth.currentUser);
      updateProfile(auth.currentUser, {
        displayName: "verified",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userCredential;
};

export const confirmUserEmail = async (oobCode) => {
  if (!oobCode) return;

  try {
    await applyActionCode(auth, oobCode).then(() =>
      alert("Your email has been verified!"),
    );
  } catch (error) {
    alert(error.code);
  }

  return;
};

export const passwordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

export const confirmThePasswordReset = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return;

  return await confirmPasswordReset(auth, oobCode, newPassword);
};