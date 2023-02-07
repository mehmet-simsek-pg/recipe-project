const searchInput = document.querySelector(".form-control");
const searchBtn = document.querySelector("#button-addon2");
const foods = document.querySelector(".row.food");
const countries = document.querySelectorAll(".ülke");

//!ilk ekrandaki yemek resimlerinin api den çekilmesi

const randomFood = async () => {
  const url = `https://www.themealdb.com/api/json/v1/1/random.php`;

  for (let i = 0; i < 9; i++) {
    try {
      const response = await fetch(url).then((response) => response.json());
      showRecipe(response);
    } catch (err) {
      console.log(err);
    }
  }
};

const getMeal = async () => {
  foods.innerHTML = "";

  const value = searchInput.value.toLowerCase();
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;

  try {
    const response = await fetch(url).then((response) => response.json());
    showRecipe(response);
  } catch (err) {
    console.log(err);
  }
};

randomFood();

searchBtn.addEventListener("click", (e) => {
  getMeal();
  searchInput.value.innerHTML = "";
});

// www.themealdb.com/api/json/v1/1/search.php?s=
//?console da kontrol edip
//?ekrana bas fonksiyonuna yollama

//!api den gelen verilerin ekrana bastırılması
const showRecipe = (data) => {
  const recipeList = [];
  for (let index = 0; index < data.meals.length; index++) {
    recipeList.push(data.meals[index]);
  }
  recipeList.forEach((recipe) => {
    foods.innerHTML += `<div class="col-md-3 p-4 m-4"><p>${recipe.strMeal}</p>   <img class="malzeme" style=width:200px  src=${recipe.strMealThumb} class="card-img-top" ></div>`;
  });

  //foods.innerHTML = `<div class="col-md-3 p-4 m-4"><p>${data.meals[0].strMeal}</p>   <img class="malzeme" style=width:200px  src=${data.meals[0].strMealThumb} class="card-img-top" ></div>`;
};

// DİV.innerHTML=""
{
  /* <div class="col-md-3 p-4 m-4"><p>${}</p>   <img class="malzeme" style=width:200px  src=${} class="card-img-top" ></div> */
}

//!arama inputunda arama yapma (oninput kulanarak)

// input.target.value

//?ekranı güncelle

//!bayraklara tıklandığında, ilgili api den verilerin çekilmesi ve ekranabastır fonksiyonuna gönderme

// `www.themealdb.com/api/json/v1/1/filter.php?a=${ülke}`

const getMealByArea = async (value) => {
  foods.innerHTML = "";

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;

  try {
    const response = await fetch(url).then((response) => response.json());
    showRecipe(response);
  } catch (err) {
    console.log(err);
  }
};
//?ekrana bastıra gönder
countries.forEach((country) => {
  country.addEventListener("click", (e) => {
    value = e.target.id;
    getMealByArea(value);
  });
});
