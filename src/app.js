const dataEl = document.getElementById("data");
const inputEl = document.getElementById("input");
const searchButtonEl = document.getElementById("search");
const messageEl = document.getElementById("message");


function getWeatherData(city) {
    
    dataEl.textContent = "";
    messageEl.textContent = "";  
    
    fetch(`http://api.weatherapi.com/v1/current.json?key=bf3ec35ab33a49ca9cb140734232703&q=${city}&aqi=no`)
    .then(response => response.json())
    // .then((data) => console.log(data));
    .then(data => {
      
      if (data.error) {
        messageEl.textContent = data.error.message;
      } else {
        dataEl.textContent = JSON.stringify(data, null, 4);
      };

    });
};


searchButtonEl.addEventListener("click", event => {
    event.preventDefault();
    getWeatherData(inputEl.value);
});
