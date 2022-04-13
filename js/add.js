
import { input, eve, dadd } from "./functions.js";
import { pullData, deleteData } from "./DB.js";

eve();
document.querySelector(".submit").addEventListener("click", input);
let data;

setTimeout(() => {
  data = pullData();
  data.forEach(function (elem, i) {
    dadd(elem, i);
  });
  $(document).ready(function(){
    $(".del").click(function(){
     if(confirm("are you sure you want to delete? This will also delete the data from the database ")){
         deleteData(this,data[this.value].id);
     }
    });
  });
}, 1500);