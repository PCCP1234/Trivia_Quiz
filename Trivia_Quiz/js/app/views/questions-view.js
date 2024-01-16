define(["services/trivia-service", "views/menu-view"], function (triviaService, menuView) {
  const internals = {
    tag: {},
    index: 0,
    results: [],
  };

  const externals = {};

  const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // Troca os elementos de posição
    }
  };

  internals.createQuestions = function (questions) {
    
    let arrRightQuestion = [questions.results[internals.index].correct_answer];
    let arrIncorrectQuestions = questions.results[internals.index].incorrect_answers;

    let arrAllChoices = arrRightQuestion.concat(arrIncorrectQuestions);

    shuffleArray(arrAllChoices);

    return /* HTML */ `
        <h2>Quiz Section</h2>

        <div class="form-group">
          <label for="theme" class>${
            questions.results[internals.index].category
          }</label>
        </div>

        <div class="form-group">
          <label for="num_right_answers">Number of Right Answers: ${internals.results.filter(result => result === true).length}</label>
        </div>

        <div class="form-group">
          <label for="question_number">Question Number</label>
        </div>
        <div>
          <label for="question">${questions.results[internals.index].question}</label>
        </div>

        <div class="mb-3">
          <div class="radio">
            <label><input type="radio" name="options" value="${arrAllChoices[0]}"> ${arrAllChoices[0]}</label>
          </div>
          <div class="radio">
            <label><input type="radio" name="options" value="${arrAllChoices[1]}"> ${arrAllChoices[1]}</label>
          </div>
          <div class="radio">
            <label><input type="radio" name="options" value="${arrAllChoices[2]}"> ${arrAllChoices[2]}</label>
          </div>
          <div class="radio">
            <label><input type="radio" name="options" value="${arrAllChoices[3]}"> ${arrAllChoices[3]}</label>
          </div>
        </div>
        <button id='next'>Next</button>
        <button id='backMenu'>Menu</button>
      </div>`;
  };

  internals.checkAnswer = function (questions) {
    const selectedAnswer = $('input[name="options"]:checked').val();
    const correctAnswer = questions.results[internals.index].correct_answer;

    internals.results.push(selectedAnswer === correctAnswer);
  };

  internals.backMenu = function () {
    $('#backMenu').on("click", function () {
      $('.container').empty();
      if (window.location.hash == "#gameQuestions") {
        window.location.hash = "#menu"
      } else {
        console.error("menuView não está definido ou não tem um método render.");
      }
    });
  };

  internals.createView = function (questions) {
    internals.tag.questions = $(internals.createQuestions(questions));
    $(".container").empty().append(internals.tag.questions);
    console.log("Create view ", internals.tag.questions);

    // Adiciona evento ao botão "Next"
    $('#next').on("click", function () {
      internals.checkAnswer(questions);

      internals.index++;
      if (internals.index < questions.results.length) {
        internals.createView(questions);
      } else {
        console.log("Não há mais perguntas. Resultados:", internals.results);
        // Adicione aqui o código para lidar com o fim das perguntas, se necessário
      }
    });
    internals.backMenu();
    // Adiciona evento ao botão "Back to Menu"
  };

  externals.render = function (questions) {
    console.log("render");
    if (internals.tag.questions) {
      internals.questions.empty();
    }

    internals.results = []; // Limpa os resultados ao renderizar uma nova pergunta
    console.log(internals.tag.questions);
    internals.createView(questions);

    
  };

  return externals;
});