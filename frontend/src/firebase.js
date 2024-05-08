// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import React, { useState, useRef, useEffect, useNavigate } from "react";

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

const registerWithEmailAndPassword = async (
  firstname,
  lastname,
  role,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const docRef = await addDoc(collection(db, "user"), {
      userId: user.uid,
      firstName: firstname,
      lastName: lastname,
      role: role,
      // authProvider: "local",
      email: email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get the user's uid
    const uid = userCredential.user.uid;

    const q = query(collection(db, "user"), where("userId", "==", uid, doc));

    const documentSnapshot = await getDocs(q).then(
      (querySnapshot) => querySnapshot.docs[0]
    );

    const data = documentSnapshot.data();
    console.log("Document IDs:", documentSnapshot.id);

    // Set the document ID to the local storage
    localStorage.setItem("x-user-id", documentSnapshot.id);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { registerWithEmailAndPassword, logInWithEmailAndPassword, logout };
