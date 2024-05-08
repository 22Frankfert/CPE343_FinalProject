// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query,where,addDoc, } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut, } from "firebase/auth";
  import React, { useState, useRef, useEffect, useNavigate } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJHTqlRKFiejywZDA4GzHYCTi1xm8Pjwk",
  authDomain: "malaria-4500e.firebaseapp.com",
  projectId: "malaria-4500e",
  storageBucket: "malaria-4500e.appspot.com",
  messagingSenderId: "95477611594",
  appId: "1:95477611594:web:f5648298344199231b7ab3",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// async function getDatabase(db) {
//   const user = collection(db, 'user');
//   const userSnapshot = await getDocs(user);
//   const userList = userSnapshot.docs.map(doc => doc.data());
//   return userList;
// }
// const user = await getDatabase(db)

// console.log(user)

// const SignInWithEmailAndPassword = async (e) => {
  // const navigate = useNavigate()
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   role:'',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState('')
//   // e.preventDefault();
//   if (password.current.value  !== confirmPassword.current.value ) {
//     // display an error message or something
//     return setError("รหัสผ่านไม่ถูกต้อง");
//   }
//   const auth = getAuth();
//   const db = getFirestore();
//   try {
//     const userCredential = await createUserWithEmailAndPassword
//     (auth, email, password);
    
//     const user = userCredential.user;
//     const docRef = await addDoc(collection(db, 'user'), {
//       firstName: firstname,
//       lastName: lastname,
//       role: role,
//       email: email,
//       userId: user.uid,
//     });
//     // setLoading(false)
//     // await Signup(formData.email.current.value, formData.password.current.value) 
//     console.log('Document written with ID: ', docRef.id);
//     // navigate("/LogIn");
//   } catch (error) {
//     console.error('Error adding document: ', error);
//   }
//   // setLoading(false)
// };

const registerWithEmailAndPassword = async (firstname, lastname, role, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const docRef = await addDoc(collection(db, "user"), {
      userId: user.uid,
      firstName:firstname,
      lastName:lastname,
      role: role,
      // authProvider: "local",
      email:email,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
// const logInWithEmailAndPassword = async (email, password) => {
//   // const Navigate = useNavigate()
//   // e.preventDefault();
//   const auth = getAuth();
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log(userCredential);
//     // Navigate("/");
//   } catch (error) {
//     console.log(error);
//     alert('รหัสผ่านไม่ถูกต้อง',error)
//   }
// };

const logout = () => {
  signOut(auth);
};

export {registerWithEmailAndPassword, logInWithEmailAndPassword, logout};
