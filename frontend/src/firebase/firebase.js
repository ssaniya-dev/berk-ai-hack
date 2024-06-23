// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV51aVGsVGd4exYnrUr9ghXSiTE1DBTIc",
  authDomain: "berkley-ai-2024.firebaseapp.com",
  projectId: "berkley-ai-2024",
  storageBucket: "berkley-ai-2024.appspot.com",
  messagingSenderId: "1010916136652",
  appId: "1:1010916136652:web:ac39e958479db06cd8d469",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
