define(["views/menu-view", "services/trivia-service"], function (
  menuView,
  triviaService
) {
  const externals = {};
  const internals = {};

  externals.start = function () {
    menuView.render();
  };

  internals.buttonHandler = function () {
    const filmIndex = Math.floor(Math.random() * 6);
    triviaService.getFilm(filmIndex, function (triviaParameters) {
      menuView.render(triviaParameters);
    });
  };

  return externals;
});
