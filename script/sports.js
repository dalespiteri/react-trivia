// $(document).ready(function () {
//
//   $.getJSON('https://opentdb.com/api.php?amount=10&category=21', function(triviaResults) {
//     var testtriv = triviaResults.results;
//     console.log(test)
//   });
//
//   function addElement() {
//     var newDiv = document.createElement('div');
//     var newContent = document.createTextNode(questions);
//     newDiv.appendChild(newContent);
//     var currentDiv = document.getElementById('questions');
//     document.body.insertBefore(newDiv, currentDiv);
//     console.log(testtriv);
//   }
//
//   addElement();
//
// });


$(function (){

  var $questionDiv = $('#questions');

  $.ajax({
    type: 'GET',
    url: 'https://opentdb.com/api.php?amount=10&category=21',
    success: function(data) {
      var questionArray = data.results;
      console.log(questionArray);
      var question = document.getElementById('headQuestion');
      var list = document.getElementById('answerList');
      question.innerHTML = questionArray[0].question;

      for (i = 0; i < questionArray[0].incorrect_answers.length; i++) {
              var listItem = document.createElement('li');
              var wrongAnswer = document.createTextNode(questionArray[0].incorrect_answers[i]);
              listItem.appendChild(wrongAnswer);
              list.appendChild(listItem);
      }
    }
  });
});
