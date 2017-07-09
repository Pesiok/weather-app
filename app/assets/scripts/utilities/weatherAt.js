'use strict';

import jsonp from './jsonp';

export const getCoords = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve([position.coords.latitude, position.coords.longitude]);
        }, error => {
            reject(new Error('Unable to obtain location!'));
        });
    });
}

export const parseCoords = coords => {
    return new Promise((resolve, reject) => {
        if (coords.length !== 2) {
            reject(new Error ('Inncorent coordinates!'));
        }  else {
            coords.forEach(coord => {
                if (typeof coord !== 'number' || Number.isNaN(coord) || !isFinite(coord)) {
                    reject(new Error ('Inncorent coordinates!'));
                }
            });
        }

        resolve(coords.map(coord => Math.round(coord)));
    });
}

export const fetchWeatherInfo = coords => {
    const key = 'ecade6d2f60bfbb23bf403c610064563', 
    lat = coords[0], lon = coords[1],
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

    return jsonp(url).then(response => response.json());
    
}

export const parseWeatherInfo = data => {
    console.log(data);
    return {
        country: data.sys.country,
        time: new Date(data.dt * 1000),
        city: data.name,
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        description: {
            info: data.weather[0].description,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        }
    };
}

export const weatherAt = coords => {
    if (coords) {
        return parseCoords(coords)
            .then(fetchWeatherInfo)
            .then(parseWeatherInfo)
            .catch(err => console.error(err.message));
    } else {
        return getCoords()
            .then(parseCoords)
            .then(fetchWeatherInfo)
            .then(parseWeatherInfo)
            .catch(err => console.error(err.message));
    }
}




