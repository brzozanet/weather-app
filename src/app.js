const dataEl = document.getElementById("data");
const inputEl = document.getElementById("input");
const searchButtonEl = document.getElementById("search");
const ErrorMessageEl = document.getElementById("error-message");

const tableContentEl = document.getElementById("table-content");

const weatherConditionEl = document.getElementById("weather-condition");


function getWeatherData(city) {
    
    dataEl.textContent = "";
    ErrorMessageEl.textContent = "";  
    weatherConditionEl.textContent = "";
    
    fetch(`http://api.weatherapi.com/v1/current.json?key=bf3ec35ab33a49ca9cb140734232703&q=${city}&aqi=no`)
    .then(response => response.json())
    .then(data => {
      
      if (data.error) {
        ErrorMessageEl.textContent = data.error.message;
      } else {
        weatherConditionEl.textContent = `Weather condition: ${data.current.condition.text}`;
        dataEl.textContent = JSON.stringify(data, null, 4);

        // alternative loop
        let content = "";
        
        for (const [key, value] of Object.entries(data.location)) {
          content = content + `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">${key}</td>
                <td class="px-6 py-4">${value}</td>
            </tr>
          `;
        };
        
        tableContentEl.innerHTML = content;
        // end alternative loop
      };

    })
    .catch(() => {
        console.log("Data download error!");
    });
};

searchButtonEl.addEventListener("click", event => {
    event.preventDefault();
    getWeatherData(inputEl.value);
});
