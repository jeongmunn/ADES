// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFY9L3JNCYGf5APtJM9QallQ8TLXvFWDU",
  authDomain: "quizment-ae4a6.firebaseapp.com",
  projectId: "quizment-ae4a6",
  storageBucket: "quizment-ae4a6.appspot.com",
  messagingSenderId: "774729961857",
  appId: "1:774729961857:web:87e44344039ae5dd875880",
  measurementId: "G-4GXXKNTKV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//authentication
const auth = getAuth(app);

// create user with email and passsword method
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  //signing in with email and password
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  

// database