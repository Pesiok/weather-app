import jsonp from './jsonp.js';

'use strict';

 // returns nonASCII string or first one
export const getNonASCII = (a, b) => {
    const regExp = /[^\x00-\x7F]+/;
    const nonASCII = (b.match(regExp)) ? b : a;

    return nonASCII;
}

export const fetchCoords = () => {
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

        resolve(coords);
    });
}

export const fetchCityInfo = (value, key) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&language=en&key=${key}`;

    return fetch(url).then(response => response.json());
}

export const parseCityInfo = data => {
    if (!data.status === 'OK') {
        throw new Error('Incorrect data status');
    } 
    const info = data.results[0];
    return {
        name: info.address_components[0].short_name,
        address: info.formatted_address,
        coords: [info.geometry.location.lat, info.geometry.location.lng]
    }
}

export const fetchWeatherInfo = (coords, key) => {
    const [lat, lon] = coords;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

    return jsonp(url).then(response => response.json());
}

export const convertTemp = (data, system) => {
    if (system === 'metric') return `${Math.round(data - 273.15)} &#8451;`;
    if (system === 'imperial') return `${Math.round(data * 9/5 - 459.67)} &#8457;`;
}

export const convertSpeed = (data, system) => {
    if (system === 'metric') return `${Math.round(data)} m/s`
    if (system === 'imperial') return `${Math.round(data * 2.23693629)} mph`;
}

const parseTime = isoString => {
    return new Date(isoString * 1000).toLocaleTimeString().substring(0, 5)
}

const parseDate = isoString => {
    return new Date(isoString * 1000).toDateString().substr(4, 3);
}

export const parseWeatherInfo = (data, system) => {
    return {
        country: data.sys.country,
        time: `${parseDate(data.dt)}, ${parseTime(data.dt)}`,
        city: data.name,
        temp: data.main.temp,
        pressure: `${Math.round(data.main.pressure)} hPa`,
        humidity: `${data.main.humidity} %`,
        wind: data.wind.speed,
        sunrise: parseTime(data.sys.sunrise),
        sunset: parseTime(data.sys.sunset),
        description: {
            info: data.weather[0].description,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        }
    };
}

export const fetchWikiInfo = value => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${value}&redirects`;

    return jsonp(url).then(response => response.json());
}

export const parseWikiInfo = data => {
    const info = Object.values(data.query.pages)[0];
    return {
        title: info.title,
        link: `http://en.wikipedia.org/?curid=${info.pageid}`,
        extract: info.extract
    }
}





