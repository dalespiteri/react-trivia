// see Note 1 for Let, Const, and Var;
// see Note 2 for Map and ForEach.

/* We can format out the knuth shuffler into a new function. That way we can reuse it
if anything else needs shuffling */


/**
 * shuffle()
 * Shuffles an array
 * @param {Array} arr - the array to shuffle
 * @return {Array} - a shuffled array; 
 */
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



// Let's try processing the questions into the format we need
// in a seperate function from any of the jQuery manipulations we'll need to make.
/**
 * processQuestions()
 * processes the questions from the backend.
 * @param {Array} questionArray - the array of questions
 *  @instance {Object} - a question
 *    @property {string} question - question text
 *    @property {Array} incorrect_answers
 *      @instance {string} - an incorrect answer
 *    @property {string} correct answer
 * 
 * @returns {Array} - a processed array of questions
 *   @property {string} question - the question text
 *   @property {Array} answers - the array of answers
 *     @instance {Object} answer - an answer
 *       @property {string} answer - the answer text
 *       @property {boolean} correct - whether the answer is correct; 
 */
const processQuestions = function(questionArray) {
  // return a new array of questions based on our original array of questions.
  return questionArray.map(function(question) {
    // take each question element in the array;
    // create a new array of answers based on our incorrect answers;
    let answers = question.incorrect_answers.map(function(incor) {
      // turn it into an object with seperate "answer" and "correct" values;
      return {
        answer: incor,
        correct: false
      };
    });
    // answers should now be an array of objects of the form {answer, correct};
    // add on our known correct answer:
    answers = answers.concat({
      answer: question.correct_answer,
      correct: true
    });
    // we now have an array of answers, including a correct one and incorrect ones.
    answers = shuffle(answers); // shuffle our answers;
    // return an object containing our question, and the shuffled answers to be used in the
    // new questionArray that we are returning.
    return {
      question: question.question,
      answers: answers
    };
    // though this return statement occurs *after* the first return statement in the text of the code,
    // this return statement is for the *inner* function of the map.
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
    let $questionSpace = $('<div class="question">' + q.question + '</div>')
    let $answerSpace = $('<ul>' + q.answers.map(function(a){
      return '<li class="answer' + (a.correct ? ' correct' : '') + '">' + a.answer + '</li>'
    }).join('') + '</ul>')
    $questionHead.append($questionSpace).append($answerSpace); 
  });
  // since this mutates the dom directly, there is no need for a return statement;
  // the appendQuestionsToDom function relies entirely upon *side effects.*
  // a term you'll learn later.
  // it usually makes a lot of sense to avoid using side effects when possible,
  // but jQuery is built upon side-effects.
};

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
      $(".answer").click(function() {
        // set up the clicks.
        if ($(this).hasClass("correct")) {
          alert("RIGHT!");
        } else {
          alert("WRONG");
        }
      });
    }
  });
});