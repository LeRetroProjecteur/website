'use strict'

var firebaseConfig = {
  apiKey: "AIzaSyCjvHHSqWGZhh2pcoHF_8ZeKqxT0wRvXuc",
  authDomain: "website-cine.firebaseapp.com",
  projectId: "website-cine",
  storageBucket: "website-cine.appspot.com",
  messagingSenderId: "1060388636946",
  appId: "1:1060388636946:web:ea3752ae94d0ab56e68bcb"
};

var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
var days_short = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
var months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
var months_short = ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function compare_numbers(a, b){
  return a - b;
}

function convert_duration(duration) {
  var mins = Math.floor(duration/60)
  return mins.toString() + " minutes"
}

function string_to_date(string){
  var date = new Date(string.substring(0, 4), parseInt(string.substring(5, 7))-1, string.substring(8, 10));
  return date;
}

function date_to_string(date){
  var string = String(date.getFullYear()).concat('_', String(date.getMonth()+1).padStart(2, '0'), '_', String(date.getDate()).padStart(2, '0'));
  return string;
}

function one_week_later(start_date){
  var end_date = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
  end_date.setDate(end_date.getDate() + 6);
  return end_date;
}

function get_current_week(date=null){
  if (date==null) {
    var start_date = new Date(new Date().toDateString());
  } else {
    var start_date = new Date(date.toDateString());
  }
  start_date.setDate(start_date.getDate() - ((start_date.getDay()+4)%7))
  var end_date = one_week_later(start_date);
  return [start_date, end_date];
}

function datesAreOnSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function datesAreOnSameMonth(first, second) {
  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth();
};

function day_string(date, weekday = true, year = true){
  var string = "";
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
    var end_date = one_week_later(start_date);
  }
  var string = 'Semaine du ';
  if (months[start_date.getMonth()]==months[end_date.getMonth()]){
    string = string.concat(' ', String(start_date.getDate()));
  }
  else{
    string = string.concat(String(start_date.getDate()), ' ', months[start_date.getMonth()]);
  }
  string = string.concat(' au ', String(end_date.getDate()), ' ', months[end_date.getMonth()])
  return string
}

