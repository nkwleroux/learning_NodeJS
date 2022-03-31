// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1gFGIvjbUrjS97OVtGSWzXtIogQ8GwHc",
  authDomain: "dictionaryappjs.firebaseapp.com",
  projectId: "dictionaryappjs",
  storageBucket: "dictionaryappjs.appspot.com",
  messagingSenderId: "272811608982",
  appId: "1:272811608982:web:6ffa0109ff5be11481abb7",
  measurementId: "G-5F6LKMDWQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);