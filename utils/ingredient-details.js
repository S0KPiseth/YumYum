export async function renderIngredientInfo(data) {
  if (!data) return;

  const ingredientImage = localStorage.getItem("selectedIngredientImage");

  document.querySelector(".js-ingredient-image").innerHTML = `
    <img
      src="${ingredientImage}"
      alt="Name"
      class="h-full w-full object-cover"
    />
  `;

  const getNutrient = (index) => {
    return data.foodNutrients &&
      data.foodNutrients[index] &&
      data.foodNutrients[index].nutrientNumber
      ? data.foodNutrients[index].nutrientNumber
      : null;
  };

  let nutrientHTML = "";

  const nutrients = [
    { label: "Calories", value: getNutrient(3), suffix: "" },
    { label: "Protein", value: getNutrient(0), suffix: "g" },
    { label: "Total Fat", value: getNutrient(6), suffix: "g" },
    { label: "Carbohydrates", value: getNutrient(2), suffix: "g" },
  ];

  nutrients.forEach((n) => {
    if (n.value !== null) {
      nutrientHTML += `
        <div class="bg-[#03411b21] py-3 px-7 flex flex-col items-center rounded-xl">
          <p class="font-bold text-[20px]">${n.value}${n.suffix}</p>
          <p class="font-semibold text-[14px]">${n.label}</p>
        </div>
      `;
    }
  });

  let html = `
    <!-- Ingredient Name -->
    <div class="flex gap-3 items-center my-2">
      <p class="font-bold text-2xl">${data.description}</p>
      <hr class="bg-white border-none h-0.5 w-9 mt-1" />
    </div>

    <!-- Nutritional Fact -->
    <p class="font-semibold text-[1.1rem] my-3">Nutritional Facts</p>

    <div class="flex gap-6">
      ${nutrientHTML || `<p>No nutritional data available</p>`}
    </div>

    <p class="font-bold text-2xl mt-5 mb-2">Food Category</p>
    <p class="font-semibold pl-6">${data.foodCategory}</p>

    <p class="font-bold text-2xl mt-5 mb-2">Serving Size</p>
    <ul class="list-disc pl-11 font-semibold">
      <li>${
        data.servingSize === undefined
          ? "Based on preference"
          : data.servingSize.toFixed(1) + " " + data.servingSizeUnit
      }</li>
    </ul>
  `;

  document.querySelector(".js-ingredient-info").innerHTML = html;
}

export async function renderIngredientRelatedInfo(ingredientName) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredientName}`
  );

  const result = await response.json();

  const data = result["meals"];

  let html = "";

  if (data) {
    data.slice(0, 4).forEach((item) => {
      html += `
        <div class="flex flex-col items-center gap-2">
          <img
            src="${item.strMealThumb}"
            alt="${item.strMeal}"
            class="w-[90%] rounded-3xl"
          />
  
          <p class="font-semibold text-xl">${item.strMeal}</p>
  
          <button
            class="see-meal-btn bg-black text-white p-2 text-[1rem] font-semibold rounded-md w-[50%] cursor-pointer"
            data-mealid="${item.idMeal}"
          >
            See more
          </button>
        </div>
      `;
    });
  } else {
    html = `
      <div class="text-center"> 
        No Related Food Founded!
      </div>
    `;
  }

  document.querySelector(".js-ingredient-related-info").innerHTML = html;
}
