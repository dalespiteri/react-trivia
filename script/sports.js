/**
shuffle()
shuffles an array
@param {array} arr
@return {array}
**/

const shuffle = function(arr) {
  let temp = null;
  let l = arr.length;
  arr.forEach(function(element, index) {
    let randomPick = Math.floor(Math.random() * 1);
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
    let $question = $('<div class="question">' + q.question + '</div>')
    let $answers = $('<ul>' + q.answers.map(function(a){
      return '<li class="answer answer' + (a.correct ? ' correct' : '') + '">' + a.answer + '</li>'
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
  appendScoreToDOM();
  append a score to the DOM
  @param {value} score - an updated score value
  @sideEffects: DOM manipulation using jquery
  */
const appendScoreToDOM = function (score) {
  let $scoreSpace = $('#scoreSpace'); // get our DIV for our score
  let $score = '<p>' + score + '</p>';
  $scoreSpace.empty().append($score); // empty the DIV before updating it with a new value
}

/**
 * $(document.ready)  // shorthand for $(document).ready(function() { ... });\
 */
$(function() {
  $.ajax({
    type: "GET",
    url: "https://opentdb.com/api.php?amount=10&category=21",
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
      $(".answer").click(function() {
        // set up the clicks.
        if ($(this).hasClass("correct")) {
          alert("RIGHT!");
          score += 10;
          appendScoreToDOM(score);
        } else {
          alert("WRONG");
          score += 0;
          appendScoreToDOM(score);
        }
      });

      $('.qs0 ul li').click(function(){
        $('.qs0').removeClass('active');
        $('.qs1').addClass('active');
      });
      $('.qs1 ul li').click(function(){
        $('.qs1').removeClass('active');
        $('.qs2').addClass('active');
      });
      $('.qs2 ul li').click(function(){
        $('.qs2').removeClass('active');
        $('.qs3').addClass('active');
      });
      $('.qs3 ul li').click(function(){
        $('.qs3').removeClass('active');
        $('.qs4').addClass('active');
      });
      $('.qs4 ul li').click(function(){
        $('.qs4').removeClass('active');
        $('.qs5').addClass('active');
      });
      $('.qs5 ul li').click(function(){
        $('.qs5').removeClass('active');
        $('.qs6').addClass('active');
      });
      $('.qs6 ul li').click(function(){
        $('.qs6').removeClass('active');
        $('.qs7').addClass('active');
      });
      $('.qs7 ul li').click(function(){
        $('.qs7').removeClass('active');
        $('.qs8').addClass('active');
      });
      $('.qs8 ul li').click(function(){
        $('.qs8').removeClass('active');
        $('.qs9').addClass('active');
      });

    }
  });
});
