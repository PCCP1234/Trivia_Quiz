define(["views/questions-view", "services/trivia-service"], function (
  questionsView,
  triviaService
) {
  const internals = {};
  const externals = {};

  externals.start = async function () {
    try {
      const questions = await triviaService.getTriviaQuestions();
      console.log(questions);
      questionsView.render(questions);
    } catch (error) {
      console.error(error);
    }
  };

  return externals;
});
