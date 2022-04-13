import { add,setTime } from "./functions.js";
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
      data.push({ ...elem.data(), id: elem.id });
    });
    let sortData = [];
    while (data.length > 0) {
      let index = -1;
      let date = new Date(data[0]["_date"]);
      date.setTime(setTime(date, data[0]["_time"]));

      data.forEach(function (elem, i) {
        let cdate = new Date(elem["_date"]);
        cdate.setTime(setTime(cdate, elem["_time"]));

        if (cdate.getTime() <= date.getTime()) {
          date = cdate;
          index = i;
        }
      });
      sortData.push(data[index]);
      data.splice(index, 1);
    }
    sortData.forEach(function (elem, i) {
      elem.index = i;
      add(elem);
    });
  })
  .catch((err) => {
    console.log(err);
  });
export let pullData = () => data;

export let pushData = (item) => {
  let id = document.querySelector("#status");
  id.innerHTML = "Upload in progess!!";
  addDoc(colRef, item).then(() => {
    id.innerHTML = "Upload Complete!!";
    setTimeout(() => {
      id.innerHTML = "";
    }, 1000);
  });
};

export let deleteData = (point, id) => {
  const docRef = doc(db, "schedules", id);
  deleteDoc(docRef).then(() => {
    point.parentNode.classList.remove("row");
    point.parentNode.innerHTML = "delete done";
  });
};
