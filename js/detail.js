const URL = "https://tasty.p.rapidapi.com/recipes";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "484f656f83mshd4d330abbd322a6p16c078jsn7b58a02879d5",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

const body = document.querySelector("body")

const url = window.location.href;
const queryString = url.split("?")[1];
const params = new URLSearchParams(queryString);
const id = params.get("id");

const convertStringToHTML = (htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");

  return html.body.firstElementChild;
};

const fetchRecipeById = async (id) => {
  try {
    console.log(`${URL}/get-more-info?id=${id}`);
    const response = await fetch(`${URL}/get-more-info?id=${id}`, options);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchData = async () => {
  try {
    const data = await fetchRecipeById(id);

    body.innerHTML = "";

    const instructionList = data.instructions.map((instruction, index) => {
      return `
        <div>
          <h3 style="padding-left: 20px;">Step ${index + 1}</h3>
          <p>${instruction.display_text}</p>
        </div>
      `
    }).join(" ")

    const ingredientList = data.sections[0].components.map(ingredient =>{
      return `
        <span style="padding: 10px 0px; border-top: rgb(220, 215, 215) solid 2px;">${ingredient.raw_text}</span>
      `
    }).join(" ")

    const recipeConverted = `
  <div class="main">
    <div class="header">
      <div class="title">
        <span class="good">Recipe</span>
        <span class="food">Food</span>
      </div>
      <div style="display: flex; align-items: center">
        <input type="text" placeholder="Search product..." class="input" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6" style="
                            width: 20px;
                            height: fit-content;
                            padding: 10px;
                            background-color: #0c5f5f;
                            color: white;
                        ">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="image" style="padding-top: 30px;">
          <img src="${data.thumbnail_url}" alt="" class="steak" />
      </div>
      <div class="rate-food">
        <h1>${data.name}</h1>
        <a href="">${data.credits[0].name || ""}</a>
        <div class="rate-comment">
          <div class="detail-rate">
            <div class="start">
              <img src="/image/star.png" alt="" class="rate" />
              <img src="/image/star.png" alt="" class="rate" />
              <img src="/image/star.png" alt="" class="rate" /><img src="/image/star.png" alt="" class="rate" /><img
                src="/image/star.png" alt="" class="rate" />
            </div>
            <span>8 ratings</span>
            <span>Rate</span>
          </div>
          <span>4 comments</span>
        </div>
        <a href="">Get 5 issues for £5 when you subscribe to our
          magazine</a>
        <div class="more" style="column-gap: 10px;">
          <div class="more-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6" style="
                                    height: 30px;
                                    color: white;
                                    background-color: #0c5f5f;
                                    border-radius: 10px;
                                ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div class="desc">
              <span>Prep:${data.prep_time_minutes || 10} mins</span>
              <span>Cook:${data.total_time_minutes || 30} mins</span>
            </div>
          </div>
          <div class="more-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6" style="
                                    height: 30px;
                                    color: white;
                                    background-color: #0c5f5f;
                                    border-radius: 10px;
                                ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div class="desc">
              <span>More effort</span>

            </div>
          </div>
          <div class="more-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6" style="
                                    height: 30px;
                                    color: white;
                                    background-color: #0c5f5f;
                                    border-radius: 10px;
                                ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div class="desc">
              <span>Serves: ${data.num_servings}</span>

            </div>
          </div>

        </div>
        <p>${data.description}</p>
        <h4>Nutrition: Per serving</h4>
        <div class="many-item">
          <div class="items">
            <span>kcal</span>
            <span>402</span>
          </div>
          <div class="items">
            <span>fat</span>
            <span>40g</span>
          </div>
          <div class="items">
            <span>saturates</span>
            <span>2g</span>
          </div>
          <div class="items">
            <span>carbs</span>
            <span>11g</span>
          </div>
          <div class="items">
            <span>sugars</span>
            <span>40g</span>
          </div>
          <div class="items">
            <span>fibre</span>
            <span>0g</span>
          </div>
          <div class="items">
            <span>protein</span>
            <span>45g</span>
          </div>
          <div class="items">
            <span>salt</span>
            <span>0.3g</span>
          </div>
        </div>
      </div>
    </div>

    <div class="description" style="display: grid; grid-template-columns: 30% 70%; column-gap: 20px; padding-top:20px">
      <div style="display: flex; flex-direction: column;">
        <h2 style="text-align: center;">Ingredients</h2>
           ${ingredientList}
       
      </div>
      <div>
        <h2 style="text-align: center;">Method</h2>
        ${instructionList}
      </div>
      <h3></h3>
      <a href=""></a>
    </div>
    <div class="videos">
        <video width="800" controls>
          <source src="${data.original_video_url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
  </div>    `;

    body.insertAdjacentElement(
      "afterbegin",
      convertStringToHTML(recipeConverted)
    );
  } catch (error) {
    console.error(error);
  }
};

fetchData();
