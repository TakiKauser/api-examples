const searchFood = () => {
    const searchField = document.getElementById("search-field");
    const searchFieldText = searchField.value;
    // console.log(searchFieldText);

    searchField.value = "";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`;

    fetch(url)
        .then(response => response.json())
        .then(jsonData => displaySearchResult(jsonData.meals))

    // console.log(url);
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById("search-result");

    meals.forEach(meal => {
        // console.log(meal);
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

const loadMealDetail = mealID => {
    // console.log(mealID);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayMealDetil(jsonData.meals[0]))
}

const displayMealDetil = (meal) => {
    // console.log(meal);
    const mealDetails = document.getElementById("meal-details");

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <div class="card"">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 250)}
          </p>
          <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch on Youtube</a>
        </div>
    </div>
    `
    mealDetails.appendChild(div);
}