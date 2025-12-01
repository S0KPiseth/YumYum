export function renderIngredientCard(list = null, page = 1, perPage = 8) {
  const cardContainer = document.querySelector(".js-card-item");

  let ingredients = list || JSON.parse(localStorage.getItem("ingredientsList"));

  if (!ingredients) {
    cardContainer.innerHTML = `<div>No ingredients found.</div>`;

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((result) => {
        ingredients = result["meals"].slice(0, 40);
        localStorage.setItem("ingredientsList", JSON.stringify(ingredients));
        renderIngredientCard();
      });

    return;
  }

  const totalPages = Math.ceil(ingredients.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedItems = ingredients.slice(start, end);

  let html = "";
  paginatedItems.forEach((item) => {
    html += `
        <div class="group flex flex-col items-center gap-2 w-full">
          <img src="${item.strThumb}" class="w-[80%] md:w-full group-hover:scale-110 duration-400" />
          <p class="text-[22px] xl:text-[24px] font-bold truncate w-full text-center">
            ${item.strIngredient}
          </p>

          <button
            class="see-more-btn bg-white text-black w-[90%] p-2 text-[1rem] font-semibold rounded-xl 2xl:w-[70%] cursor-pointer hover:bg-black hover:text-white transition-all duration-400"
            data-ingredient="${item.strIngredient}"
            data-ingredientImage="${item.strThumb}"
          >
            See more 
          </button>
        </div>
      `;
  });

  cardContainer.innerHTML = html;

  renderPagination(totalPages, page, list);
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

function renderPagination(totalPages, currentPage, list) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className =
      `px-3 py-1 rounded-md font-semibold ` +
      (i === currentPage
        ? "bg-white text-black"
        : "bg-[#0EB24E] text-white hover:bg-gray-300 transition-all");

    btn.addEventListener("click", () => {
      renderIngredientCard(list, i);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    pagination.appendChild(btn);
  }
}
