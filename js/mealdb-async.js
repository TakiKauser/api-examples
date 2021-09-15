// "Enter" key submission
const searchButton = document.getElementById("button-search");
const searchText = document.getElementById("search-field");

searchText.addEventListener("keypress", function (event) {
    // event.preventDefault();
    if (event.key === "Enter") {
        searchButton.click();
    }
});
// fetch food items from API
const searchFood = async () => {
    const searchField = document.getElementById("search-field");
    const searchFieldText = searchField.value;
    // clear data
    searchField.value = "";
    document.getElementById("error-messages").textContent = "";

    if (searchFieldText == "") {
        // please write something to display
        errMsg("Type something to search, dude!!!");
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`;
        /* 
        fetch(url)
            .then(response => response.json())
            .then(jsonData => displaySearchResult(jsonData.meals))
         */
        const response = await fetch(url);
        const jsonData = await response.json();
        displaySearchResult(jsonData.meals);
    }
}

// display results
const displaySearchResult = meals => {
    const searchResult = document.getElementById("search-result");

    // clear data
    // searchResult.innerHTML = ""; //not recommended
    searchResult.textContent = "";
    document.getElementById("error-messages").textContent = "";

    if (meals == null) {
        // show error msg here
        errMsg("Sorry, No such item in our menu!");
    }

    else {
        meals.forEach(meal => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
}

// single meal details
const loadMealDetail = async mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    /* 
    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayMealDetail(jsonData.meals[0]))
    */
    // using async-await
    const response = await fetch(url);
    const jsonData = await response.json();
    displayMealDetail(jsonData.meals[0]);
}

const displayMealDetail = (meal) => {
    const mealDetails = document.getElementById("meal-details");

    // clear data
    mealDetails.textContent = "";
    document.getElementById("error-messages").textContent = "";

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <div class="card p-3 m-5">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 250)}
          </p>
          <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch on Youtube</a>
        </div>
    </div>
    `;
    mealDetails.appendChild(div);
}

// display error msg 
const errMsg = msg => {
    document.getElementById("search-result").textContent = "";
    document.getElementById("meal-details").textContent = "";
    const errorMsg = document.getElementById("error-messages");
    errorMsg.innerHTML = `${msg}`;
}