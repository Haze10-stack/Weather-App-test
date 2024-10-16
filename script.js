const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryTxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.Wind-value-txt')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDateTxt = document.querySelector('.current-date-txt')

const apiKey = '2da3c121a5a36ae8e5a2472ec637a3ef';

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchdata(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

function getWeatherIcon(id)
{
    if (id <= 232) return 'thunderstorm.svg'
    if (id <= 321) return 'drizzle.svg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'

}

async function updateWeatherInfo(city) {
    try {
        const weatherData = await getFetchdata('weather', city);

        if (weatherData.cod != 200) {
            showDisplaySection(notFoundSection);
            return;
        }
        console.log(weatherData)
        
        const {
            name: country,
            main: {temp,humidity},
            weather: [{id,main}],
            wind: {speed},


        } = weatherData

        countryTxt.textContent = country
        tempTxt.textContent = Math.round(temp) + '°C'
        conditionTxt.textContent = main
        humidityValueTxt.textContent = humidity + '%'
        windValueTxt.textContent = speed + 'm/s '

        weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`


        // Assuming you want to show weatherInfoSection if city is found
        showDisplaySection(weatherInfoSection);
        console.log(weatherData);
        // Display weather data here (you can implement this part)
    } catch (error) {
        showDisplaySection(notFoundSection);
    }
}

function showDisplaySection(sectionToShow) {
    // Hide all sections first
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none');
    
    // Show the passed section
    sectionToShow.style.display = 'block';
}