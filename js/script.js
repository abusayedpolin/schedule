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

toHrsMin = (start, end) => {
  return time.substring(start, end);
}

localTime = ()=>{
  let ampm;
  (hrs > 12)? ampm = "PM" : ampm = "AM";
  return `${hrs%12}:${min} ${ampm}`;
}

getMonthName = (point)=>{
  switch (point.getMonth()) {
    case 0: return "jan";
    case 1: return "feb";
    case 2: return "mar";
    case 3: return "apr";
    case 4: return "may";
    case 5: return "jun";
    case 6: return "jul";
    case 7: return "aug";
    case 8: return "sep";
    case 9: return "oct";
    case 10: return "nov";
    case 11: return "dec"; 
  }
}

let sub;
let date;
let time;

let day;
let month;
let hrs;
let min;

$(document).ready(function () {
  $("#sub").click(function () {
    sub = $("#getSub").val();
    date = $("#getDate").val();
    time = $("#getTime").val();
    hrs = toHrsMin(0, 2);
    min = toHrsMin(3, 5);
    time = localTime(time);

    if (sub && date && time) {
      document.getElementById("wrong").innerText = "";
      let d = new Date(date);
      d.setHours(hrs);
      d.setMinutes(min);
      day = d.getDate();
      month = getMonthName(d);
      document.getElementById("topic").innerText = sub;
      document.getElementById("text").innerText =`${day} ${month} at ${time}`;
      setInterval(() => {
        document.getElementById("timeLeft").innerText = msToTime(
          d.getTime() - new Date().getTime()
        );
      }, 0);
    } else {
      document.getElementById("wrong").innerText = "enter all input";
    }
  });
});
