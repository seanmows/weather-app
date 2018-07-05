var quote = "",
  author = "",
  lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1/10,
    color = "",
    colors = ["rgba(0,255,0,","rgba(255, 0, 0,","rgba(204, 51, 255,","rgba(0, 204, 255,","rgba(255, 153, 102,","rgba(255, 255, 0,","rgb(0, 102, 153)","rgb(255, 153, 255)","rgba(230, 92, 0,","rgba(153, 255, 204,"];

waitForQuote();
getQuote();
getColor();




$("#new").on("click", function(){
  changeQuote();
  changeColor();
  getColor();
  getQuote();
});
$("#tweet").on("click", function() {
  window.open("https://twitter.com/intent/tweet?text="+quote+  " -" + author,"_blank");
});

function getQuote() {
  $.getJSON("https://favqs.com/api/qotd", function(json) {
    quote = json.quote.body;
    author = json.quote.author;
  });
}
function changeQuote() {
    $(".quote").html("<p>" + quote + "</p>");
    $(".author").html("<p>- " + author + "</p>");
}
function getColor() {
  var temp = colors[Math.round(Math.random()*colors.length)];
  while(temp == color) {
    temp = colors[Math.round(Math.random()*colors.length)];
  }
  color = temp;
}
function changeColor() {
  $(".background").css({"background": function(){
    return "linear-gradient("+color+"0.45),"+color+"0.45)),url('http://res.cloudinary.com/seanmowz/image/upload/v1524801904/web2.jpg') no-repeat center center";
  }, "background-size" : "cover"});
  $("button").css("background",function(){
    return color + "1)";
  });
  
}
function waitForQuote(){
    if(quote != ""){
        changeQuote();
    }
    else{
        setTimeout(waitForQuote, 250);
    }
}
function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;
  
  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

  $('.background').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

moveBackground();

//Weather
function getWeather(lat, long) {
  var request = new XMLHttpRequest();
  var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >=200 && request.status<400) {
      //success Parse JSON
      var data = JSON.parse(request.responseText);
      var icon = data.weather[0].icon;
      document.getElementById('weather').innerHTML = '<img src='+icon+'>';
      document.getElementById('desc').innerHTML = data.weather[0].main;
      document.getElementById('desc2').innerHTML = data.weather[0].description;
      document.getElementById('curtemp').innerHTML = data.main.temp;
      document.getElementById('mintemp').innerHTML = data.main.temp_min;
      document.getElementById('maxtemp').innerHTML = data.main.temp_max;
    } else {
      //server returned error

    }
  };

  request.onerror = function() {
    //there was a connection error
  };
  request.send();
}

function getPosition() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
     var latitude = position.coords.latitude;
     var longitude = position.coords.longitude; 
      getWeather(latitude, longitude);
    });
}
}

getPosition();