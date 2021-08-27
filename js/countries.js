const loadCountries = () => {
    fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(jsonData => displayCountries(jsonData))
}
loadCountries();

const displayCountries = countries => {
    // console.log(countries);
    const countriesContainer = document.getElementById("countries");
    countries.forEach(country => {
        // console.log(country);
        const div = document.createElement("div");
        div.classList.add("country");
        div.innerHTML = `
        <h3>${country.name}</h3>
        <h4>${country.capital}</h4>
        <button onclick="loadCountryByName('${country.name}')">Details</button>
        `;
        /* 
                const h3 = document.createElement("h3");
                h3.innerText = country.name;
                // countriesContainer.appendChild(h3);
                div.appendChild(h3);
        
        
                const h4 = document.createElement("h4");
                h4.innerText = `Capital: ${country.capital}`;
                // countriesContainer.appendChild(h4);
                div.appendChild(h4);
        
                */
        countriesContainer.appendChild(div);
    });
}

const loadCountryByName = name => {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayCountryDetail(jsonData[0]))
}

const displayCountryDetail = country => {
    // console.log(country);
    const countryDetailsContainer = document.getElementById("country-details");
    countryDetailsContainer.innerHTML = `
    <h5>${country.name}</h5>
    <p>Population: ${country.population}</p>
    <img src="${country.flag}" width="200px">
    `;
}