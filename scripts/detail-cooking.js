// Search feature
const searchInput = document.getElementById("search-input");
const searchSuggestionContainer = document.getElementById("container");
let searchQuery = null;
let searchTimeout = null;
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchQuery = e.target.value;
  clearTimeout(searchTimeout);
  if (searchQuery) {
    searchTimeout = setTimeout(() => {
      find_food(searchQuery);
    }, 1000);
  }
});
let length = 0;
const find_food = async () => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
  );
  const suggestions = await resp.json();
  if (length > 0) {
    console.log(length);
    for (let i = 0; i < Math.min(10, length); i++) {
      searchSuggestionContainer.removeChild(
        searchSuggestionContainer.lastElementChild,
      );
    }
  }
  console.log(suggestions);
  if (suggestions["meals"]) {
    for (let i = 0; i < Math.min(10, suggestions["meals"].length); i++) {
      console.log(suggestions["meals"][i]["strMeal"]);
      const a = document.createElement("a");
      a.textContent = suggestions["meals"][i]["strMeal"];
      a.className =
        "hover:bg-[rgba(128,128,128,0.1)] p-3 cursor-pointer w-full";
      a.addEventListener("click", () => {
        localStorage.setItem("foodId", suggestions["meals"][i]["idMeal"]);
        window.location.href = "each_food.html";
      });
      searchSuggestionContainer.appendChild(a);
      searchSuggestionContainer.classList.add("rounded-lg");
    }
    length = suggestions["meals"].length;
  } else {
    length = 0;
  }
};

let heading = document.getElementById("title");
const getInstructions = (rawText) => {
  if (!rawText) return [];
  const lines = rawText.split(/\r\n|\n/);
  return lines
    .map((line) => {
      const cleaned = line.replace(/^(?:step\s*)?\d+(?:[.\s]+|$)/i, "").trim();
      return cleaned;
    })
    .filter((line) => line.length > 0);
};
const track = document.getElementById("track");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const ytframe = document.getElementById("ytframe");
let totalCards = 0;
let currentIndex = 0;
async function fetchData() {
  const id = localStorage.getItem("foodId");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const food = await response.json();
  foodData = food["meals"][0];
  heading.textContent = foodData.strMeal + " INGREDIENTS";
  console.log(foodData);

  const ytsource = foodData["strYoutube"];
  const index = ytsource.indexOf("watch?v=");
  const yt =
    ytsource.slice(0, index) +
    "embed/" +
    ytsource.slice(index + 8, ytsource.length);
  ytframe.src = yt;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = foodData[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  const ingredient_section = document.getElementById("ingredient_section");
  for (let i = 0; i < ingredients.length; i++) {
    const url = `https://www.themealdb.com/images/ingredients/${ingredients[i]}.png`;
    const container = document.createElement("div");
    container.className = " relative w-1/4 h-75 group cursor-pointer";
    container.addEventListener("click", () => {
      localStorage.setItem("selectedIngredient", ingredients[i]);
      localStorage.setItem("selectedIngredientImage", url);
      window.location.href = "ingredient-detail.html";
    });
    const img = document.createElement("img");
    img.src = url;
    img.alt = ingredients[i];
    img.className =
      " w-full bg-white border-1 border-black  h-full   transition delay-150 duration-300 ease-in-out group-hover:-translate-y-13";

    const detail = document.createElement("div");
    detail.className =
      "absolute inset-0 bg-[#D9D9D9]  -z-1 w-full  flex items-end";
    const name = document.createElement("p");
    const name_span = document.createElement("span");
    name_span.textContent = ingredients[i];
    name_span.className = "underline mr-3";
    name.appendChild(name_span);
    name.className =
      "font-['aalto'] tracking-wider text-black text-4xl pl-3 pb-2 ";

    const quantity = document.createElement("span");
    quantity.textContent = foodData[`strMeasure${i + 1}`];
    quantity.className = "text-red-400 text-2xl";

    name.appendChild(quantity);

    detail.appendChild(name);

    container.appendChild(img);
    container.appendChild(detail);
    ingredient_section.appendChild(container);
  }
  const instructions_container = document.getElementById(
    "instruction_container",
  );
  const instructions = getInstructions(foodData["strInstructions"]);
  totalCards = instructions.length;
  for (let i = 0; i < instructions.length; i++) {
    const card = document.createElement("div");
    const sen = instructions[i]
      .split(".")
      .map((i) => i.trim())
      .filter((i) => i.length > 0);
    const each_container = document.createElement("div");
    const step = document.createElement("p");
    step.textContent = `Step ${i + 1}:`;
    step.className = "mr-3 min-w-fit font-bold";
    each_container.className =
      "w-[90%] flex h-fit items-baseline justify-start gap-10 bg-[rgba(255,255,255,0.3)] py-10 px-5 text-3xl/relaxed rounded-lg";
    each_container.appendChild(step);
    const ul = document.createElement("ul");
    ul.className = "list-disc text-2xl/relaxed w-full";
    for (let i = 0; i < sen.length; i++) {
      const li = document.createElement("li");
      li.textContent = sen[i];
      ul.appendChild(li);
    }
    each_container.appendChild(ul);
    card.className =
      "min-w-full h-full my-auto flex items-center justify-center ";
    card.appendChild(each_container);
    track.appendChild(card);
  }
  nextBtn.addEventListener("click", () => {
    if (totalCards === 0) {
      return;
    }
    if (currentIndex === totalCards - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlide();
  });
  prevBtn.addEventListener("click", () => {
    if (totalCards === 0) {
      return;
    }
    if (currentIndex === 0) {
      currentIndex = totalCards - 1;
    } else {
      currentIndex--;
    }
    updateSlide();
  });
}
const updateSlide = () => {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
};
fetchData();
