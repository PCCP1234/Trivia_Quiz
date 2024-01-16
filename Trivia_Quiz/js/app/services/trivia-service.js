define(["views/menu-view"],function (menuView) {
  const internals = {}; // estado interno
  const externals = {}; // API externa

  externals.getTriviaQuestions = async function () {

    
    
    // Recupere os valores de entrada dos elementos HTML
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('theme').value;
    const difficultyInput = document.querySelector('input[name="difficulty"]:checked');
    const difficulty = difficultyInput ? difficultyInput.value : null;
    const type = "multiple";

    // Valide os valores de entrada ou forneça padrões
    if (!amount || !category || !difficulty) {
      console.error("Valores de entrada inválidos");
      return null;
    }

    // Construa a URL da API
    const url = "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + "&difficulty=" + difficulty + "&type=" + type;
    const options = {
      method: "GET",
    };

    try {
      // Busque e analise a resposta JSON
      return await (await fetch(url, options)).json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return externals;
});
