import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics,isSupported } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyAyJLAH4iTq3cAexHB48jKCIQ5coU89sP0",
    authDomain: "jobonic-7eb9a.firebaseapp.com",
    projectId: "jobonic-7eb9a",
    storageBucket: "jobonic-7eb9a.appspot.com",
    messagingSenderId: "524192409307",
    appId: "1:524192409307:web:ec53accff441384c9a0efe",
    measurementId: "G-0WNDP6WEFR"
};

const app = initializeApp(firebaseConfig);

let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
}).catch(console.error);

export const auth = getAuth(app);

export { analytics };
export default app;
