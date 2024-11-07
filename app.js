let apiKey = "KxpZqkM730coTHp52YVz6g==6UsCqOh0lqAepd9v";
let categoriesChoose = document.querySelector("#categories")
let quote = document.querySelector("#quote")
let author = document.querySelector("#author")
let generate = document.querySelector("#generate")
let categoryDisplay = document.querySelector("#category") 

let categories = [
    "art",
    "beauty", 
    "birthday",
    "cool", 
    "courage",
    "dating", 
    "death", 
    "dreams",
    "experience",
    "failure", 
    "fear", 
    "freedom", 
    "future",
    "good", 
    "graduation",
    "happiness", 
    "history", 
    "hope",
    "imagination", 
    'inspirational', 
    "intelligence",
    "knowledge", 
    'learning', 
    "life",
    "love",
    "marriage", 
    "money", 
    "movies",
    "success"
];

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
            let category = result[0].category;
let capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

            categoryDisplay.innerHTML = `${capitalizedCategory}`
            quote.innerHTML = `"${result[0].quote}"`;
            author.innerHTML = `${result[0].author}`;
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function copyToClipboard() {
    const quoteText = document.getElementById("quote").innerText;
    const authorText = document.getElementById("author").innerText;
    
    const fullText = `${quoteText} - ${authorText}`;
    
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      
      // Fire the toast notification
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      })

    navigator.clipboard.writeText(fullText)
        .then( Toast.fire({
      icon: "success",
      title: "Quote Copies!"
    }))
        .catch((error) => console.error("Failed to copy text:", error));
}



