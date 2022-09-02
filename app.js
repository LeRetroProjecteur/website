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

function day_string(date, weekday = true){
  var string = "";
  if (weekday) {
    string = string.concat(days[date.getDay()], " ")
  }
  string = string.concat(String(date.getDate()), ' ', months[date.getMonth()], ' ', String(date.getFullYear()))
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

function display_showtimes(showtimes, sep="<br>", date=false){

  var showtime_list = [];
  for (const [key, value] of Object.entries(showtimes)){
    value.showtimes = value.showtimes.sort(compare_numbers)
    var theater_name = value.clean_name + " (" + value.zipcode_clean + ")";

    var text_row = [];
    for (var i = 0; i < value.showtimes.length; i++){
      var hour = value.showtimes[i];
      var minute = pad(parseFloat((60*(hour - Math.floor(hour))).toPrecision(3)), 2);
      text_row.push(Math.floor(hour).toString() + "h" + minute);
    }
    showtime_list.push(theater_name + "&nbsp;: " + text_row.join(', '))
  }

  var showtime_string = showtime_list.join(sep);

  return showtime_string;
}

function format_movie_title(f, italic=false) {
  if (italic){
    var sym = 'i';
  } else {
    var sym = 'b';
  }
  return "<" + sym + ">" + f.title + "</" + sym + ">, " + f.directors + " (" + f.year + ")"
}

function row_text(f, showtimes) {
  var row = (
    "<tr>" +
      "<td>" +
        "<a href='/details.html?id=" + f.id + "' style='text-decoration:none'>" + format_movie_title(f) + "</a>" +
      "</td>" +
      "<td>" + showtimes + "</td>" +
    "</tr>"
  );
  return row
}

var empty_row_text = "<b>Aucun film ne correspond à cette recherche aujourd'hui.</b>";

function clean_string(string){
  string = string.replaceAll('.', '');
  string = string.replaceAll('-', '');
  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  string = string.toLowerCase();
  return string
}

function contains_list_of_strings(search_string, search_terms){
  var output = true;
  for (const search_term of search_terms) {
    output = output && search_string.includes(search_term)
  }
  return output
}

function get_movie_info_string(f, theaters=true) {
  var movie_info_string = (
    f['language'] + " " +
    f['title'] + " " +
    f['original_title'] + " " +
    f['directors'] + " " +
    f['countries'] + " " +
    f['year'] + " "
  );
  if (theaters) {
    for (const [key, value] of Object.entries(f["showtimes_theater"])) {
      movie_info_string += f["showtimes_theater"][key]["clean_name"] + " "
    }
  }
  return movie_info_string
}

function generate_data_row(f, date, start, end, search_term) {
  var movie_shown = false;
  var nd = new Date();

  if (datesAreOnSameDay(date, nd)){
    var day_hour = nd.getHours()-1;
  } else {
    var day_hour = 0;
  }
  start = Math.max(start, day_hour);
  var search_string = clean_string(get_movie_info_string(f));
  var search_terms = clean_string(search_term).split(',');
  var contains_search_terms = contains_list_of_strings(search_string, search_terms);

  if (contains_search_terms) {
    var showtimes = {};
    for (const [key, value] of Object.entries(f.showtimes_theater)){
      var hours = []
      value.showtimes = value.showtimes.sort(compare_numbers)
      for (let m = 0; m < value.showtimes.length; m++){
        var hour = value.showtimes[m];
        if (document.getElementById(value.location_2).checked){
          if (hour >= start && hour <= end) {
            hours.push(hour)
          }
        }
      }
      if (hours.length>0){
        showtimes[key] = Object.assign({}, value);
        showtimes[key]['showtimes'] = hours;
      }
    }
    if (Object.keys(showtimes).length > 0) {
      var tblRow = row_text(f, display_showtimes(showtimes))
      $(tblRow).appendTo("#userdata tbody");
      movie_shown = true;
    }
  }
  return movie_shown
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
    string += "<h3><a href='/details.html?id=" + f.id + "' style='text-decoration:none'>" + format_movie_title(f, true) + "</a></h3>"
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
