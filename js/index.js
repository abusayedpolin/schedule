import { clock, login, eve } from "./functions.js";
import { pullData } from "./DB.js";

eve();
clock();
pullData();
document.querySelector(".login").addEventListener("click", login);
document.querySelector(".keybtn").addEventListener("click", () => {
  let input = document.querySelector(".loginInput");
  if (input.value) {
    if (input.value == 64614) {
        location.href = "https://polinkhan.github.io/schedule/add.html";
    } else {
      input.value = "wrong!!";
      setTimeout(() => {
        input.value = "";
      }, 1000);
    }
  }
});