const loadBuddies = () => {
    fetch("https://randomuser.me/api/?results=5")
        .then(response => response.json())
        .then(jsonData => displayBuddies(jsonData))
}
loadBuddies();
const displayBuddies = data => {
    // console.log(data.results);
    const buddies = data.results;
    const buddiesContainer = document.getElementById("buddies");
    for (const buddy of buddies) {
        // console.log(buddy.email);
        const p = document.createElement("p");
        p.innerText = `
        Name: ${buddy.name.title} ${buddy.name.first} ${buddy.name.last} Email: ${buddy.email}
        `;
        buddiesContainer.appendChild(p);
        // console.log(buddy.name.first);
    }
}