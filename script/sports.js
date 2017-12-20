$(document).ready(function () {

  $.getJSON('https://opentdb.com/api.php?amount=10&category=21', function(triviaResults) {
    console.log(triviaResults.results);
  });

});
