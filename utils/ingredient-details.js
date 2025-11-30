const playLoading = () => {
  let i = 1;
  const intervalID = setInterval(() => {
    if (i > 4) {
      i = 1;
    }
    loadingImage.src = `assets/images/loading/falafel${i}.webp`;
    i++;
  }, 500);
  return intervalID;
};

export async function renderIngredientInfo(data) {
  const loader = document.querySelector(".ingredient-loader");
  loader.classList.remove("hidden");

  const loadingID = playLoading();

  document.querySelector(".js-ingredient-info").innerHTML = "";
  document.querySelector(".js-ingredient-image").innerHTML = "";

  if (!data) return;

  const ingredientImage = localStorage.getItem("selectedIngredientImage");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  document.querySelector(".js-ingredient-image").innerHTML = `
    <img src="${ingredientImage}" class="h-full w-full object-cover transition-all" />
  `;

  document.querySelector(".js-ingredient-info").innerHTML = `
    <div class="flex gap-3 items-center my-2">
      <p class="font-bold text-2xl">${data.description}</p>
      <hr class="bg-white border-none h-0.5 w-9 mt-1" />
    </div>

    <p class="font-semibold text-[1.1rem] my-3">Nutritional Facts</p>
    <div class="flex gap-6">
      ${generateNutrientHTML(data)}
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

  clearInterval(loadingID);
  loader.classList.add("hidden");
}

function generateNutrientHTML(data) {
  const getNutrient = (index) => {
    return data.foodNutrients &&
      data.foodNutrients[index] &&
      data.foodNutrients[index].nutrientNumber
      ? data.foodNutrients[index].nutrientNumber
      : null;
  };

  const nutrients = [
    { label: "Calories", value: getNutrient(3), suffix: "" },
    { label: "Protein", value: getNutrient(0), suffix: "g" },
    { label: "Total Fat", value: getNutrient(6), suffix: "g" },
    { label: "Carbohydrates", value: getNutrient(2), suffix: "g" },
  ];

  let html = "";
  nutrients.forEach((n) => {
    if (n.value !== null) {
      html += `
        <div class="bg-[#03411b21] p-3 sm:px-6 flex flex-col items-center rounded-xl hover:opacity-80">
          <p class="font-bold text-[20px]">${n.value}${n.suffix}</p>
          <p class="font-semibold lg:text-[12px] text-[14px]">${n.label}</p>
        </div>
      `;
    }
  });

  return html || `<p>No nutritional data available</p>`;
}

export function renderIngredientRelatedInfo(data) {
  let html = "";

  if (data && data.length > 0) {
    data.slice(0, 4).forEach((item) => {
      html += `
        <div class="group flex flex-col items-center gap-2">
          <img
            src="${item.strMealThumb}"
            alt="${item.strMeal}"
            class="md:w-[75%] xl:w-[80%] rounded-3xl group-hover:scale-105 transition-all duration-300"
          />
  
          <p class="font-semibold lg:text-md xl:text-lg 2xl:text-xl truncate w-full text-center">${item.strMeal}</p>
  
          <button
            class="see-meal-btn bg-black text-white py-2 px-3 text-sm xl:text-[1rem] font-semibold rounded-md 2xl:w-[50%] cursor-pointer hover:bg-white hover:text-black transition-all duration-500"
            data-mealid="${item.idMeal}"
          >
            See more
          </button>
        </div>
      `;
    });
  } else {
    html = `
      <div class="col-span-full xl:col-span-2 mx-auto flex justify-center items-center h-20 px-4 text-center bg-white/10 rounded-xl text-lg font-semibold text-white">
        No related food found!
      </div>
    `;
  }

  document.querySelector(".js-ingredient-related-info").innerHTML = html;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("see-meal-btn")) {
    const mealID = e.target.dataset.mealid;

    localStorage.setItem("foodId", mealID);

    window.location.href = "detail-cooking.html";
  }
});
