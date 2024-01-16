/**
 * Router Module
 */
define([], function () {
  const internals = {};
  const externals = {};

  internals.routes = {
    menu: {
      hash: "#menu",
      controller: "menu-controller",
    },
    gameQuestions: {
      hash: "#gameQuestions",
      controller: "gameQuestions-controller",
    },
    wrong: {
      hash: "#wrongAnswer",
      controller: "wrong-controller",
    },
    right: {
      hash: "#rightAnswer",
      controller: "right-controller",
    },
  };

  internals.defaultRoute = "menu";
  internals.currentHash = "";

  externals.start = function () {
    window.location.hash = internals.routes[internals.defaultRoute].hash;
    setInterval(internals.hashCheck, 150);
  };

  internals.hashCheck = function () {
    //nao mudou o HASH
    if (window.location.hash === internals.currentHash) {
      return;
    }
    //MUDOU O HASH E ENCONTROU
    let routeName = Object.keys(internals.routes).find(function (name) {
      return window.location.hash === internals.routes[name].hash;
    });

    //MUDOU O HASH E NAO ENCONTROU
    if (!routeName) {
      routeName = internals.defaultRoute;
      window.location.hash = internals.routes[routeName].hash;
    }

    internals.loadController(internals.routes[routeName].controller);
  };

  internals.loadController = function (controllerName) {
    internals.currentHash = window.location.hash;
    require(["controllers/" + controllerName], function (controller) {
      controller.start();
    });
  };

  return externals;
});
