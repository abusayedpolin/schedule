import { add } from "./functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
export let data = [];

const firebaseConfig = {
  apiKey: "AIzaSyBLAXBrRpNN3dLVpKNW86OOAp4zWVQa2bg",
  authDomain: "schedule2-1e725.firebaseapp.com",
  projectId: "schedule2-1e725",
  storageBucket: "schedule2-1e725.appspot.com",
  messagingSenderId: "518440926789",
  appId: "1:518440926789:web:30e843eb69f9f615b66d2c",
  measurementId: "G-KD0LXCLH62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const colRef = collection(db, "schedules");

getDocs(colRef)
  .then((snapshop) => {
    snapshop.docs.forEach((elem) => {
      data.push({ ...elem.data(), id: doc.id });
    });
    console.log(data);
    data.forEach((elem) => {
      add(elem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export let pushData = (item) => {
  addDoc(colRef, item).then(() => {
    document.querySelector("#wrong").innerText = "upload complete";
  });
};
