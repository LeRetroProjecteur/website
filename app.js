'use strict'

var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
var days_short = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
var months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
var months_short = ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];

function string_to_date(string){
  var date = new Date(string.substring(0, 4), parseInt(string.substring(5, 7))-1, string.substring(8, 10));
  return date;
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
  if (date==null){
    var start_date = new Date(new Date().toDateString());
  } else {
    var start_date = new Date(date.toDateString());
  }
  start_date.setDate(start_date.getDate() - ((start_date.getDay()+4)%7) + 7)
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

function display_showtimes(dictionnary, sep="<br>"){
  var showtime = [];
  for (const [key, value] of Object.entries(dictionnary)){
    var text_row = [];
    for (var i = 0; i < value.length; i++){
      var hour = value[i];
      var minute = parseFloat((60*(hour - Math.floor(hour))).toPrecision(3));
      if (minute<10){
        minute = "0"+minute
      } else {
        minute = minute.toString()
      }
      text_row.push(Math.floor(hour).toString() + "h" + minute);
    }
    showtime.push(key + "&nbsp;: " + text_row.join(', '))
  }
  showtime = showtime.join(sep)
  return showtime
}

function display_real_dict(dictionnary, specified_hour=0){
  var new_dict = {};
  var max_hour = 0;
  for (const [key, value] of Object.entries(dictionnary)){
    for (var i = 0; i < value.length; i++){
      var hour = value[i];
      max_hour = Math.max(max_hour, hour);
      if (hour>=specified_hour){
        if (key in new_dict){
          new_dict[key].push(hour);
        } else {
          new_dict[key] = [hour];
        }
      }
    }
  }
  return [max_hour, new_dict]
}
