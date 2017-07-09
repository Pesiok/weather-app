/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weatherAt = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

'use strict';

var Controller = function () {
    function Controller(model, view) {
        var _this = this;

        _classCallCheck(this, Controller);

        this._model = model;
        this._view = view;

        // get local coords and set up a Map
        (0, _weatherAt.getCoords)().then(function (coords) {
            _this._model.coords = coords;
            _this.setUpMap();
        });

        // initialize model events
        this.modelEvents();

        // get weather from geolocation
        this.getWeather();
    }

    _createClass(Controller, [{
        key: 'modelEvents',
        value: function modelEvents() {
            var _this2 = this;

            this._model.addEventListener('weather', function () {
                return _this2.getWeather();
            });
            this._model.addEventListener('city-search', function (event) {
                return _this2.parseCoords(event);
            });
        }
    }, {
        key: 'mapEvents',
        value: function mapEvents() {
            var marker = this._model.appMap.marker;

            marker.addListener('click', function () {
                return console.log('clicked!');
            });
        }
    }, {
        key: 'setUpMap',
        value: function setUpMap() {
            var _this3 = this;

            var coords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._model.coords;

            var scriptTag = document.createElement('script');
            var apiKey = this._model.settings.mapKey;
            var initMap = function initMap() {
                var map = new google.maps.Map(_this3._view._elements.mapContainer, {
                    center: {
                        lat: coords[0],
                        lng: coords[1]
                    },
                    zoom: 8
                });
                var marker = new google.maps.Marker({
                    position: {
                        lat: coords[0],
                        lng: coords[1]
                    },
                    map: map
                });
                // add map and marker reference to the model
                _this3._model.appMap = { map: map, marker: marker };
                // initialize map events
                _this3.mapEvents();
            };
            // add initMap to global env
            window.initMap = initMap;

            // get map code by jsonp
            scriptTag.setAttribute("src", 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap');
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        }
    }, {
        key: 'getWeather',
        value: function getWeather(coords) {
            var _this4 = this;

            if ('geolocation' in navigator) {
                (0, _weatherAt.weatherAt)(coords).then(function (weather) {
                    _this4._model.weather = weather;
                    _this4._view.updateWeather();
                });
            } else {
                alert("Your browser doesn't support geolocation!");
            }
        }
    }, {
        key: 'parseCoords',
        value: function parseCoords(event) {
            event.preventDefault();
            var value = event.target.children.searchCity.value;
        }
    }, {
        key: 'findCoords',
        value: function findCoords(event) {
            // const value = event.target.children.searchCity.value;

            // event.preventDefault();
        }
    }]);

    return Controller;
}();

exports.default = Controller;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PubSub = __webpack_require__(4);

var _PubSub2 = _interopRequireDefault(_PubSub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

'use strict';

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);

        this._pubsub = new _PubSub2.default();
        this.coords = [];
        this.settings = {
            mapKey: 'AIzaSyCAoZKb18BDrDlKTiNGe_K6NsfRXxE1IqE'

        };
        this.weather = {};
    }

    _createClass(Model, [{
        key: 'addEventListener',
        value: function addEventListener(event, handler) {
            this._pubsub.subscribe(event, handler);
        }
    }, {
        key: 'emit',
        value: function emit(event, args) {
            this._pubsub.publish(event, args);
        }
    }]);

    return Model;
}();

exports.default = Model;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View(model, elements) {
        _classCallCheck(this, View);

        this._model = model;
        this._elements = elements;

        // initialize DOM events
        this.DOMEvents();
    }

    _createClass(View, [{
        key: 'DOMEvents',
        value: function DOMEvents() {
            var _this = this;

            window.addEventListener('DOMContentLoaded', function () {
                // this._elements.button.addEventListener('click', () => {
                //     this._model.emit('weather');
                // });

                _this._elements.searchForm.addEventListener('submit', function (event) {
                    _this._model.emit('city-search', event);
                });
            });
        }
    }, {
        key: 'updateWeather',
        value: function updateWeather() {
            var weather = this._model.weather;
            // this._elements.weatherContainer.innerHTML = JSON.stringify(weather);
            console.log(weather);
        }
    }]);

    return View;
}();

exports.default = View;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Model = __webpack_require__(1);

var _Model2 = _interopRequireDefault(_Model);

var _View = __webpack_require__(2);

