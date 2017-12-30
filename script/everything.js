/**
shuffle()
shuffles an array
@param {array} arr
@return {array} a shuffled array
**/

const shuffle = function(arr) {
  let temp = null;
  let l = arr.length;
  arr.forEach(function(element, index) {
    let randomPick = Math.floor(Math.random() * l);
    temp = arr[randomPick];
    arr[randomPick] = arr[index];
    arr[index] = temp;
  });
  return arr;
};

/**
 processQuestions()
 processes the questions pulled from API database
 @param {array} questionArray
   @instance {object} a questions
     @property {string} questions
     @property {array} incorrect_answers
       @instance {string} - an incorrect answerList
     @property {string} correct_answer

 @returns {array} a processed array of questions objects
   @property {string} question
   @property {array} array of answer objects
     @instance {Object} answers
      @property {string} answer - answer text
      @property {boolean} correct - true or false answer
**/

const processQuestions = function(questionArray) {
  return questionArray.map(function(question) {
    let answers = question.incorrect_answers.map(function(incor) {
      return {
        answer: incor,
        correct: false
      };
    });
    answers = answers.concat({
      answer: question.correct_answer,
      correct: true
    });
    answers = shuffle(answers);
    return {
      question: question.question,
      answers: answers
    };
  });
};

/**
 * appendQuestionsToDOM()
 * appends questions to the dom
 * @param {Array} questionArray - an array of questions
 * @sideEffects: Dom manipulation using jQuery
 */
const appendQuestionsToDOM = function(questionArray) {
  $questionHead = $("#headQuestion"); // get our head question div that's already in the dom.
  questionArray.forEach(function(q, index) {
    // for each question.
    let $questionSpace = $('<div class="questionSpace qs' + index +'"></div>');
    let $question = $('<div class="question">' + q.question + '</div>');
    let $answers = $('<ul>' + q.answers.map(function(a){
        return '<li class="answer' + (a.correct ? ' correct' : '') + '">' + a.answer + '</li>'
      }).join('') + '</ul>');
    $questionHead.append($questionSpace);
    $questionSpace.append($question).append($answers);
  });
  // since this mutates the dom directly, there is no need for a return statement;
  // the appendQuestionsToDom function relies entirely upon *side effects.*
  // a term you'll learn later.
  // it usually makes a lot of sense to avoid using side effects when possible,
  // but jQuery is built upon side-effects.
};

/**
  changeActiveQuestion();
  remove the active class on the current question after an answer is clicked
  add an active class to the next question in line using recursive
  @param {number} qNumber -- the question number of the current visible question
  @param {number} end -- the length of the questions array
  @param {function} callback --  a success function to run after the recursive function finishes
  @sideEffects: adds and removes active class from question elements
  */
  const changeActiveQuestion = function (
    qNumber,
    end,
    callback
  ) {
    if (!end || qNumber <= end) {
      $('.qs' + qNumber + ' ul li').click(function(){
        if($(this).hasClass('correct') == true){
          $(this).addClass('correctClick');
        } else {
          $(this).addClass('incorrectClick');
          $('.qs' + qNumber + ' .correct').addClass('correctClick');
        }
        $('.qs' + qNumber + ' ul li').addClass('noEvents'); // block list items from being able to be clicked after the question is answered
        setTimeout(function(){
          $('.qs' + qNumber).removeClass('active');
          $('.qs' + (qNumber + 1)).addClass('active');
          changeActiveQuestion(qNumber + 1, end, callback);
          console.log('timing out');
        }, 1000);
      });
    } else {
      if (callback) {
        callback();
      }
    }
  };

/**
  appendScoreToDOM();
  append a score to the DOM
  @param {value} score - an updated score value
  @sideEffects: DOM manipulation using jquery
  */
const appendScoreToDOM = function (score, qN) {
  let $scoreSpace = $('#scoreSpace'); // get our DIV for our score
  let $score = '<p id="test1">' + score + ' / ' + qN + '<p/><p id="test2">answered correctly</p>';
  $scoreSpace.empty().append($score); // empty the DIV before updating it with a new value
}

/**
  questionTracker();
  fills in the question tracker for right or wrong answers
  @param {array} qtArray - an array with true or false booleans
  @sideEffects: DOM manipulation using jQuery
  */
  const questionTracker = function (qtArray) {
    let $correct = '<img src="./images/right.svg" />';
    let $wrong = '<img src="./images/wrong.svg" />';
    qtArray.forEach(function (element, index) {
      let $questionTracker = $('#questionTracker div:nth-child(' + (index + 1) + ')');
      if (element === true) {
        $questionTracker.empty().append($correct);
      } else {
        $questionTracker.empty().append($wrong);
      }
    });
  }

/**
 * $(document.ready)  // shorthand for $(document).ready(function() { ... });\
 */
$(function() {
  $.ajax({
    type: "GET",
    url: "https://opentdb.com/api.php?amount=10",
    success: function(data) {
      const processedQuestions = processQuestions(data.results);
      console.log(processedQuestions);
      appendQuestionsToDOM(processedQuestions);
      // because we cannot set up the onClicks until after
      // appendQuestionsToDOM has run,
      // and we cannot run that until we get the data back from the server
      // we can only add the onClicks inside the ajax success function;
      // if we wanted to, we could factor this out into a seperate function.
      // but we'd still need to call that seperate function inside this callback.
      $('.qs0').addClass('active');
      let score = 0; // score we use for appendScoreToDOM();
      let correct = []; // array used for questionTracker();
      appendScoreToDOM(score, correct.length);
      $(".answer").click(function() {
        // set up the clicks.

        if ($(this).hasClass("correct")) {
          score += 1;
          correct.push(true);
          appendScoreToDOM(score, correct.length);
          questionTracker(correct);
        } else {
          score += 0;
          correct.push(false);
          appendScoreToDOM(score, correct.length);
          questionTracker(correct);
        }
      });
      changeActiveQuestion(
        0,
        processedQuestions.length - 1,
        function() {
          console.log('success');
          let $winner = '';
          if (score < 5) {
            $winner = '<p>Hmmm... back to the books.</p><p>You only answered</p>';
          } else if (score < 7) {
            $winner = '<p>Your trivia knowledge is aggresively average.</p><p>You answered</p>';
          } else {
            $winner = '<p>CONGRATULATIONS!</p><p>You answered</p>';
          }
          let $gameStats = '<p>' + score + ' / ' + processedQuestions.length + '</p><p>correctly.</p>';
          let $buttons =
            '<div class="endGameButtons">' +
            '<button onclick="location.reload()">play again</button>' +
            '<a href="categories.html"><button>new category</button></a>' +
            '</div>';
          $('.gameEnd').append($winner).append($gameStats).append($buttons);
          $('.gameEnd').addClass('gameEndActive');
        }
      );
    }
  });
});
