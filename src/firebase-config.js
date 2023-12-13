import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZy9ykhst9di3nghID5eUs2MY3P0-ymDU",
  authDomain: "recycle-item-app.firebaseapp.com",
  databaseURL: "https://recycle-item-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recycle-item-app",
  storageBucket: "recycle-item-app.appspot.com",
  messagingSenderId: "412866934266",
  appId: "1:412866934266:web:5df26c6fed988dbe30e043",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export { storage };
export const auth = getAuth(app);
export { db }; // Export the db reference
export default app; // Export the Firebase app
