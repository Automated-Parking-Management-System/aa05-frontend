const config = {
  apiKey: "AIzaSyC129F4OIPEJUjGMbrEu9rUYMeKoo_zBY8",
  authDomain: "aa05-apms.firebaseapp.com",
  // databaseURL: "https://aa05-apms-default-rtdb.firebaseio.com",
  projectId: "aa05-apms",
  storageBucket: "aa05-apms.appspot.com",
  messagingSenderId: "16178663204",
  appId: "1:16178663204:web:aab59eab625cb07a6fadb1",
  measurementId: "G-1WYSSXCS1M"

};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.ts",
    );
  } else {
    return config;
  }
}
