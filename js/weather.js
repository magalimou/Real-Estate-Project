const apiKey = 'mmxcUMFT4ZXvr55Sc7h19b5tPWnYPA6w';

const getCityData = async (city) => {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&language=en-us&details=false`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.length > 0) {
            return data;

        }else {
            throw new Error(`No results found for the city`);
        }

    } catch (error) {
        console.error('Error fetching location key:', error);
    }
};

const getCurrentConditions = async (locationKey) => {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=en-us&details=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Current Conditions:', data);
        return data;
    } catch (error) {
        console.error('Error fetching current conditions:', error);
        throw error;
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('button-search');
    searchButton.addEventListener('click', async () =>{
        const cityInput = document.getElementById('input-city').value;

        try{
            const data = await getCityData(cityInput);

            const locationKey = data[0].Key;
            const country = data[0].Country.LocalizedName;
            const city = data[0].LocalizedName;

            const weather = await getCurrentConditions(locationKey);
            console.log(weather);

            displayWeather(weather, country, city);

        }catch(error){
            console.error('Error getting weather:', error);
        }
      
    })
});

const weatherIcons = {
    'Clear': 'clear.png',
    'Sunny': 'clear.png',
    'Mostly Sunny': 'clear.png',
    'Partly Sunny': 'hazySunshine.png',
    'Intermittent Clouds': 'hazySunshine.png',
    'Hazy Sunshine': 'hazySunshine.png',
    'Some clouds': 'hazySunshine.png',
    'Mostly Cloudy': 'mostlyCloudy.png',
    'Cloudy': 'clouds.png',
    'Overcast': 'clouds.png',
    'Partly cloudy': 'hazySunshine.png',
    'Showers': 'rain.png',
    'A shower': 'rain.png',
    'Mostly Cloudy w/ Showers': 'cloudyAndRainny.png',
    'Partly Cloudy w/ Showers': 'cloudyAndRainny.png',
    'Thunderstorms': 'thunderstorm.png',
    'Mostly Cloudy w/ Thunderstorms': 'thunderstorm.png',
    'Partly Cloudy w/ Thunderstorms': 'thunderstorm.png',
    'Rain': 'rain.png',
    'Flurries': 'flurries.png', /////////
    'Mostly Cloudy w/ Flurries': 'mostlyCloudy.png',
    'Partly Cloudy w/ Flurries': 'hazySunshine.png',
    'Snow': 'snow.png', /////////////
    'Mostly Cloudy w/ Snow': 'mostlyCloudy.png',
    'Ice': 'ice.png',///////////
    'Sleet': 'sleet.png', /////////////
    'Freezing Rain': 'rain.png',
    'Rain and Snow': 'rain.png',
    'Hot': 'hot.png', ///////////
    'Cold': 'cold.png', ///////////////
    'Windy': 'windy.png', //////////
    'Clear Night': 'clear-night.png',
    'Mostly Clear Night': 'mostly-clear-night.png',
    'Partly Cloudy Night': 'clouds-night.png',
    'Hazy Moonlight': 'mostly-clear-night.png',
    'Mostly Cloudy Night': 'clouds-night.png',
    'Partly Cloudy w/ Showers Night': 'rain-night.png',
    'Mostly Cloudy w/ Showers Night': 'rain-night.png',
    'Partly Cloudy w/ Thunderstorms Night': 'mostly-clear-night.png',
    'Mostly Cloudy w/ Thunderstorms Night': 'clouds-night.png',
    'Fog': 'clouds.png',
    'Light fog': 'clouds.png'
};

const weatherColors = (weatherIcon) => {
    const weatherContainer = document.getElementsByClassName('weather-container')[0]; 

    if (weatherContainer) {
        

        if (weatherIcon === 'clear.png' || weatherIcon === 'hazySunshine.png') {
            weatherContainer.style.background = 'linear-gradient(to bottom, #ededed, #efe9ef, #f7e4ea, #fedfde, #ffddcd, #ffdbbf, #fcdab1, #f3dba4, #f4d794, #f6d283, #f7ce72, #f8c961)';
        } else if (weatherIcon === 'rain.png' || weatherIcon === 'cloudyAndRainny.png' || weatherIcon === 'rain-night.png') {
            weatherContainer.style.background = 'linear-gradient(to bottom, #ededed, #e4e5e6, #d9dde0, #cdd5d7, #c3cecd, #b4c4c2, #a6bbb6, #98b1a9, #7da39d, #619594, #43878d, #1a7988)';
        } else if (weatherIcon === 'thunderstorm.png' || weatherIcon === 'thunder.png') {
            weatherContainer.style.background = 'linear-gradient(to bottom, #ededed, #dddae8, #d0c6e2, #c4b2db, #ba9ed2, #b18dcb, #a87cc3, #a06abb, #9557b4, #8943ad, #7d2da5, #710f9e)';
        } else if (weatherIcon === 'clouds.png' || weatherIcon === 'mostlyCloudy.png' || weatherIcon === 'mostly-clear-night.png') {
            weatherContainer.style.background = 'linear-gradient(to bottom, #ededed, #e8e8e8, #e3e3e3, #dfdfdf, #dadada, #d1d1d1, #c9c9c9, #c0c0c0, #b1b1b1, #a3a3a3, #959595, #878787)';
        } else {
            // Default background if no match
            weatherContainer.style.background = 'linear-gradient(to bottom, #ffffff, #f0f0f0)';
        }
    } else {
        console.error('Weather container not found');
    }
}


const displayWeather = (weatherData, country, city) => {
    const cityAndCountry = document.getElementById('city-country');
    const temperature = document.getElementById('temperature');
    const status = document.getElementById('status');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const minTemp = document.getElementById('min-temp');
    const maxTemp = document.getElementById('max-temp');
    const icon = document.getElementById('weather-icon');

    const weatherText = weatherData[0].WeatherText;
    const iconUrl = `./assets/weather/${weatherIcons[weatherText]}`; 
    weatherColors(weatherIcons[weatherText]);
    console.log("Weather Text:", weatherText);
    console.log("Icon URL:", iconUrl);

    icon.src = iconUrl;
    cityAndCountry.textContent = `${city}, ${country}`;
    temperature.textContent = `${weatherData[0].Temperature.Metric.Value}°C`;
    status.textContent = weatherText;
    feelsLike.textContent = `Feels like ${weatherData[0].RealFeelTemperature.Metric.Value}°C`;
    humidity.textContent = `${weatherData[0].RelativeHumidity}%`;
    wind.textContent = `${weatherData[0].Wind.Speed.Metric.Value} km/h`;
    minTemp.textContent = `${weatherData[0].TemperatureSummary.Past24HourRange.Minimum.Metric.Value}°C`;
    maxTemp.textContent = `The maximun temperature will be ${weatherData[0].TemperatureSummary.Past24HourRange.Maximum.Metric.Value}°`;
};
