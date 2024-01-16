define(["controllers/gameQuestions-controller","services/trivia-service"],function (gameQuestions, triviaService) {
  const internals = {
    tag: {},
  };
  const externals = {};

  internals.createMenu = function () {
   
    return /* HTML */ `

    <h2>Choose Options</h2>
    
    <div class='form-group'>
    <label>Difficulty</label>
    <label class='radio-inline'>
    <input type='radio' name='difficulty' value='easy'> Easy
    </label>
    <label class='radio-inline'>
    <input type='radio' name='difficulty' value='medium'> Medium
    </label>
    <label class='radio-inline'>
    <input type='radio' name='difficulty' value='hard'> Hard
    </label>
    </div>
    
    <div class='form-group'>
    <label for='theme'>Theme</label>
    <select class='form-control' id='theme' name='theme'>
    <option value='9'>General Kownledge</option>
    <option value='25'>Art</option>
    <option value='15'>Geography</option>
    </select>
    </div>

    <div class='form-group'>
    <label for='num_questions'>Number of Questions</label>
    <input type='range' class='form-control-range' id='amount' name='num_questions' min='1' max='20' step='1' value='5'>
    </div>
    <div>
    <button id='start'>Start</button>
    </div>
    </div>`
  };

  internals.createView = function () {
    internals.tag.menu = $(internals.createMenu());
    $(".container").append(internals.tag.menu);
  };

  

  internals.clean = function () {
    if (internals.tag.menu) {
      internals.tag.menu.empty();
      internals.tag.button.empty();
    }
  };
  
  externals.render = function () {
    internals.createView();
    internals.tag.button = $("#start").on("click", function () {
      window.location.hash = "#gameQuestions";
      
    });
  };
  return externals;
});
