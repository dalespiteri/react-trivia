$(function (){

  var $questionDiv = $('#questions');

  $.ajax({
    type: 'GET',
    url: 'https://opentdb.com/api.php?amount=10&category=21',
    success: function(data) {
      var questionArray = data.results;
      console.log(questionArray);
      var question = document.getElementById('headQuestion');
      question.innerHTML = questionArray[0].question;
      var answerArray = [];

      for (i = 0; i < questionArray[0].incorrect_answers.length; i++) {
              answerArray.push({answer: questionArray[0].incorrect_answers[i], correct: false});
      }

      answerArray.push({answer: questionArray[0].correct_answer, correct: true});

      function shuffle(array) {
        var m = array.length, t, i;
        while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        }
        return array;
      }

      answerArray = shuffle(answerArray);

      console.log(answerArray);

      for (i = 0; i < answerArray.length; i++) {
        var li = document.createElement('li');
        var list = document.getElementById('answerList');
        var answer = document.createTextNode(answerArray[i].answer);
        var correct = answerArray[i].correct;
        if (correct === false) {
          li.className = 'incorrect';
        } else {
          li.className = 'correct';
        }
        li.appendChild(answer);
        list.appendChild(li);
      }

    }
  });
});
