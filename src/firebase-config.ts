import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdlp0ShGajtg9YbNu3AVhW1nZ6fTko594",
  authDomain: "react-auth-6b2d1.firebaseapp.com",
  projectId: "react-auth-6b2d1",
  storageBucket: "react-auth-6b2d1.appspot.com",
  messagingSenderId: "509533967644",
  appId: "1:509533967644:web:cd0ac1b5c14cc9f9ae96d9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
