import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBZy9ykhst9di3nghID5eUs2MY3P0-ymDU",
  authDomain: "recycle-item-app.firebaseapp.com",
  databaseURL: "https://recycle-item-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recycle-item-app",
  storageBucket: "recycle-item-app.appspot.com",
  messagingSenderId: "412866934266",
  appId: "1:412866934266:web:5df26c6fed988dbe30e043",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Realtime Database and get a reference to it
export const db = getDatabase(app);

export default app;
