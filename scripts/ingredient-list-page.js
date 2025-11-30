import { renderIngredientCard } from "../utils/render-ingredients-list.js";

document.addEventListener("DOMContentLoaded", () => {
  renderIngredientCard();

  const filteredCategory = document.getElementById("filterSelectionForm");

  filteredCategory.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
      const selected = document.querySelectorAll('input[type="radio"]:checked');

      const ingredients =
        JSON.parse(localStorage.getItem("ingredientsList")) || [];

      selected.forEach((item) => {
        if (item.value == "relevant") {
          renderIngredientCard(ingredients, 1);
        }

        if (item.value == "a-to-z") {
          const aToZ = [...ingredients].sort((a, b) =>
            a.strIngredient.localeCompare(b.strIngredient)
          );
          renderIngredientCard(aToZ, 1);
        }

        if (item.value == "z-to-a") {
          const zToA = [...ingredients].sort((a, b) =>
            b.strIngredient.localeCompare(a.strIngredient)
          );
          renderIngredientCard(zToA, 1);
        }
      });
    } catch (error) {
      console.log("Error", error);
    }
  });
});

window.searchIngredient = function (event) {
  const searchText = event.target.value.toLowerCase().trim();

  const ingredients = JSON.parse(localStorage.getItem("ingredientsList")) || [];

  if (!searchText) {
    renderIngredientCard();
    return;
  }

  const filteredIngredients = ingredients.filter((item) =>
    item.strIngredient.toLowerCase().includes(searchText)
  );

  renderIngredientCard(filteredIngredients, 1);
};
