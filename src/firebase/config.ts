// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQf5YvLKQTp1YOdAHNdkA15367H66OVFs",
  authDomain: "learn2code-50c84.firebaseapp.com",
  projectId: "learn2code-50c84",
  storageBucket: "learn2code-50c84.appspot.com",
  messagingSenderId: "346164011600",
  appId: "1:346164011600:web:bf4ef80fa784d0324fa755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const projectAuth = getAuth(app);