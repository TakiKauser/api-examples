const searchFood = () => {
    const searchField = document.getElementById("search-field");
    const searchFieldText = searchField.value;
    // clear data
    searchField.value = "";

    if (searchFieldText == "") {
        // please write something to display
        const errorMsg = document.getElementById("error-messages");
        errorMsg.innerHTML = `
        Type something to search, dude!!!
        `;
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`;

        fetch(url)
            .then(response => response.json())
            .then(jsonData => displaySearchResult(jsonData.meals))

    }
}

// display results
const displaySearchResult = meals => {
    const searchResult = document.getElementById("search-result");

    // clear data
    // searchResult.innerHTML = ""; //not recommended
    searchResult.textContent = "";

    if (meals == null) {
        // show error msg here
        const errorMsg = document.getElementById("error-messages");
        errorMsg.innerHTML = `
        Sorry, No such item in our menu!
        `;
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
const loadMealDetail = mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayMealDetail(jsonData.meals[0]))
}

const displayMealDetail = (meal) => {
    const mealDetails = document.getElementById("meal-details");

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