import React, { useState, useEffect } from 'react';
import InputComponent from './components/InputComponent';
import ButtonComponent from './components/ButtonComponent';
import WeatherComponent from './components/WeatherComponent';
import axios, { AxiosResponse } from 'axios';
import './styles.css';

interface City {
    name: string;
}

const App: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response: AxiosResponse<{ data: City[] }> = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions', {
                headers: {
                    'X-RapidAPI-Key': 'f439183f41msh1dd025c7901bee2p17d9e9jsnce447540bd8f',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            });
            setCities(response.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response: AxiosResponse<any> = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=762e5ee1591ef8fad4b67bfe3e823fb0&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
            <div className="container">
                <InputComponent value={city} onChange={setCity} />
                <ButtonComponent onClick={handleSearch} />
                {weatherData && (
                    <WeatherComponent
                        cityName={city}
                        temperature={weatherData.main.temp}
                        description={weatherData.weather[0].description}
                    />
                )}

                <div>
                    {/*<h2>Cities</h2>*/}
                    <ul>
                        {cities.map((city: City, index: number) => (
                            <li key={index}>{city.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
    );
};

export default App;
