define(["views/menu-view"],function (menuView) {
  const internals = {}; // estado interno
  const externals = {}; // API externa

  externals.getTriviaQuestions = async function () {

    
    
    
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('theme').value;
    const difficultyInput = document.querySelector('input[name="difficulty"]:checked');
    const difficulty = difficultyInput ? difficultyInput.value : null;
    const type = "multiple";

    
    if (!amount || !category || !difficulty) {
      console.error("Valores de entrada inválidos");
      return null;
    }

    
    const url = "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + "&difficulty=" + difficulty + "&type=" + type;
    const options = {
      method: "GET",
    };

    try {
      
      return await (await fetch(url, options)).json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return externals;
});
