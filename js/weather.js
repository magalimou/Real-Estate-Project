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

const displayWeather = (weatherData, country, city) => {
    const cityAndCountry = document.getElementById('city-country');
    const temperature = document.getElementById('temperature');
    const status = document.getElementById('status');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const minTemo = document.getElementById('min-temp');

    cityAndCountry.textContent = `${city}, ${country}`;
   
};
