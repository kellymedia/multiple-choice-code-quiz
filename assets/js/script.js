// remove the Begin button when clicked
$('#begin').on('click', function(){
    $('#begin').remove();
  quiz.loadQuestion();

})

// when user clicks, quiz begins

$(document).on('click','.answer-button',function(e){
    quiz.clicked(e);
})

$(document).on('click','#reset',function(){
    quiz.reset();
})

// These are the questions that the user will answer

var questions = [{
    question: "Which tag do we insert an external JavaScript file in?",
    answers: ["javascript", "div", "body", "script"],
    correctAnswer: "script",
}, {
    question: "Where is the correct place to insert a JavaScript file reference?",
    answers: ["The HEAD section", "The BODY section", "Both the HEAD and the BODY sections"],
    correctAnswer: "The BODY section",
}, {
question: "Javascript is the same as Java",
    answers: ["True", "False"],
    correctAnswer: "False",
},
];


var quiz = {
    questions:questions,
    currentQuestion:0, 
    counter:30, 
    correct:0,
    incorrect:0,
    unanswered:0,
    
    timer: function(){
        quiz.counter --;
        $('#counter').html(quiz.counter); 
        if(quiz.counter<=0){
            console.log("TIMES UP!")
            quiz.timesUp();
        }
    },
    loadQuestion: function (){
        timer = setInterval(quiz.timer,1000);
        $('#subwrapper').html("<h2> Time to Guess: <span id ='counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[quiz.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[quiz.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button id="button- '+i+'" data-name="'+questions[quiz.currentQuestion].answers[i]+'">'+questions[quiz.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        quiz.counter = 30;
        $('#counter').html(quiz.counter);
        quiz.currentQuestion++;
        quiz.loadQuestion();

    },
    timesUp: function(){
        clearInterval(timer);
        quiz.unanswered++;
        $('#subwrapper').html('<h2>Out of time!<h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[quiz.currentQuestion].correctAnswer+'</h3>');
        if(quiz.currentQuestion==questions.length-1){
            setTimeout(quiz.results,3*1000);
        } else{
            setTimeout(quiz.nextQuestion,3*1000);
        }

    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html('<h2>Complete!</h2>')
        $('#subwrapper').append(" Correct: " +quiz.correct + '<br/>');
        $('#subwrapper').append(" Incorrect: " +quiz.incorrect + '<br/>');
        $('#subwrapper').append(" Unanswered: " +quiz.unanswered + '<br/>');
        $('#subwrapper').append("<button id= reset>Play again?</button>")


    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[quiz.currentQuestion].correctAnswer){
            quiz.correctAnswer();
    } else {
        quiz.correctAnswer();
    }

    },
    correctAnswer: function(){
        console.log("Correct!")
        clearInterval(timer);
        quiz.correct++;
        $('#subwrapper').html('<h2> Correct!</h2>');
        if(quiz.currentQuestion==questions.length-1){
            setTimeout(quiz.results,2*1000);
        } else{
            setTimeout(quiz.nextQuestion,2*1000);
        }

    },
    incorrectAnswer: function(){
        console.log("Incorrect")
        clearInterval(timer);
        quiz.incorrect++;
        $('#subwrapper').html('<h2> Incorrect!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[quiz.currentQuestion].correctAnswer+'</h3>');
        if(quiz.currentQuestion==questions.length-1){
            setTimeout(quiz.results,2*1000);
        } else{
            setTimeout(quiz.nextQuestion,2*1000);
        }

    },
    reset: function(){
        quiz.currentQuestion = 0;
        quiz.counter = 0;
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.unanswered = 0;
        quiz.loadQuestion();

    }

}