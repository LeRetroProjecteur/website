'use strict'

let firebaseConfig = {
  apiKey: "AIzaSyCjvHHSqWGZhh2pcoHF_8ZeKqxT0wRvXuc",
  authDomain: "website-cine.firebaseapp.com",
  projectId: "website-cine",
  storageBucket: "website-cine.appspot.com",
  messagingSenderId: "1060388636946",
  appId: "1:1060388636946:web:ea3752ae94d0ab56e68bcb"
};

let days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
let days_short = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
let months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function compare_numbers(a, b){
  return a - b;
}

function convert_duration(duration) {
  let mins = Math.floor(duration/60)
  return mins.toString() + " minutes"
}

function string_to_date(string){
  return new Date(string.substring(0, 4), parseInt(string.substring(5, 7)) - 1, string.substring(8, 10));
}

function dateToString(date){
  return String(date.getFullYear()).concat('_', String(date.getMonth() + 1).padStart(2, '0'), '_', String(date.getDate()).padStart(2, '0'));
}

function one_week_later(start_date){
  let end_date = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
  end_date.setDate(end_date.getDate() + 6);
  return end_date;
}

function get_current_week(date=null){
  let start_date
  if (date==null) {
    start_date = new Date(new Date().toDateString());
  } else {
    start_date = new Date(date.toDateString());
  }
  start_date.setDate(start_date.getDate() - ((start_date.getDay()+4)%7))
  let end_date = one_week_later(start_date);
  return [start_date, end_date];
}

function datesAreOnSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function dayString(date, weekday = true, year = true){
  let string = "";
  if (weekday) {
    string = string.concat(days[date.getDay()], " ")
  }
  string = string.concat(String(date.getDate()), ' ', months[date.getMonth()])
  if (year) {
    string = string.concat(' ', String(date.getFullYear()))
  }
  return string;
}

function week_string(start_date, end_date=null){
  if (end_date==null) {
    end_date = one_week_later(start_date);
  }
  let string = 'Semaine du ';
  if (months[start_date.getMonth()] === months[end_date.getMonth()]){
    string = string.concat(' ', String(start_date.getDate()));
  } else {
    string = string.concat(String(start_date.getDate()), ' ', months[start_date.getMonth()]);
  }
  string = string.concat(' au ', String(end_date.getDate()), ' ', months[end_date.getMonth()])
  return string
}

function display_showtimes(showtimes, theater_sep="<br>", show_date=false, date_sep="<br>") {

  let date_list = []
  showtimes = Object.fromEntries(Object.entries(showtimes).sort());

  for (const date of Object.keys(showtimes)) {

    let values = showtimes[date]
    let items = Object.keys(values).map(function(key) {
      return values[key];
    });
    items.sort(function(first, second) {
      return first["clean_name"].localeCompare(second["clean_name"]);
    });

    let showtime_list = [];
    for (let value of items) {
      value.showtimes = value.showtimes.sort(compare_numbers)
      let theater_name = value.clean_name + " (" + value.zipcode_clean + ")";
      let text_row = [];
      for (let i = 0; i < value.showtimes.length; i++){
        let hour = value.showtimes[i];
        let minute = pad(parseFloat((60*(hour - Math.floor(hour))).toPrecision(3)), 2);
        text_row.push(Math.floor(hour).toString() + "h" + minute);
      }
      showtime_list.push(theater_name + "&nbsp;: " + text_row.join(', '))
    }

    let showtime_string = showtime_list.join(theater_sep);
    if (show_date) {
      showtime_string = "<b>" + dayString(string_to_date(date), true, false)+"</b> " + showtime_string
    }
    date_list.push(showtime_string)
  }

  return date_list.join(date_sep);
}

function format_movie_title(f, style='italic') {
  let start_tag, end_tag
  if (style === 'italic') {
    start_tag = "<i>";
    end_tag = "</i>";
  } else if (style === 'bold') {
    start_tag = "<b>";
    end_tag = "</b>";
  } else {
    start_tag = "";
    end_tag = "";
  }
  return start_tag + f.title + end_tag + ", " + f.directors + " (" + f.year + ")"
}

function row_text(f, showtimes) {
  let cdc = ""
  if (isCOUPdeCOEUR(f)) {
    cdc = "<div class='logo_cdc'><img src='img/logo_square.png' style='max-width: 20px' alt=''/></div>"
  }
  return (
    "<tr>" +
      "<td>" +
        "<a href='/details.html?id=" + f.id + "' style='text-decoration:none'>" + cdc + format_movie_title(f, 'bold') + "</a>" +
      "</td>" +
      "<td>" + showtimes + "</td>" +
    "</tr>"
  )
}

