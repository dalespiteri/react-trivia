$(function (){ // shorthand for $(document).ready(function() { ... }); 

  var $questionDiv = $('#questions');

  $.ajax({
    type: 'GET',
    url: 'https://opentdb.com/api.php?amount=10&category=21',
    success: function(data) {
      // I see a couple of ways you could clean this up, but yes, for the most part,
      // you won't be able to access the variable "data" outside of this function.
      // There is, however, a trick you can do, which is to send your *own* callback
      // to scoop up the data of the original callback.  

      // first, let's break up these big functions into tiny little functions; 
      var questionArray = data.results;
      console.log(questionArray);
      var question = document.getElementById('headQuestion'); // since we already have jQuery, let's continue to use jQuery's syntax. 
      question.innerHTML = questionArray[0].question;
      var answerArray = [];

      for (i = 0; i < questionArray[0].incorrect_answers.length; i++) {
        // use consistant indentation. I prefer two spaces.  This will not only make
        // code more readable, but also prepare you if you have to code in Python or another
        // language that uses whitespace as part of the syntax. 
        answerArray.push({answer: questionArray[0].incorrect_answers[i], correct: false});
      }

      answerArray.push({answer: questionArray[0].correct_answer, correct: true});

      function shuffle(array) {
        var m = array.length, t, i; // very "classical" but I usually find it's best
        // to enumerate (and declare) all the variables individually. 
        // additionally, I'd like to see more descriptive variable names. 
        // good eye on assigning array.length to a variable, this way you don't
        // have to have the computer count the length of the array every time it's called.
        while (m) { // I wouldn't do it this way, I tend to avoid using i++/i-- because
        // it gets hard to see the mutation.  But perfectly valid. 
        // indent here!
          i = Math.floor(Math.random() * m--); 
          t = array[m];
          array[m] = array[i];
          array[i] = t;
          // ah, yes, the classic "Knuth shuffler"; 
        }
        return array;
      }

      answerArray = shuffle(answerArray);

      console.log(answerArray);

      for (i = 0; i < answerArray.length; i++) {
        var li = document.createElement('li');
        var list = document.getElementById('answerList'); // does this ever change?
        // if not, then it might be a bad idea to put it in the for loop, as you're
        // grabbing it multiple times. 
        var answer = document.createTextNode(answerArray[i].answer);
        var correct = answerArray[i].correct;
        li.className = 'answer ';
        if (correct === false) {
          li.className += 'incorrect'; // interesting use of classname here. Clever, but mayhaps a better way?
        } else {
          li.className += 'correct';
        }
        li.appendChild(answer);
        list.appendChild(li);
      }

      $('.answer').click(function() {
        if ($(this).hasClass('incorrect')) {
          alert('wrong');
        } else {
          alert('right');
        }
      })

    }
  });
});
