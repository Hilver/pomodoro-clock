$(document).ready(function(){

  var breakLength = document.getElementById('leftText').innerHTML;
  var sessionLength = document.getElementById('rightText').innerHTML;

  $("#leftMinus").click(function(){
    breakLength = breakLength - 1;
    $("#leftText").html(breakLength);
//    console.log(breakLength);
    if(breakLength <= 1){
      breakLength = 1;
      $("#leftText").html(breakLength);
    }
  });

   $("#leftPlus").click(function(){
    breakLength = ++breakLength;
    $("#leftText").html(breakLength);
//    console.log(breakLength);
  });

  $("#rightMinus").click(function(){
    sessionLength = sessionLength - 1;
    $("#rightText").html(sessionLength);
    $("#time").html(sessionLength);
//    console.log(sessionLength);
    if(sessionLength <= 1){
      sessionLength = 1;
      $("#rightText").html(sessionLength);
      $("#time").html(sessionLength);
    }
    clearInterval(nIntervId);
  });

   $("#rightPlus").click(function(){
    sessionLength = ++sessionLength;
    $("#rightText").html(sessionLength);
     $("#time").html(sessionLength);
     clearInterval(nIntervId);
//    console.log(sessionLength);
  });


   var functionIsRun = false;

  function startBreak(breakTime, display) {
    var timer = breakTime, minutes, seconds;
   nIntervId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
      var width = ((breakTime - timer)/breakTime) * 278;
        $("#breakProgress").width(width);
//      console.log(width);

        display.text(minutes + ":" + seconds);

        if(--timer < 0) {
           timer = breakTime;
        }
       if(width === 278){
          timer = 0;
         $("#breakProgress").width(0);
          clearInterval(nIntervId);
         $(".component").removeClass("disabledbutton");
        var sessionTime = 60 * sessionLength;
        startTimer(sessionTime, display);
         $(".info").html("Session Time!");
         new Audio('Japanese_bell_sound.mp3').play();
      }

    }, 1000);
  }

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    functionIsRun = true;
    nIntervId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var width = ((duration - timer)/duration) * 278;
        $("#progress").width(width);
    //    console.log(width);

        display.text(minutes + ":" + seconds);

        if(--timer < 0) {
            timer = duration;
        }

        if(width === 278){
        timer = 0;
        var breakTime = 60 * breakLength;
        clearInterval(nIntervId);
        $(".info").html("Break Time!");
        startBreak(breakTime, display);
        new Audio('Japanese_bell_sound.mp3').play();
      }
    }, 1000);
}


  $("#clock").click(function(){
    if(functionIsRun === false){
      $(".component").addClass("disabledbutton");
      $(".info").html("Session Time!");
    var timinig = 60 * sessionLength,
        display = $('#time');
    startTimer(timinig, display);
    }else{
     clearInterval(nIntervId);
     functionIsRun = false;
      $(".component").removeClass("disabledbutton");
    }
});


});