var _View2 = _interopRequireDefault(_View);

var _Controller = __webpack_require__(0);

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elements = {
    searchForm: document.getElementById('searchForm'),
    mapContainer: document.getElementById('map'),
    weatherContainer: document.getElementById('weather-con')
};

var model = new _Model2.default();
var view = new _View2.default(model, elements);
var controller = new _Controller2.default(model, view);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubSub = function () {
    function PubSub() {
        _classCallCheck(this, PubSub);

        this._eventHandlers = {};
    }

    _createClass(PubSub, [{
        key: 'subscribe',
        value: function subscribe(event, handler) {
            if (!this._eventHandlers[event]) {
                this._eventHandlers[event] = [];
            }

            this._eventHandlers[event].push(handler);
        }
    }, {
        key: 'publish',
        value: function publish(event, args) {
            if (!this._eventHandlers[event] || this._eventHandlers[event].length < 0) {
                return;
            }

            this._eventHandlers[event].forEach(function (handler) {
                handler(args);
            });
        }
    }]);

    return PubSub;
}();

exports.default = PubSub;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var generateCallbackName = function generateCallbackName() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
};

var addScriptTag = function addScriptTag(url, callback, callbackName) {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("src", '' + url + callbackName + '=' + callback);
    scriptTag.id = callbackName + '_' + callback;

    document.getElementsByTagName('head')[0].appendChild(scriptTag);
};

var removeScriptTag = function removeScriptTag(id) {
    var scriptTag = document.getElementById(id);
    document.getElementsByTagName('head')[0].removeChild(scriptTag);
};

var jsonp = function jsonp(_url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var callbackName = options.callbackName || "callback";
    var timeout = options.timeout || 5000;

    var url = _url,
        timeoutId = void 0;

    return new Promise(function (resolve, reject) {
        var callback = generateCallbackName(),
            scriptId = callbackName + '_' + callback;

        url += url.indexOf('?') === -1 ? '?' : '&';
        addScriptTag(url, callback, callbackName);

        window[callback] = function (response) {
            resolve({
                ok: true,
                json: function json() {
                    return Promise.resolve(response);
                }
            });

            if (timeoutId) clearTimeout(timeoutId);

            removeScriptTag(scriptId);
            delete window[callback];
        };

        timeoutId = setTimeout(function () {
            reject(new Error('Request timed out'));

            removeScriptTag(scriptId);
            delete window[callback];
        }, timeout);
    });
};

exports.default = jsonp;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.weatherAt = exports.parseWeatherInfo = exports.fetchWeatherInfo = exports.parseCoords = exports.getCoords = undefined;

var _jsonp = __webpack_require__(5);

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCoords = exports.getCoords = function getCoords() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
            resolve([position.coords.latitude, position.coords.longitude]);
        }, function (error) {
            reject(new Error('Unable to obtain location!'));
        });
    });
};

var parseCoords = exports.parseCoords = function parseCoords(coords) {
    return new Promise(function (resolve, reject) {
        if (coords.length !== 2) {
            reject(new Error('Inncorent coordinates!'));
        } else {
            coords.forEach(function (coord) {
                if (typeof coord !== 'number' || Number.isNaN(coord) || !isFinite(coord)) {
                    reject(new Error('Inncorent coordinates!'));
                }
            });
        }

        resolve(coords.map(function (coord) {
            return Math.round(coord);
        }));
    });
};

var fetchWeatherInfo = exports.fetchWeatherInfo = function fetchWeatherInfo(coords) {
    var key = 'ecade6d2f60bfbb23bf403c610064563',
        lat = coords[0],
        lon = coords[1],
        url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;

    return (0, _jsonp2.default)(url).then(function (response) {
        return response.json();
    });
};

var parseWeatherInfo = exports.parseWeatherInfo = function parseWeatherInfo(data) {
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
            icon: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
        }
    };
};

var weatherAt = exports.weatherAt = function weatherAt(coords) {
    if (coords) {
        return parseCoords(coords).then(fetchWeatherInfo).then(parseWeatherInfo).catch(function (err) {
            return console.error(err.message);
        });
    } else {
        return getCoords().then(parseCoords).then(fetchWeatherInfo).then(parseWeatherInfo).catch(function (err) {
            return console.error(err.message);
        });
    }
};

/***/ })
/******/ ]);