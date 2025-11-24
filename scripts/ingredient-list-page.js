import { renderIngredientCard } from "../utils/render-ingredients-list.js";

document.addEventListener("DOMContentLoaded", () => {
  renderIngredientCard();
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

  renderIngredientCard(filteredIngredients);
};
