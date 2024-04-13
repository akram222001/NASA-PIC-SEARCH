document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    loadSearchHistory();
});

document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    getImageOfTheDay();
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchAPOD(currentDate);
}

function getImageOfTheDay() {
    const date = document.getElementById('search-input').value;
    if (!date) return;
    fetchAPOD(date);
    saveSearch(date);
}

function fetchAPOD(date) {
    const apiKey = 'YT70oqpPi3OdfENdadF9mKsVGuaprD9Jytekce3k'; 
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayImage(data))
        .catch(error => console.log('Error fetching image:', error));
       
}

function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    console.log(data);
    imageContainer.innerHTML = `
        <h2>Picture On ${data.date}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
    addSearchToHistory(date);
}

function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            getImageOfTheDay(date);
        });
        searchHistory.appendChild(listItem);
    });
}

function loadSearchHistory() {
    if (localStorage.getItem('searches')) {
        addSearchToHistory();
    }
}