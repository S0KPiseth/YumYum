import {
  renderIngredientInfo,
  renderIngredientRelatedInfo,
} from "../utils/ingredient-details.js";

const ingredientName = localStorage.getItem("selectedIngredient");

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

const loader = document.querySelector(".ingredient-loader");
const loadingImage = document.getElementById("loadingImage");

const playLoading = () => {
  let i = 1;
  return setInterval(() => {
    if (i > 4) i = 1;
    loadingImage.src = `../assets/images/loading/falafel${i}.webp`;
    i++;
  }, 500);
};

async function initPage() {
  loader.classList.remove("hidden");

  let loadingID = playLoading();

  try {
    const ingredientData = await fetchIngredientInfo(ingredientName);
    renderIngredientInfo(ingredientData);

    const relatedData = await fetchRelatedFoods(ingredientName);
    renderIngredientRelatedInfo(relatedData);
  } catch (err) {
    console.error("Error loading ingredient details:", err);
  } finally {
    clearInterval(loadingID);
    loader.classList.add("hidden");
  }
}

initPage();
