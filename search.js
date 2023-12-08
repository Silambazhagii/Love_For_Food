const food_pic = document.querySelector('.pic');
const search = document.querySelector('.search-bar');
const ingredients = document.querySelector('#ing-btn');
const searched_name = document.querySelector('.value');
const rtarrow = document.querySelector('.rtarrow');
let foodName = '';
let foodResults = [];
let resultIndex = 0;

document.addEventListener('keyup', () => {
  foodName = search.value;
  console.log(foodName);
  fetch_api(foodName);
});


ingredients.addEventListener('click', () => {
  fetch_api(search.value);
});


rtarrow.addEventListener('click', () => {
  resultIndex = (resultIndex + 1) % foodResults.length;

  updateImageAndName();
});

function fetch_api(foodName) {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      foodResults = data.meals || [];
      resultIndex = 0;
      fetch_data(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function fetch_data(data) {
  if (foodResults.length > 0) {
    const name = foodResults[resultIndex].strMeal;
    const imageSrc = foodResults[resultIndex].strMealThumb;

    food_pic.src = imageSrc;
    searched_name.textContent = name;

    ingredients.addEventListener('click', () => {
      openModal(name, imageSrc, foodResults[resultIndex].mealId);
    });
  } else {
    alert(`There is no Meal as ${foodName}`);
  }
}

function openModal(name, imageSrc, mealId) {
  const modal = document.getElementById("modal");
  const popupImage = document.getElementById("popupImage");
  const popupText = document.querySelector(".popup-text");

  popupImage.src = imageSrc;
  popupText.textContent = `Ingredients for ${name}`;



  fetchIngredients(mealId);

  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function updateImageAndName() {
  const name = foodResults[resultIndex].strMeal;
  const imageSrc = foodResults[resultIndex].strMealThumb;
  food_pic.src = imageSrc;
  searched_name.textContent = name;
}


// popup part 

function fetchIngredients(foodName) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const meal = data.meals[0];
      if (meal) {
        displayPopup(meal);
      } else {
        console.log("Meal not found");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function displayPopup(meal) {
  const popupImage = document.getElementById("popupImage");
  const popupText = document.querySelector(".popup-text");

  popupImage.src = data.meals.strMealThumb;
  popupText.textContent = `Ingredients for ${data.meals.strMeal}: ${data.meals.strIngredient1}, ${data.meals.strIngredient2}, ${data.meals.strIngredient3}, ${data.meals.strIngredient4}`;

  openModal();
}

fetchIngredients(mealId);