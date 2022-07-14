const apiKey = "e973ceaeddf4eb27f00fb78c27a42718";

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
    var temp = data.main.temp;
    var location = data.name;
    var weather = data.weather[0].main
    var icon = data.weather[0].icon;
    var country = data.sys.country ? data.sys.country : "";
    var weatherImage = `http://openweathermap.org/img/wn/${icon}@2x.png` 
    console.log(data);

    const element = `
    <div id="response">
        <div id="response-text"> 
            <div id="country">
                <p>${country}</p>
            </div>
            <h1 id="location-header">${location}</h1>
            <h3 id="weather-temp">${temp}°F</h3>
            <img src=${weatherImage}>
            <h2>${weather}</h2>
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showWeather(data);
    })
    .catch((e) => {
        showError();
    })
}