function display_showtimes(showtimes, theater_sep="<br>", show_date=false, date_sep="<br>"){

  var date_list = []

  for (const date of Object.keys(showtimes)){

    var values = showtimes[date]
    var showtime_list = [];

    // Create items array
    var items = Object.keys(values).map(function(key) {
      return [key, values[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
      return first[1]["clean_name"].localeCompare(second[1]["clean_name"]);
    });

    for (const [key, value] of items){

      value.showtimes = value.showtimes.sort(compare_numbers)
      var theater_name = value.clean_name + " (" + value.zipcode_clean + ")";

      var text_row = [];
      for (var i = 0; i < value.showtimes.length; i++){
        var hour = value.showtimes[i];
        var minute = pad(parseFloat((60*(hour - Math.floor(hour))).toPrecision(3)), 2);
        text_row.push(Math.floor(hour).toString() + "h" + minute);
      }
      showtime_list.push(theater_name + "&nbsp;: " + text_row.join(', '))
    };

    var showtime_string = showtime_list.join(theater_sep);
    if(show_date){
      showtime_string = "<b>"+day_string(string_to_date(date), true, false)+"</b> "+showtime_string
    }
    date_list.push(showtime_string)
  }

  var date_string = date_list.join(date_sep)

  return date_string;
}

function format_movie_title(f, style='italic') {
  if (style=='italic'){
    var start_tag = "<i>";
    var end_tag = "</i>";
  } else if (style=='bold'){
    var start_tag = "<b>";
    var end_tag = "</b>";
  } else {
    var start_tag = "";
    var end_tag = "";
  }
  return start_tag + f.title + end_tag + ", " + f.directors + " (" + f.year + ")"
}

function row_text(f, showtimes) {
  var cdc_image = ""
  var sas_image = ""
  if (isCOUPdeCOEUR(f)) {
    cdc_image = "<div class='logo_cdc'> <img src='img/logo_square.png' width='20' alt='';' /> </div>"
  }

  var row = (
    "<tr>" +
      "<td>" +
        "<a href='/details.html?id=" + f.id + "' style='text-decoration:none'>" +
        cdc_image + sas_image +
        format_movie_title(f, 'bold') + "</a>" +
      "</td>" +
      "<td>" + showtimes + "</td>" +
    "</tr>"
  );
  return row
}

var no_movie_playing_at_this_hour = "<b>Aucun film ne joue à cette heure-ci aujourd'hui, regardez demain ?</b>";
var no_movie_for_given_filtering_term = "<b>Aucun film ne correspond à cette recherche aujourd'hui.</b>";

function clean_string(string){
  string = string.replaceAll('.', '');
  string = string.replaceAll('-', ' ');
  string = string.replaceAll("'", ' ');
  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  string = string.toLowerCase();
  return string
}

function at_least_one_word_starts_with_substring(list, substring){
  var output = false;
  for (const word of list) {
    output = output || word.startsWith(substring);
  }
  return output
}

function string_match(term, field){
  field = clean_string(field).split(" ")
  var sub_terms = clean_string(term).split(' ');
  var LOCALoutput = true;
  for (const sub_term of sub_terms) {
    LOCALoutput = LOCALoutput && at_least_one_word_starts_with_substring(field, sub_term);
  }
  return LOCALoutput
}

function movie_info_contains_filtering_term(f, filtering_term){
  if (filtering_term.slice(-1)=="|"){
    filtering_term = filtering_term.slice(0, -1);
  }
  var filtering_field = clean_string(get_movie_info_string(f));
  var filtering_terms = clean_string(filtering_term).split('|');
  var GLOBALoutput = false;
  for (const filtering_term of filtering_terms) {
    var LOCALoutput = string_match(filtering_term, filtering_field)
    GLOBALoutput = GLOBALoutput || LOCALoutput;
  }
  return GLOBALoutput
}

function get_movie_info_string(f) {
  var category = "";
  var sight_and_sound = "";
  if ('sight_and_sound' in f) {
    sight_and_sound = "_s&s_"
  }
  if ('category' in f) {
    if (f["category"] == 'COUP DE CŒUR') category="_cdc_"
    if (f["category"] == 'ON EST CURIEUX') category="_curio_"
  }
  var movie_info_string = (
    f['language'] + " " +
    f['title'] + " " +
    f['original_title'] + " " +
    f['directors'] + " " +
    f['countries'] + " " +
    f['year'] + " " +
    category + sight_and_sound
  );
  return movie_info_string
}

function isCOUPdeCOEUR(f) {
  if ("category" in f) {
    if (f["category"]=="COUP DE CŒUR") {
      return true
    }
  } else {
    return false
  }
}
function isSightandSound(f) {
  if ("sight_and_sound" in f) {
    return true
  } else {
    return false
  }
}

function generate_data_row(f, start, end, filtering_term, checkedNeighborhoods, theater_sep="<br>", show_date=false, date_sep="<br>") {
  var movie_shown = false;
  var showtimes = {};
  for (const [date, values] of Object.entries(f.showtimes)){
    var date_showtimes = {};
    for (const [key, value] of Object.entries(values)){
      var hours = []
      value.showtimes = value.showtimes.sort(compare_numbers)
      for (let m = 0; m < value.showtimes.length; m++){
        var hour = value.showtimes[m];
        if (checkedNeighborhoods.includes(value.location_2)){
          if (hour >= start && hour <= end) {
            hours.push(hour)
          }
        }
      }
      if (hours.length>0){
        date_showtimes[key] = Object.assign({}, value);
        date_showtimes[key]['showtimes'] = hours;
      }
    }
    if (Object.keys(date_showtimes).length > 0){
      showtimes[date] = date_showtimes
    }
  }

  var movie_still_playing = (Object.keys(showtimes).length > 0)
  var movie_contains_filtering_term = movie_info_contains_filtering_term(f, filtering_term);
  if (movie_still_playing && movie_contains_filtering_term) {
    console.log(showtimes)
    var tblRow = row_text(f, display_showtimes(showtimes, theater_sep, show_date, date_sep))
    $(tblRow).appendTo("#userdata tbody");
    movie_shown = true;
  }
  return [movie_shown, movie_still_playing, movie_contains_filtering_term]
}

function format_cinema_week(f) {
  var string = "<div class='moviebox'>" + "<h3 style='color:grey;'>" + f.week_name_1 + "</h3><br>" + f.week_text_1 + "</div>"
  if (f.week_name_2 != null ) {
    string += "<br><div class='moviebox'>" + "<h3 style='color:grey;'>" + f.week_name_2 + "</h3><br>" + f.week_text_2 + "</div>"
  }
  return string
}
function format_intro(f) {
  return "<div class='moviebox'>" + f.intro + "</div>"
}
function newsletter_week(date) {
  return week_string(get_current_week(string_to_date(date))[0])
};
function format_review(f, title=true, showtimes=null) {
  var string = (
    "<div class='moviebox'><img src='data:image/png;base64," + f.image_file + "'/>" +
    "<h3 style='color:grey;'>" + f.category + "</h3>"
  )
  if (title){
    string += "<h3><a href='/details.html?id=" + f.id + "' style='text-decoration:none'>" + format_movie_title(f, 'italic') + "</a></h3>"
  }
  string += f.review + "<p></p>"
  if (showtimes !== null) {
    string += "<center><b>" + showtimes + "</b></center>"
  } else {
    string += "<div style='text-align:right'>Critique du " + day_string(string_to_date(f.review_date), false) + "</div>"
  }
  string = string + "</div>"
  return string
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.moviesearch')) {
    var search_dropdown = document.getElementsByClassName("dropdown-content");
    for (const elem of search_dropdown) {
      if (elem.classList.contains('show')) {
        elem.classList.remove('show');
      }
    }
    document.getElementById("moviesearch").value = ""
  }
}
function moviesearch() {
  if (document.getElementById("myDropdown").classList.contains('show')==false) {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  var search_term = document.getElementById("moviesearch").value.toLowerCase();
  var list = document.getElementById("myDropdown").getElementsByTagName("a");
  var count = 0;
  for (const elem of list) {
    if (search_term=="" || count >= 5) {
      elem.style.display = "none";
    }
    else{
      var search_field = elem.childNodes[2].value;
      if (string_match(search_term, search_field)) {
        elem.style.display = "";
        count += 1
      } else {
        elem.style.display = "none";
      }
    }
  }
}

function append_data(promise_data, querySnapshot, date){
  var data_aux = [];
  querySnapshot.forEach((doc) => {
    data_aux = doc.data().movies;
    for (var i = 0; i < data_aux.length; i++){
      data_aux[i].showtimes = {}
      data_aux[i].showtimes[date_to_string(date)] = data_aux[i].showtimes_theater
      delete data_aux[i].showtimes_theater
    }
  });
  for (var i = 0; i < data_aux.length; i++){
    var found = false;
    for (var j = 0; j < promise_data.length; j++){
      if (data_aux[i]['id']==promise_data[j]['id']){
        promise_data[j].showtimes[date_to_string(date)] = data_aux[i].showtimes[date_to_string(date)];
        found = true;
        break
      }
    }
    if (found==false){
      promise_data.push(data_aux[i])
    }
  }
  return(promise_data)
}
