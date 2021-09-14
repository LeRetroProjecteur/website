<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include 'head.php';?>
    <title>La semaine prochaine</title>
  </head>

  <body class="light-theme">

    <?php include 'header.php';?>

    <script>

    var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var days_short = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    var months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    var months_short = ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];

    var start_date = new Date();
    start_date.setDate(start_date.getDate() + ((10-start_date.getDay())%7))
    start_monthName = months_short[start_date.getMonth()];

    var end_date = new Date();
    end_date.setDate(end_date.getDate() + ((10-end_date.getDay())%7) + 7);
    end_monthName = months_short[end_date.getMonth()];

    function display_real_dict(dictionnary, specified_hour=0){
      new_dict = {};
      max_hour = 0;
      for (const [key, value] of Object.entries(dictionnary)){
        for (var i = 0; i < value.length; i++){
          hour = value[i]
          max_hour = Math.max(max_hour, hour)
          if (hour>=specified_hour){
            if (key in new_dict){
              new_dict[key].push(hour)
            } else {
              new_dict[key] = [hour]
            }
          }
        }
      }
      return max_hour, new_dict
    }

    function display_showtimes(dictionnary, sep="<br>"){
      showtime = []
      for (const [key, value] of Object.entries(dictionnary)){
        text_row = [];
        for (var i = 0; i < value.length; i++){
          hour = value[i]
          minute = parseFloat((60*(hour - Math.floor(hour))).toPrecision(3))
          if (minute<10){
            minute = "0"+minute
          } else {
            minute = minute.toString()
          }
          text_row.push(Math.floor(hour).toString() + "h" + minute);
        }
        showtime.push(key + ": " + text_row.join(', '))
      }
      showtime = showtime.join(sep)
      return showtime
    }

    $(function() {
      document.getElementById("next_week").innerHTML = 'Semaine du '.concat(
        ' ', String(start_date.getDate()), ' ', start_monthName,
        ' au ',
        ' ', String(end_date.getDate()), ' ', end_monthName
      );
      var movies = [];

      $.getJSON('classic_movies.json', function(data) {
        $.ajaxSetup({cache:false});
        var prev_movie = "";
        var string = ""
        $.each(data.movies, function(i, f) {
          sd_hour = 1;
          var movie = f.date ;
          var md = new Date(movie[0], movie[1]-1, movie[2], 0, 0, 0, 0)

          max_hour = 0
          max_hour, new_dict = display_real_dict(f.showtimes_theater)
          real_showtime = display_showtimes(new_dict, sep="; ")

          if (md>=start_date & md<=end_date){
            if (f.title != prev_movie){
              string = string.concat(
                "<br><h3><i>" + f.title + "</i>, " + f.directors + " (" + f.year + ")</h3>"
              )
            }
            string = string.concat(
              "<b>" + days_short[md.getDay()] + " " + md.getDate() + " " + months_short[md.getMonth()] +
              "</b> " + real_showtime + "<br>"
            )
            prev_movie = f.title;
            // $(row).appendTo("#userdata tbody");
          }
        });
        document.getElementById("week_films").innerHTML = string
      });
    });

    </script>

    <center>
      <b><span id="next_week" class="center" style="font-size: var(--date_font_size);"></span></b>
    </center>
    <span id="week_films"></span>
    <br>

    <?php include 'footer.php';?>

  </body>
</html>
