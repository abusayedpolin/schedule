import { clock, login, eve, hideLogin } from "./functions.js";

eve();
clock();
document.querySelector(".login").addEventListener("click", login);
document.querySelector(".keybtn").addEventListener("click", () => {
  let input = document.querySelector(".loginInput");
  if (input.value) {
    if (input.value == 64614) {
      hideLogin();
    } else {
      input.value = "wrong!!";
      setTimeout(() => {
        input.value = "";
      }, 1000);
    }
  }
});
