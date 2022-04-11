
let items = [];
let htmlElement = `<div class="row my-4 text-center"><div id="topic" class="my-auto textfield col-4 label1"></div><div id="text" class="textfield col-4 label2"></div><div id="timeLeft" class="textfield col-4 label3"></div></div>`;


add = (item) => {
  document.getElementById("items").innerHTML += htmlElement;

  let d = new Date(item._date);
  d.setTime(setTime(d, item._time));

  print(item._name);
  document.querySelectorAll("#topic")[item.index].innerHTML = item._name;
  document.querySelectorAll("#text")[item.index].innerHTML = localTime(item._time);

  setInterval(() => {
    document.querySelectorAll("#timeLeft")[item.index].innerHTML = msToTime(
      d.getTime() - new Date().getTime()
    );
  }, 0);
};

sub = () => {
  const form = document.forms["userInput"];

  if (form["_date"].value) {
    let item = {index : items.length};

    for (let i = 0; i < form.length - 1; i++) {
      item[form[i].name] = form[i].value;
    }
    add(item);
    items.push(item);
  }
};

login = () => {
  document.querySelector(".login").classList.add("hide");
  document.querySelector(".add").classList.remove("hide");
};