import {data,pushData} from './DB.js'

let hrs, min, ms;
let htmlElement = `<div class="row my-4 text-center"><div id="topic" class="my-auto textfield col-4 label1"></div><div id="text" class="textfield col-4 label2"></div><div id="timeLeft" class="textfield col-4 label3"></div></div>`;

let msToTime = (s) => {
  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  s = (s - mins) / 60;
  let hrs = s % 24;
  let days = (s - hrs) / 24;
  return `${days}D ${hrs}H ${mins}M ${secs + 1}S left`;
};

let toHrsMin = (time, start, end) => {
  return time.substring(start, end);
};

let localTime = (time) => {
  let ampm;
  toHrsMin(time, 0, 2) > 12 ? (ampm = "PM") : (ampm = "AM");
  return `${toHrsMin(time, 0, 2) % 12}:${toHrsMin(time, 3, 5)} ${ampm}`;
};

let setTime = (de, time) => {
  hrs = toHrsMin(time, 0, 2) * 60;
  min = toHrsMin(time, 3, 5) * 1;
  ms = (hrs + min) * 60000;
  de.setHours(0);
  return de.getTime() + ms;
};

export let input = ()=>{
  const form = document.forms["userInput"];

  if (form["_date"].value) {
    let item = { index: data.length };

    for (let i = 0; i < form.length - 1; i++) {
      item[form[i].name] = form[i].value;
    }
    pushData(item);
  }

};

export let eve = () => {
  $("form").submit(function (e) {
    e.preventDefault();
  });
};

export let login = () => {
  document.querySelector(".login").classList.add("hide");
  document.querySelector(".add").classList.remove("hide");
};

export let clock = ()=>{
  setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleString();
  }, 0);
}

export let add = (item) => {
    document.getElementById("items").innerHTML += htmlElement;
  
    let d = new Date(item._date);
    d.setTime(setTime(d, item._time));

    document.querySelectorAll("#topic")[item.index].innerHTML = item._name;
    document.querySelectorAll("#text")[item.index].innerHTML = localTime(item._time);
  
    setInterval(() => {
      document.querySelectorAll("#timeLeft")[item.index].innerHTML = msToTime(
        d.getTime() - new Date().getTime()
      );
    }, 0);
  };