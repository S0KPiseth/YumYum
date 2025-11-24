export async function renderIngredientCard(list = null) {
  let ingredients = list || JSON.parse(localStorage.getItem("ingredientsList"));

  if (!ingredients) {
    document.querySelector(".js-card-item").innerHTML = `
      <div>No ingredients found.</div>
    `;

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((result) => {
        ingredients = result["meals"].slice(0, 40);
        localStorage.setItem("ingredientsList", JSON.stringify(ingredients));
        renderIngredientCard();
      });

    return;
  }

  if (list && list.length === 0) {
    document.querySelector(".js-card-item").innerHTML = `
      <div>No ingredients found.</div>
    `;
    return;
  }

  let html = "";
  ingredients.forEach((item) => {
    html += `
      <div class="flex flex-col items-center gap-2 w-full">
      <img src="${item.strThumb}" class="w-[80%] md:w-full" />
      <p class="text-[20px] xl:text-[24px] font-bold truncate w-full text-center">${item.strIngredient}</p>

      <button
        class="see-more-btn bg-black text-white p-2 text-[14px] xl:text-[1rem] font-semibold rounded-md xl:w-[50%] cursor-pointer"
        data-ingredient="${item.strIngredient}"
        data-ingredientImage="${item.strThumb}"
      >
        See more
      </button>
      </div>
    `;
  });

  document.querySelector(".js-card-item").innerHTML = html;
}

document.querySelector(".js-card-item").addEventListener("click", (e) => {
  if (e.target.classList.contains("see-more-btn")) {
    const ingredientName = e.target.dataset.ingredient;
    const ingredientImage = e.target.dataset.ingredientimage;

    localStorage.setItem("selectedIngredient", ingredientName);
    localStorage.setItem("selectedIngredientImage", ingredientImage);

    window.location.href = "/ingredient-detail.html";
  }
});
