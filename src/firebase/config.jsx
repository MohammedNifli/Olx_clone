// / Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZDDPEM_ygFKhCZElSQfE1VM8ci4VA5UQ",
  authDomain: "olx-clone-4530a.firebaseapp.com",
  projectId: "olx-clone-4530a",
  storageBucket: "olx-clone-4530a.appspot.com",
  messagingSenderId: "870641282792",
  appId: "1:870641282792:web:740c71d83f31fb1d40235d",
  measurementId: "G-TJ9XHXLVY6"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);

export default app;