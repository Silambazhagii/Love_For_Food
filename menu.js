var main = document.querySelector('.main')


const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'

function fetch_api() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.categories)
            display(data.categories)
        })
        .catch((err) => {
            console.log(err.message)
        })
}
fetch_api()

function display(item){
    box = ``
    item.forEach((categories)=>{
        box+=`<div class='cart'>
        <h1 class='title'>${categories.strCategory}</h1>
        <img src="${categories.strCategoryThumb}">
        <p class='description'>${categories.strCategoryDescription}</p>
        </div>`
    })

    main.innerHTML = box;
}
