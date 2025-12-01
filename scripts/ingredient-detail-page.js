import {
  renderIngredientInfo,
  renderIngredientRelatedInfo,
} from "../utils/ingredient-details.js";

const ingredientName = localStorage.getItem("selectedIngredient");

const ingredientCacheKey = `ingredient-${ingredientName}`;
const relatedCacheKey = `related-${ingredientName}`;

async function fetchIngredientInfo(name) {
  const response = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${name}&api_key=Px6oRFRFyrdwzskZGYzL07Agz7pCjVjEPjAvU4Ei`
  );
  const result = await response.json();
  const data = result.foods[0];
  return data;
}

async function fetchRelatedFoods(name) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const result = await response.json();
  const data = result.meals || null;
  return data;
}

async function initPage() {
  try {
    if (ingredientName) {
      localStorage.removeItem(ingredientCacheKey);
      localStorage.removeItem(relatedCacheKey);
    }
    // Render ingredient info
    const ingredientData = await fetchIngredientInfo(ingredientName);
    renderIngredientInfo(ingredientData);

    // Render related foods
    const relatedData = await fetchRelatedFoods(ingredientName);
    renderIngredientRelatedInfo(relatedData);
  } catch (err) {
    console.error("Error loading ingredient details:", err);
  }
}

initPage();
