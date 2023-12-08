const url = "https://www.themealdb.com/api/json/v1/1/random.php"
let rightArrow = document.querySelector(".right")
let leftArrow = document.querySelector(".left")


function fetch_api() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            fetch_data(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}
fetch_api()

let item_name = document.querySelector(".item-name")
let item_area = document.querySelector(".area")
let item_category = document.querySelector(".category")
let item_img = document.querySelector(".image_src")

function fetch_data(data){
    const foodName = (data.meals[0].strMeal);
    const foodCategory = (data.meals[0].strCategory);
    const foodArea = data.meals[0].strArea;

    item_name.textContent = foodName;
    item_area.textContent = foodArea;
    item_category.textContent = foodCategory;
    console.log(data.meals[0].strMealThumb)
    console.log(item_img)
    item_img.src = `${data.meals[0].strMealThumb}`
}
rightArrow.onclick=()=>{
    window.location.reload()
}
leftArrow.onclick=()=>{
    window.history.go()
}