const loadQuotes = () => {
    fetch("https://api.kanye.rest/")
        .then(response => response.json())
        .then(jsonData => displayQuotes(jsonData))
}

const displayQuotes = quote => {
    // console.log(quote.quote);
    const quoteElement = document.getElementById("quotes");
    quoteElement.innerText = quote.quote;
}

document.getElementById("quote-btn").addEventListener("click", () => {
    loadQuotes();
});