let noMoviePlayingAtThisHour = "<b>Aucun film ne joue à cette heure-ci aujourd'hui, regardez demain ?</b>";
let noMovieForFilteringTerm = "<b>Aucun film ne correspond à cette recherche aujourd'hui.</b>";

function clean_string(string) {
  string = string.replaceAll('-', ' ');
  string = string.replaceAll(/['’]/g, "'");
  string = string.replaceAll("'", ' ');
  string = string.replaceAll('&', 'and');
  string = string.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  string = string.replaceAll(/[^a-zA-Z0-9 #]/g, '');
  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  string = string.toLowerCase();
  return string
}

function at_least_one_word_starts_with_substring(list, substring) {
  let output = false;
  for (const word of list) {
    output = output || word.startsWith(substring);
  }
  return output
}

function string_match(term, field) {
  field = clean_string(field).split(" ")
  let sub_terms = clean_string(term).split(" ");
  let localOutput = true;
  for (const sub_term of sub_terms) {
    localOutput = localOutput && at_least_one_word_starts_with_substring(field, sub_term);
  }
  return localOutput
}

function movie_info_containsFilteringTerm(f, filteringTerm) {
  if (filteringTerm.slice(-1) === "|"){
    filteringTerm = filteringTerm.slice(0, -1);
  }
  let filtering_field = get_movie_info_string(f);
  let filteringTerms = filteringTerm.split('|');
  let globalOutput = false;
  for (const filteringTerm of filteringTerms) {
    let localOutput = string_match(filteringTerm, filtering_field)
    globalOutput = globalOutput || localOutput;
  }
  return globalOutput
}

function get_movie_info_string(f) {
  let movie_info_string = ""
  for (let elem of ['language', 'title', 'original_title', 'directors', 'countries', 'tags']){
    if (elem in f) {
      movie_info_string += f[elem] + " "
    }
  }
  return movie_info_string
}

function isCOUPdeCOEUR(f) {
  if ("category" in f) {
    if (f["category"] === "COUP DE CŒUR") {
      return true
    }
  }
  return false
}

function generateDataRow(f, start, end, filteringTerm, checkedNeighborhoods, theater_sep="<br>", show_date=false, date_sep="<br>") {
  let movie_shown = false;
  let showtimes = {};
  for (const [date, values] of Object.entries(f.showtimes)) {
    let date_showtimes = {};
    for (const [key, value] of Object.entries(values)) {
      let hours = []
      value.showtimes = value.showtimes.sort(compare_numbers)
      for (let m = 0; m < value.showtimes.length; m++) {
        let hour = value.showtimes[m];
        if (checkedNeighborhoods.includes(value.location_2)) {
          if (hour >= start && hour <= end) {
            hours.push(hour)
          }
        }
      }
      if (hours.length>0) {
        date_showtimes[key] = Object.assign({}, value);
        date_showtimes[key]['showtimes'] = hours;
      }
    }
    if (Object.keys(date_showtimes).length > 0) {
      showtimes[date] = date_showtimes
    }
  }

  let movie_stillPlaying = (Object.keys(showtimes).length > 0)
  let movie_containsFilteringTerm = movie_info_containsFilteringTerm(f, filteringTerm);
  if (movie_stillPlaying && movie_containsFilteringTerm) {
    let tblRow = row_text(f, display_showtimes(showtimes, theater_sep, show_date, date_sep))
    $(tblRow).appendTo("#userdata tbody");
    movie_shown = true;
  }
  return [movie_shown, movie_stillPlaying, movie_containsFilteringTerm]
}

function format_cinema_week(f) {
  let string = "<div class='moviebox'>" + "<h3 style='color:grey;'>" + f.week_name_1 + "</h3><br>" + f.week_text_1 + "</div>"
  if (f.week_name_2 != null ) {
    string += "<br><div class='moviebox'>" + "<h3 style='color:grey;'>" + f.week_name_2 + "</h3><br>" + f.week_text_2 + "</div>"
  }
  return string
}
function format_intro(f, date=false) {
  let intro = "<div class='moviebox'>" + f.intro
  if (date) {
    intro += "<div style='text-align:right'>Édito du " + dayString(string_to_date(f.date), false) + "</div>"
  }
  intro +=  "</div>"
  return intro
}
function format_review(f, title=true, date=false, showtimes=null) {
  let string = (
    "<div class='moviebox'><img src='data:image/png;base64," + f.image_file + "' alt=''/>" +
    "<h3 style='color:grey;'>" + f.category + "</h3>"
  )
  if (title) {
    string += "<h3><a href='/details.html?id=" + f.id + "' style='text-decoration:none'>" + format_movie_title(f, 'italic') + "</a></h3>"
  }
  string += f.review
  if (date) {
    string += "<div style='text-align:right'>Critique du " + dayString(string_to_date(f.review_date), false) + "</div>"
  }
  if (showtimes !== null) {
    string += "<div style=\"text-align: center;\"><b>" + showtimes + "</b></div>"
  }
  string = string + "</div>"
  return string
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.movie-search')) {
    let search_dropdown = document.getElementsByClassName("dropdown-content");
    for (const elem of search_dropdown) {
      if (elem.classList.contains('show')) {
        elem.classList.remove('show');
      }
    }
    document.getElementById("movie-search").value = ""
  }
}
function searchMovies() {
  if (!document.getElementById("my-dropdown").classList.contains('show')) {
    document.getElementById("my-dropdown").classList.toggle("show");
  }
  let search_term = document.getElementById("movie-search").value.toLowerCase();
  let list = document.getElementById("my-dropdown").getElementsByTagName("a");
  let count = 0;
  for (const elem of list) {
    if (search_term === "" || count >= 5) {
      elem.style.display = "none";
    }
    else{
      let search_field = elem.childNodes[2].value;
      if (string_match(search_term, search_field)) {
        elem.style.display = "";
        count += 1
      } else {
        elem.style.display = "none";
      }
    }
  }
}

function appendData(promiseData, querySnapshot, date) {
  let data_aux = [];
  querySnapshot.forEach((doc) => {
    data_aux = doc.data().movies;
    for (let i = 0; i < data_aux.length; i++) {
      data_aux[i].showtimes = {}
      data_aux[i].showtimes[dateToString(date)] = data_aux[i].showtimes_theater
      delete data_aux[i].showtimes_theater
    }
  });
  for (let i = 0; i < data_aux.length; i++) {
    let found = false;
    for (let j = 0; j < promiseData.length; j++) {
      if (data_aux[i]['id'] === promiseData[j]['id']) {
        promiseData[j].showtimes[dateToString(date)] = data_aux[i].showtimes[dateToString(date)];
        found = true;
        break
      }
    }
    if (!found) {
      promiseData.push(data_aux[i])
    }
  }
  return(promiseData)
}

function updateStartTime(startTime, date){
  let nd = new Date();
  let current_time = 0;
  if (datesAreOnSameDay(date, nd)){
    current_time = nd.getHours()+nd.getMinutes()/60 - 0.34;
  }
  startTime = Math.max(startTime, current_time);
  return startTime
}

function moveDateForward(selectedDate, slider) {
  slider.noUiSlider.set([0, 24]);
  selectedDate.setDate(selectedDate.getDate()+1);
  document.getElementById("date-of-today").innerHTML = dayString(selectedDate);
  document.getElementById("date-backward").style.color = "var(--red)";
  return selectedDate
}
function moveDateBackward(selectedDate, slider) {
  slider.noUiSlider.set([0, 24]);
  let nd = new Date();
  if (!datesAreOnSameDay(nd, selectedDate)){
    selectedDate.setDate(selectedDate.getDate()-1);
    document.getElementById("date-of-today").innerHTML = dayString(selectedDate);
    if (datesAreOnSameDay(nd, selectedDate)) {
      document.getElementById("date-backward").style.color = "var(--lightgrey)";
    } else {
      document.getElementById("date-backward").style.color = "var(--red)";
    }
  }
  return selectedDate
}
function formatSlider(slider) {
  noUiSlider.create(slider, {
    start: [0, 24],
    connect: true,
    step: 1,
    margin: 1,
    range: {'min': 0, 'max': 24}
  });
  return slider
}
function updateSlider(startTime, endTime) {
  startTime = Math.round(document.getElementsByClassName("noUi-handle-lower")[0].getAttribute("aria-valuenow"));
  endTime = Math.round(document.getElementsByClassName("noUi-handle-upper")[0].getAttribute("aria-valuenow"));
  document.getElementById('slider-range-value').innerHTML = (
      "Séances entre <b style='color:var(--red); font-weight:bold;'>" + startTime + "h et " + endTime + "h</b>"
  );
  return [startTime, endTime]
}