const foodName = document.getElementById("food-name");
const flag = document.getElementById("flag");
const bgImg = document.getElementById("bg-img");
const description = document.getElementById("description");
const country_name = document.getElementById("country-name");
const token = process.env.HUGGING_FACE_TOKEN
const btn = document.getElementById("btn");

//loading logic
const loadingImage = document.getElementById("loadingImage");
const loadingContainer = document.getElementById("loadingContainer");

const playLoading = () => {
  let i = 1;
  const intervalID = setInterval(() => {
    if (i > 4) {
      i = 1;
    }
    loadingContainer.classList.add("block");
    loadingImage.src = `assets/images/loading/falafel${i}.webp`;
    i++;
  }, 500);
  return intervalID;
};

// Search feature
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");
const suggestionsContainer = document.getElementById("suggestionsContainer");
searchInput.addEventListener("focus", () => {
  suggestionsContainer.classList.remove("hidden");
});
document.addEventListener("click", (e) => {
  if (!container.contains(e.target)) {
    suggestionsContainer.classList.add("hidden");
  }
});
let searchQuery = null;
let searchTimeout = null;
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  clearTimeout(searchTimeout);
  if (searchQuery) {
    searchTimeout = setTimeout(() => {
      find_food(searchQuery);
    }, 1000);
  } else {
    suggestionsContainer.innerText = "Please Type Anything to Search";
    suggestionsContainer.classList.add("text-center");
  }
});

const find_food = async () => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
  );
  const linkContainer = document.createElement("div");
  const suggestions = await resp.json();
  if (!suggestions["meals"]) {
    suggestionsContainer.innerText = "Search Not Found";
    suggestionsContainer.classList.add("text-center");
  } else {
    suggestionsContainer.classList.remove("text-center");
  }
  linkContainer.className = "flex flex-col gap-2 h-fit";
  if (suggestions["meals"]) {
    for (let i = 0; i < suggestions["meals"].length; i++) {
      const id = suggestions["meals"][i]["idMeal"];
      const name = suggestions["meals"][i]["strMeal"];
      const p = document.createElement("p");
      p.addEventListener("click", () => {
        localStorage.setItem("foodId", id);
        window.location.href = "each_food.html";
      });
      p.className =
        "hover:bg-[rgba(128,128,128,0.3)] cursor-pointer p-2 rounded-lg";
      p.textContent = name;
      linkContainer.appendChild(p);
    }
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.appendChild(linkContainer);
  }
};

let foodData = null;

async function fetchData() {
  let foodId = localStorage.getItem("foodId");
  if (foodId === "undefined") {
    foodId = 52973;
  }
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`,
  );
  foodData = await response.json();
  btn.addEventListener("click", () => {
    const id = foodData["meals"][0]["idMeal"];
    localStorage.setItem("foodId", id);
    window.location.href = "detail-cooking.html";
  });
  const countryName = foodData["meals"][0]["strArea"].toLowerCase();

  const foodNameStr = foodData["meals"][0]["strMeal"];
  foodName.textContent = foodNameStr;
  let timerId = playLoading();
  try {
    loadingContainer.className =
      "block z-100 bg-white inset-0 absolute flex items-center justify-center";
    const flagResp = await fetch(
      `https://restcountries.com/v3.1/demonym/${countryName}`,
    );
    const flagsData = await flagResp.json();
    if (flagsData[0]) {
      const flag_png = flagsData[0]["flags"]["png"];
      flag.src = flag_png;
      country_name.className = "hidden";
      flag.className = "block w-15";
    } else {
      country_name.textContent = foodData["meals"][0]["strArea"];
      country_name.className = "block text-3xl ";
      flag.className = "hidden";
    }
    const resp = await fetch(
      `https://router.huggingface.co/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2.5-Coder-32B-Instruct",
          messages: [
            {
              role: "user",
              content: `Write a delicious 2 sentences catching phrases description for the dish: ${foodNameStr} and no double quotes`,
            },
          ],
          max_tokens: 100,
          stream: false,
        }),
      },
    );
    const desp = await resp.json();
    description.textContent = desp.choices[0].message.content;

    const imgSrc = foodData["meals"][0]["strMealThumb"];
    bgImg.className = `bg-[url(${imgSrc})] bg-center bg-no-repeat bg-cover text-white w-screen font-['Geist'] overflow-x-hidden h-screen relative after:bg-[rgba(0,0,0,0.5)] after:absolute after:inset-0 after:-z-1`;
  } catch (err) {
    console.log(err);
  } finally {
    clearInterval(timerId);
    loadingContainer.classList.add("hidden");
  }
}
fetchData();
