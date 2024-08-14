// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAyJLAH4iTq3cAexHB48jKCIQ5coU89sP0",
    authDomain: "jobonic-7eb9a.firebaseapp.com",
    projectId: "jobonic-7eb9a",
    storageBucket: "jobonic-7eb9a.appspot.com",
    messagingSenderId: "524192409307",
    appId: "1:524192409307:web:ec53accff441384c9a0efe",
    measurementId: "G-0WNDP6WEFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics and Authentication
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
