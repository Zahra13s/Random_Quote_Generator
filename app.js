let apiKey = "KxpZqkM730coTHp52YVz6g==6UsCqOh0lqAepd9v";
let categoriesChoose = document.querySelector("#categories")
let quote = document.querySelector("#quote")
let author = document.querySelector("#author")
let generate = document.querySelector("#generate")
let categoryDisplay = document.querySelector("#category") 

let categories = [
    "art",
    "beauty", "birthday",
    "cool", "courage",
    "dating", "death", "dreams",
    "experience",
    "failure", "fear", "freedom", "future",
    "good", "graduation",
    "happiness", "history", "hope",
    "imagination", 'inspirational', "intelligence",
    "knowledge", 'learning', "life", "love",
    "marriage", "money", "movies",
    "success"
]

for (let i = 0; i < categories.length; i++) {
    let option = document.createElement('option');
    option.value = categories[i];
    option.textContent = categories[i].charAt(0).toUpperCase() + categories[i].slice(1);;
    categoriesChoose.appendChild(option)
}

generate.addEventListener("click", generateOutput);

function generateOutput(event) {
    event.preventDefault();
    let category = categoriesChoose.value;
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/quotes?category=${category}`,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function (result) {
            categoryDisplay.innerHTML = `${result[0].category}`
            quote.innerHTML = `"${result[0].quote}"`;
            author.innerHTML = `"${result[0].author}"`;
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}




