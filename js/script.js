$("form").submit(function (e) {
  e.preventDefault();
});

setInterval(() => {
  document.getElementById("clock").innerText = new Date().toLocaleString();
}, 0);

function msToTime(s) {
  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  s = (s - mins) / 60;
  let hrs = s % 24;
  let days = (s - hrs) / 24;
  return `${days}D ${hrs}H ${mins}M ${secs + 1}S left`;
}

toHrsMin = (time, start, end) => {
  return time.substring(start, end);
};

localTime = (hrs, min) => {
  let ampm;
  hrs > 12 ? (ampm = "PM") : (ampm = "AM");
  return `${hrs % 12}:${min} ${ampm}`;
};

let htmlElement = `<div class="row my-4 text-center">
<div id="topic" class="my-auto textfield col-4 label1"></div>
<div id="text" class="textfield col-4 label2"></div>
<div id="timeLeft" class="textfield col-4 label3"></div>
</div>`;

let items = [
  (item = {
    index : 0,
    sub: "VIP",
    date: "2022-04-07",
    time: "15:00",
  }),
  (item = {
    index : 1,
    sub: "DBMS",
    date: "2022-04-08",
    time: "16:30",
  }),
  (item = {
    index : 2,
    sub: "ISM",
    date: "2022-04-06",
    time: "14:00",
  }),
];

add = (item)=>{
  document.getElementById("items").innerHTML += htmlElement;

  let hrs = toHrsMin(item.time, 0, 2);
  let min = toHrsMin(item.time, 3, 5);
  let time = localTime(hrs, min);

  let d = new Date(item.date);
  d.setHours(hrs);
  d.setMinutes(min);

  document.querySelectorAll("#topic")[item.index].innerHTML = item.sub;

  document.querySelectorAll("#text")[item.index].innerHTML = time;

  setInterval(() => {
    console.log(item.index);
    document.querySelectorAll("#timeLeft")[item.index].innerHTML = msToTime(
    d.getTime() - new Date().getTime()
    );
  }, 0);
}

start = () => {
  items.forEach((item) => {
    add(item);
  });
};

start();
$(document).ready(function () {
  $("#sub").click(function () {
    let item = {};
    item.index = items.length;
    item.sub = $("#getSub").val();
    item.date = $("#getDate").val();
    item.time = $("#getTime").val();

    if (item.sub && item.date && item.time) {
      document.getElementById("wrong").innerText = "";
      items.push(item);
      add(item);
    } else {
      document.getElementById("wrong").innerText = "enter all input";
    }
  });
});
