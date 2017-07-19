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
        throw 'incorrect data status';
    } else if (!data.results[0]) {
        throw 'no results found';
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
    const url = `https://api.apixu.com/v1/current.json?key=${key}&q=${lat},${lon}`;

    return fetch(url).then(response => response.json());
}

const parseTime = isoString => {
    return new Date(isoString * 1000).toLocaleTimeString().substring(0, 5)
}

const parseDate = isoString => {
    return new Date(isoString * 1000).toDateString().substr(4, 3);
}

export const parseWeatherInfo = data => {
    return {
        country: data.location.country,
        time: `${parseDate(data.current.last_updated_epoch)}, ${parseTime(data.current.last_updated_epoch)}`,
        city: data.location.name,
        temp: {
            metric: `${data.current.temp_c} &#8451;`,
            imperial: `${data.current.temp_f} &#8457;`
        },
        pressure: {
            metric: `${data.current.pressure_mb} hPa`,
            imperial: `${data.current.pressure_in} inHg`
        },
        humidity: `${data.current.humidity} %`,
        wind: {
            metric: `${data.current.wind_mph} mph`,
            imperial: `${data.current.wind_kph} kph`
        },
        feelsLike: {
            metric: `${data.current.feelslike_c} &#8451;`,
            imperial: `${data.current.feelslike_f} &#8457;`
        },
        description: {
            info: data.current.condition.text,
            icon: `https:${data.current.condition.icon}`
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
        link: `https://en.wikipedia.org/?curid=${info.pageid}`,
        extract: info.extract
    }
}

// source: https://gist.github.com/beaucharman/1f93fdd7c72860736643d1ab274fee1a
export const debounce = function(callback, wait, context = this) {
    let timeout = null;
    let args = null;
    const toBeCalledLater = () => callback.apply(context, args);

	return function() {
        args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(toBeCalledLater, wait);
	};
};





