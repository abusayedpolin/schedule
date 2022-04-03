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

toHrsMin = (item, start, end) => {
  return item.time.substring(start, end);
};

localTime = (hrs, min) => {
  let ampm;
  hrs > 12 ? (ampm = "PM") : (ampm = "AM");
  return `${hrs % 12}:${min} ${ampm}`;
};

getMonthName = (point) => {
  switch (point.getMonth()) {
    case 0:
      return "jan";
    case 1:
      return "feb";
    case 2:
      return "mar";
    case 3:
      return "apr";
    case 4:
      return "may";
    case 5:
      return "jun";
    case 6:
      return "jul";
    case 7:
      return "aug";
    case 8:
      return "sep";
    case 9:
      return "oct";
    case 10:
      return "nov";
    case 11:
      return "dec";
  }
};

let item1 = {
  sub: "",
  date: "",
  time: "",
};

$(document).ready(function () {
  $("#sub").click(function () {
    item1.sub = $("#getSub").val();
    item1.date = $("#getDate").val();
    item1.time = $("#getTime").val();

    let hrs = toHrsMin(item1, 0, 2);
    let min = toHrsMin(item1, 3, 5);
    item1.time = localTime(hrs, min);

    if (item1.sub && item1.date && item1.time) {
      document.getElementById("wrong").innerText = "";
      let d = new Date(item1.date);
      d.setHours(hrs);
      d.setMinutes(min);
      let day = d.getDate();
      let month = getMonthName(d);
      document.getElementById("topic").innerText = item1.sub;
      document.getElementById(
        "text"
      ).innerText = `${day} ${month} at ${item1.time}`;
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
