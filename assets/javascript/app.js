var card = $("#quiz-area");

// Question set
var questions = [
  {
    question: "Who is the captain of the Nautilus?",
    answers: ["Nemo", "Gulliver", "Phineas Fogg", "Jim Hawking"],
    correctAnswer: "Nemo"
  },
  {
    question: "Which of these is NOT a Bennet sister?",
    answers: ["Charlotte", "Jane", "Kitty", "Marie"],
    correctAnswer: "Charlotte"
  },
  {
    question: "What makes Alice to reduce her size in Wonderland?",
    answers: ["Water", "Cookies", "Mushrooms", "Roses"],
    correctAnswer: "Water"
  },
  {
    question: "Where does Sherlock Holmes lives?",
    answers: ["London", "Paris", "Dublin", "Scotland"],
    correctAnswer: "London"
  },
  {
    question: "Which popular Disney movie is based on 'Hamlet'?",
    answers: ["The Lion King", "Hercules", "Mulan", "Aladdin"],
    correctAnswer: "The Lion King"
  }
];

// Variable that will hold the setInterval
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 60,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});


