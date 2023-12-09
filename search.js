const food_pic = document.querySelector('.pic');
const search = document.querySelector('.search-bar');
const ingredients = document.querySelector('#ing-btn');
const searched_name = document.querySelector('.value');
const rtarrow = document.querySelector('.rtarrow');
const modal = document.getElementById("modal");

let foodResults = [];
let resultIndex = 0;

document.addEventListener('keyup', () => {
  const foodName = search.value;
  fetch_api(foodName);
  if (foodName ==""){
    window.location.reload()
  }
});

ingredients.addEventListener('click', () => {
  fetchIngredientsAndOpenModal(foodResults[resultIndex].idMeal, true);
});

rtarrow.addEventListener('click', () => {
  resultIndex = (resultIndex + 1) % (foodResults ? foodResults.length : 1);
  updateImageAndName();
});

function fetch_api(foodName) {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      foodResults = data.meals ;
      fetch_data(data);
      console.log(data)
    })
    .catch((err) => {
      if(foodName!='' && foodName.length>3){
        alert(`There is no meal as ${foodName} `);
      }
    });
}

function fetch_data(data) {
  if (foodResults.length > 0) {
    const name = foodResults[resultIndex].strMeal;
    const imageSrc = foodResults[resultIndex].strMealThumb;

    food_pic.src = imageSrc;
    searched_name.textContent = name;
  } else {
    console.log('Error')
  }
}

function fetchIngredientsAndOpenModal(mealId, updateImage) {
  fetchIngredients(mealId, (meal) => {
    if (meal) {
      displayPopup(meal, updateImage);
    } else {
      console.log("Meal not found");
    }
  });
}

function fetchIngredients(mealId, callback) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const meal = data.meals ? data.meals[0] : null;
      callback(meal);
    })
    .catch((err) => {
      console.log(err.message);
      callback(null);
    });
}

function displayPopup(meal, updateImage) {
  const popupImage = document.getElementById("popupImage");
  const popupText = document.querySelector(".popup-text");

  popupImage.src = meal.strMealThumb;

  const ingredientsArray = [];
  for (let i = 0; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient !== null && ingredient !== "") {
      ingredientsArray.push(`${ingredient}: ${measure}`);
    }
  }

  const ingredientsText = ingredientsArray.join(", ");
  popupText.textContent = `Ingredients for ${meal.strMeal}: ${ingredientsText}`;

  if (updateImage) {
    food_pic.src = meal.strMealThumb;
  }
  openModal();
}



function updateImageAndName() {
  if (foodResults.length > 0) {
    const name = foodResults[resultIndex].strMeal;
    const imageSrc = foodResults[resultIndex].strMealThumb;

    food_pic.src = imageSrc;
    searched_name.textContent = name;
  } else {
    console.log("No meals found");
  }
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}