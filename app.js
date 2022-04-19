'use strict'

var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
var days_short = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
var months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
var months_short = ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}


function parseDate(input, format) {
  format = format || 'yyyy-mm-dd'; // default format
  var parts = input.match(/(\d+)/g),
      i = 0, fmt = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });

  return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
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
  if (date==null){
    var start_date = new Date(new Date().toDateString());
  } else {
    var start_date = new Date(date.toDateString());
  }
  start_date.setDate(start_date.getDate() - ((start_date.getDay()+4)%7))
  var end_date = one_week_later(start_date);
  return [start_date, end_date];
}

function get_next_week(date=null){
  var start_date = new Date(date.toDateString());
  start_date.setDate(start_date.getDate() - ((start_date.getDay()+4)%7))
  var end_date = one_week_later(start_date);
  return [start_date, end_date];
}

function week_string(start_date, end_date=null){
  if (end_date==null){
    var end_date = one_week_later(start_date);
  }

  if (months[start_date.getMonth()]==months[end_date.getMonth()]){
    return 'Semaine du '.concat(
      ' ', String(start_date.getDate()),
      ' au ',
      ' ', String(end_date.getDate()), ' ', months[end_date.getMonth()]
    );
  }
  else{
    return 'Semaine du '.concat(
      ' ', String(start_date.getDate()), ' ', months[start_date.getMonth()],
      ' au ',
      ' ', String(end_date.getDate()), ' ', months[end_date.getMonth()]
    );
  }
}

function day_string(date){
  return days[date.getDay()].concat(
    ' ', String(date.getDate()),
    ' ', months[date.getMonth()],
    ' ', String(date.getFullYear())
  );
}

function datesAreOnSameDay(first, second) {
  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
}

function datesAreOnSameMonth(first, second) {
  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth();
};

function display_showtimes(showtimes, sep="<br>", date=false){

  var showtime_list = [];
  for (const [key, value] of Object.entries(showtimes)){

    var theater_name = value.clean_name + " (" + value.zipcode_clean + ")";

    var text_row = [];
    value.showtimes = value.showtimes.sort();
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

function get_table_row(f, showtimes) {
  var row = "<tr>" + "<td><b>" + f.title + "</b> (" + f.directors + ", " + f.year + ")" + "</td>" +
    "<td>" + showtimes + "</td>" +
    "</tr>";
  return row
}

function get_full_movie_string(f){
  var string_total = ""
  string_total += f['language'] + " "
  string_total += f['title'] + " "
  string_total += f['original_title'] + " "
  string_total += f['directors'] + " "
  string_total += f['countries'] + " "
  for (const [key, value] of Object.entries(f["showtimes_theater"])) {
    string_total += f["showtimes_theater"][key]["name"]
  }
  return string_total;
}

function clean_string(string){
  string = string.replaceAll('.', '');
  string = string.replaceAll('-', '');
  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return string
}

function generate_data_table(f, date, constraint){
  var start = document.getElementsByClassName("noUi-handle-lower")[0].getAttribute("aria-valuenow");
  var end = document.getElementsByClassName("noUi-handle-upper")[0].getAttribute("aria-valuenow");
  var nd = new Date();

  if (datesAreOnSameDay(date, nd)){
    var day_hour = nd.getHours()-1;
  } else {
    var day_hour = 0;
  }
  start = Math.max(start, day_hour);
  var string_total = get_full_movie_string(f);
  constraint = clean_string(constraint);
  string_total = clean_string(string_total);

  if ((constraint == "") || (string_total.toLowerCase().includes(constraint.toLowerCase()))){
    var showtimes = {};
    for (const [key, value] of Object.entries(f.showtimes_theater)){
      var hours = []
      value.showtimes = value.showtimes.sort()
      for (let m = 0; m < value.showtimes.length; m++){
        var hour = value.showtimes[m];
        if (document.getElementById(value.location_2).checked){
          if (hour >= start && hour <= end) {
            hours.push(hour)
          }
        }
      }
      if (hours.length>0){
        showtimes[key] = value;
        showtimes[key]['showtimes'] = hours;
      }
    }
    if (Object.keys(showtimes).length > 0) {
      var tblRow = get_table_row(f, display_showtimes(showtimes))
      $(tblRow).appendTo("#userdata tbody");
    }
  }
}

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCjvHHSqWGZhh2pcoHF_8ZeKqxT0wRvXuc",
  authDomain: "website-cine.firebaseapp.com",
  projectId: "website-cine",
  storageBucket: "website-cine.appspot.com",
  messagingSenderId: "1060388636946",
  appId: "1:1060388636946:web:ea3752ae94d0ab56e68bcb"
};
