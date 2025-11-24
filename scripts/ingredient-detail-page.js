import {
  renderIngredientInfo,
  renderIngredientRelatedInfo,
} from "../utils/ingredient-details.js";

const ingredientName = localStorage.getItem("selectedIngredient");

const response = await fetch(
  `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredientName}&api_key=Px6oRFRFyrdwzskZGYzL07Agz7pCjVjEPjAvU4Ei`
);

const result = await response.json();

const data = result["foods"][0];

renderIngredientInfo(data);
renderIngredientRelatedInfo(ingredientName);
