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
async function fetchData() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=loclac`,
  );
  const food = await response.json();
  for (let i = 0; i < food["meals"].length; i++) {
    foodData = food["meals"][1];
    break;
  }
  console.log(foodData);
  heading.textContent = foodData.strMeal + " INGREDIENTS";
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
    container.className = " relative w-1/4 h-75 group";
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
  let cooking_step = null;
  let idx = 0;
  const each_instructions = instructions[idx]
    .split(".")
    .map((sentence) => sentence.trim())
    .filter((line) => line.length > 0);
  for (let i = 0; i < each_instructions.length; i++) {
    cooking_step = document.createElement("li");
    cooking_step.textContent = each_instructions[i];
    instructions_container.appendChild(cooking_step);
  }
  const right_arrow = document
    .getElementById("right_arrow")
    .addEventListener("click", () => {
      if (idx >= instructions.length - 1) return;
      idx += 1;
      const each_instructions = instructions[idx]
        .split(".")
        .map((sentence) => sentence.trim())
        .filter((line) => line.length > 0);
      for (let i = 0; i < each_instructions.length; i++) {
        cooking_step.textContent = each_instructions[i];
        instructions_container.appendChild(cooking_step);
      }
    });
  const left_arrow = document
    .getElementById("left_arrow")
    .addEventListener("click", () => {
      console.log("hi");
      if (idx <= 0) return;
      idx -= 1;
      const each_instructions = instructions[idx]
        .split(".")
        .map((sentence) => sentence.trim())
        .filter((line) => line.length > 0);
      for (let i = 0; i < each_instructions.length; i++) {
        cooking_step.textContent = each_instructions[i];
        instructions_container.appendChild(cooking_step);
      }
    });
}
fetchData();
