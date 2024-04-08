export const URL = "https://tasty.p.rapidapi.com/recipes";

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "484f656f83mshd4d330abbd322a6p16c078jsn7b58a02879d5",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

const searchBar = document.querySelector(".search_bar");
const recipeList = document.querySelector(".recipe__list");
const form = document.querySelector(".form");

const convertStringToHTML = (htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");

  return html.body.firstElementChild;
};

async function getRecipes() {
  try {
    const response = await fetch(`${URL}/list?from=0&to=6`, options);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error(error);
  }
}

async function getRecipesBySearch(searchValue) {
  console.log(searchValue);
  try {
    const response = await fetch(
      `${URL}/list?from=0&size=6&q=${searchValue}`,
      options
    );
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!searchBar.value) return;

  const data = await getRecipesBySearch(searchBar.value);

  recipeList.innerHTML = "";

  data.forEach((recipe) => {
    const recipeConverted = `
        <li class="recipe__details">
        <div>
          <img
            src="${recipe.thumbnail_url}"
            alt=""
          />
        </div>
        <div class="recipe__infor">
          <div>
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
          </div>
          <a href="/detail-page.html?id=${recipe.id}">View Detail</a>
        </div>
      </li>
    `;
    recipeList.insertAdjacentElement(
      "afterbegin",
      convertStringToHTML(recipeConverted)
    );
  });
});

const fetchData = async () => {
  const data = await getRecipes();

  recipeList.innerHTML = "";

  data.forEach((recipe) => {
    const recipeConverted = `
        <li class="recipe__details">
        <div>
          <img
            src="${recipe.thumbnail_url}"
            alt=""
          />
        </div>
        <div class="recipe__infor">
          <div>
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
          </div>
          <a href="/detail-page.html?id=${recipe.id}">View Detail</a>
        </div>
      </li>
    `;
    recipeList.insertAdjacentElement(
      "afterbegin",
      convertStringToHTML(recipeConverted)
    );
  });
};

fetchData();
