const apiKey = "e973ceaeddf4eb27f00fb78c27a42718"
const form = document.querySelector('#location-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    retrieveData();
});

function kelvinToFahrenheit(degrees) { 
    return ((degrees - 273.15) * (9/5) + 32).toFixed(1);
}

function clearResponseField (){ 
   document.getElementById('response-holder').innerHTML = '';
}

function showWeather(data) {
    clearResponseField();
    temp = kelvinToFahrenheit(data.main.temp)
    var location = data.name;

    const element = `
    <div id="response">
        <div id="response-text"> 
            <h1 id="location-header">${location}</h1>
            <h3 id="weather-temp">${temp}</h3>
        </div>
    </div>
    `;
    document.getElementById('response-holder').innerHTML = element;
}

function showError (){
    const element = `<p>Please input a valid location </p>`
    document.getElementById('response-holder').innerHTML = element;
}

function retrieveData() {
    const inputVal = form.elements['location-input'].value;
    form.reset();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showWeather(data);
    })
    .catch((e) => {
        showError();
    })
}