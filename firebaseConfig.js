import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
 
  apiKey: "AIzaSyApwrbbkCPrme1qF1-vjEaW5JSQYdU7ssU",
 
  authDomain: "tendr-6db07.firebaseapp.com",
 
  projectId: "tendr-6db07",
 
  storageBucket: "tendr-6db07.firebasestorage.app",
 
  messagingSenderId: "970847083493",
 
  appId: "1:970847083493:web:20fde0607ee85052c2ed0c",
 
  measurementId: "G-J3YD15QSLY"
 
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

export { firebaseConfig, app, auth, signInWithPhoneNumber };
