const monthPicker = document.querySelector(".month");
const yearPicker = document.querySelector(".year-picker");

const yearText = document.querySelector(".year-picker .year");
const monthSelection = document.querySelector(".months");

const todayTime = document.querySelector(".clock");
const todayDate = document.querySelector(".date");

const daysOfMonth = document.querySelector(".days");

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

monthPicker.addEventListener("click", function () {
  monthSelection.classList.add("display-months");
});

function renderTimer() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();

  todayTime.innerHTML = `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${
    s < 10 ? "0" : ""
  }${s} ${h < 12 ? "am" : "pm"}`;

  const day = today.getDay();
  const month = today.getMonth();
  const date = today.getDate();
  const year = today.getFullYear();

  todayDate.innerHTML = `${days[day]}, ${months[month]} ${date}, ${year}`;

  setInterval(() => {
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    todayTime.innerHTML = `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${
      s < 10 ? "0" : ""
    }${s} ${h < 12 ? "am" : "pm"}`;
  }, 1000);
}

const date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

function renderCalendar() {
  let liTag = "";

  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDay();

  // create days of previous month
  for (let i = firstDayOfMonth; i >= 1; i--) {
    liTag += `<li class="inactive">${lastDateOfPrevMonth - i + 1}</li>`;
  }

  // create days of current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    isToday =
      i === new Date().getDate() &&
      currYear === new Date().getFullYear() &&
      currMonth === new Date().getMonth()
        ? "active"
        : "";
    liTag += `<li class=${isToday}>${i}</li>`;
  }

  // create days of next month
  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  daysOfMonth.innerHTML = liTag;
  monthPicker.textContent = months[currMonth];
  yearText.textContent = currYear;
}
monthSelection.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  monthSelection.classList.remove("display-months");
  currMonth = parseInt(id);

  renderCalendar();
});

yearPicker.addEventListener("click", function (e) {
  if (e.target.id === "next") {
    currYear = currYear + 1;
  } else if (e.target.id === "prev") {
    currYear = currYear - 1;
  }
  renderCalendar();
});

document.addEventListener("DOMContentLoaded", function () {
  renderTimer();
  renderCalendar();
});
