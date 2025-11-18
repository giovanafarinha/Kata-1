let buttonElement = document.getElementById("next-one");
let textAfirm = document.getElementById("text");
let category = document.getElementById("category");
let addNewQuoteBtn = document.getElementById("addQuote");
let sectionAddQuote = document.getElementById("addQuote-container");
let submitButton = document.getElementById("submit-btn");


// Inputs para nova afirmação
let inputText = document.getElementById("quote-text");
let inputCategory = document.getElementById("quote-category");

let currentIndex = 0; // Índice atual
let affirmations = []; // Array para armazenar as afirmações

async function fetchAffirmation() {
  try {
    const response = await fetch(
      "https://api.jsonbin.io/v3/b/691af29243b1c97be9b2c8a3/latest"
    );
    const data = await response.json();
    affirmations = data.record.affirmations; // Guardar as afirmações
    displayAffirmation(); // Mostrar a primeira
  } catch (error) {
    console.error("Erro ao buscar afirmação:", error);
  }
}

function displayAffirmation() {
  if (affirmations.length > 0) {
    const affirmation = affirmations[currentIndex];
    textAfirm.innerText = ` -${affirmation.text}`;
    category.innerText = `Category: ${affirmation.category}`;
  } else {
    textAfirm.innerText = "Nenhuma afirmação disponível.";
    category.innerText = "";
  }
}

// Próxima afirmação
buttonElement.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex >= affirmations.length) {
    currentIndex = 0; // Reset ao fim da lista
  }
  displayAffirmation();
});

// Mostrar formulário de adicionar nova afirmação
addNewQuoteBtn.addEventListener("click", function () {
  sectionAddQuote.style.display = "block";
});

// Adicionar nova afirmação
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir reload do form

  const textValue = inputText.value.trim();
  const categoryValue = inputCategory.value.trim();

  if (textValue && categoryValue) {
    affirmations.push({
      text: textValue,
      category: categoryValue,
    });

    // Limpar inputs
    inputText.value = "";
    inputCategory.value = "";

    // Atualizar display para mostrar a nova afirmação
    currentIndex = affirmations.length - 1;

    displayAffirmation();
    sectionAddQuote.style.display = "none";
  } else {
    alert("Por favor, preencha ambos os campos!");
  }
});

// Chamar a função de busca
fetchAffirmation();
