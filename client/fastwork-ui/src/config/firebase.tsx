// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUTVFB3XxgU8xZAvaB0K6XyPfj_DnoinE",
  authDomain: "fastwork-chat.firebaseapp.com",
  projectId: "fastwork-chat",
  storageBucket: "fastwork-chat.appspot.com",
  messagingSenderId: "644209280131",
  appId: "1:644209280131:web:2911b968d05a60e905c7b6",
  measurementId: "G-WEQ0E48E0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);