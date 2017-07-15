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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Originally written by Damian Wielgosik
// Rewritten to ES6 with some changes by Grzegorz Bielski



// observator pattern for model

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function () {
    function Observable() {
        _classCallCheck(this, Observable);

        this._events = {};
    }

    _createClass(Observable, [{
        key: 'addEventListener',
        value: function addEventListener(eventType, callback) {
            if (!this._events[eventType]) {
                this._events[eventType] = [];
            }
            this._events[eventType].push(callback);
        }
    }, {
        key: 'emitEvent',
        value: function emitEvent(eventType, args) {
            if (!this._events[eventType] || this._events[eventType].length < 0) {
                return;
            }

            this._events[eventType].forEach(function (handler) {
                handler(args);
            });
        }
    }]);

    return Observable;
}();

// contains state of particular component in the application
// implements observator pattern


var Model = exports.Model = function (_Observable) {
    _inherits(Model, _Observable);

    function Model() {
        _classCallCheck(this, Model);

        var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

        _this._properties = {};
        return _this;
    }

    _createClass(Model, [{
        key: 'set',
        value: function set(key, value) {
            // prevents changing to the same value
            if (this._properties[key] === value) return;

            this._properties[key] = value;
            this.emitEvent('change');
        }
    }, {
        key: 'get',
        value: function get(key) {
            return this._properties[key];
        }
    }]);

    return Model;
}(Observable);

// associated with only one component
// binds HTML to JS


var View = exports.View = function () {
    function View(model, controller) {
        _classCallCheck(this, View);

        this._model = model;
        this._controller = controller;
        if (controller) controller.setView(this);
        this._root;
    }

    _createClass(View, [{
        key: 'getModel',
        value: function getModel() {
            return this._model;
        }
    }, {
        key: 'getController',
        value: function getController() {
            return this._controller;
        }
    }, {
        key: 'getRoot',
        value: function getRoot() {
            return this._root;
        }
    }, {
        key: 'setModel',
        value: function setModel(newModel) {
            this._model = newModel;
        }
    }, {
        key: 'setController',
        value: function setController(newController) {
            this._controller = newController;
        }
    }, {
        key: 'setRoot',
        value: function setRoot(element) {
            this._root = element;
        }
    }]);

    return View;
}();

// can get another view or model to work with


var Controller = exports.Controller = function () {
    function Controller(model, view) {
        _classCallCheck(this, Controller);

        this._model = model;
        this._view = view;
    }

    _createClass(Controller, [{
        key: 'getView',
        value: function getView() {
            return this._view;
        }
    }, {
        key: 'getModel',
        value: function getModel() {
            return this._model;
        }
    }, {
        key: 'setView',
        value: function setView(newView) {
            this._view = newView;
        }
    }, {
        key: 'setModel',
        value: function setModel(newModel) {
            this._model = newModel;
        }
    }]);

    return Controller;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseWikiInfo = exports.fetchWikiInfo = exports.parseWeatherInfo = exports.convertSpeed = exports.convertTemp = exports.fetchWeatherInfo = exports.parseCityInfo = exports.fetchCityInfo = exports.parseCoords = exports.fetchCoords = exports.getNonASCII = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsonp = __webpack_require__(13);

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

// returns nonASCII string or first one
var getNonASCII = exports.getNonASCII = function getNonASCII(a, b) {
    var regExp = /[^\x00-\x7F]+/;
    var nonASCII = b.match(regExp) ? b : a;

    return nonASCII;
};

var fetchCoords = exports.fetchCoords = function fetchCoords() {
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

        resolve(coords);
    });
};

var fetchCityInfo = exports.fetchCityInfo = function fetchCityInfo(value, key) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&language=en&key=' + key;

    return fetch(url).then(function (response) {
        return response.json();
    });
};

var parseCityInfo = exports.parseCityInfo = function parseCityInfo(data) {
    if (!data.status === 'OK') {
        throw new Error('Incorrect data status');
    }
    var info = data.results[0];
    return {
        name: info.address_components[0].short_name,
        address: info.formatted_address,
        coords: [info.geometry.location.lat, info.geometry.location.lng]
    };
};

var fetchWeatherInfo = exports.fetchWeatherInfo = function fetchWeatherInfo(coords, key) {
    var _coords = _slicedToArray(coords, 2),
        lat = _coords[0],
        lon = _coords[1];

    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;

    return (0, _jsonp2.default)(url).then(function (response) {
        return response.json();
    });
};

var convertTemp = exports.convertTemp = function convertTemp(data, system) {
    if (system === 'metric') return Math.round(data - 273.15) + ' &#8451;';
    if (system === 'imperial') return Math.round(data * 9 / 5 - 459.67) + ' &#8457;';
};

var convertSpeed = exports.convertSpeed = function convertSpeed(data, system) {
    if (system === 'metric') return Math.round(data) + ' m/s';
    if (system === 'imperial') return Math.round(data * 2.23693629) + ' mph';
};

var parseTime = function parseTime(isoString) {
    return new Date(isoString * 1000).toLocaleTimeString().substring(0, 5);
};

var parseDate = function parseDate(isoString) {
    return new Date(isoString * 1000).toDateString().substr(4, 3);
};

var parseWeatherInfo = exports.parseWeatherInfo = function parseWeatherInfo(data, system) {
    return {
        country: data.sys.country,
        time: parseDate(data.dt) + ', ' + parseTime(data.dt),
        city: data.name,
        temp: data.main.temp,
        pressure: Math.round(data.main.pressure) + ' hPa',
        humidity: data.main.humidity + ' %',
        wind: data.wind.speed,
        sunrise: parseTime(data.sys.sunrise),
        sunset: parseTime(data.sys.sunset),
        description: {
            info: data.weather[0].description,
            icon: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
        }
    };
};

var fetchWikiInfo = exports.fetchWikiInfo = function fetchWikiInfo(value) {
    var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=' + value + '&redirects';

    return (0, _jsonp2.default)(url).then(function (response) {
        return response.json();
    });
};

var parseWikiInfo = exports.parseWikiInfo = function parseWikiInfo(data) {
    var info = Object.values(data.query.pages)[0];
    return {
        title: info.title,
        link: 'http://en.wikipedia.org/?curid=' + info.pageid,
        extract: info.extract
    };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var MapController = function (_Controller) {
    _inherits(MapController, _Controller);

    function MapController(model, view) {
        _classCallCheck(this, MapController);

        return _possibleConstructorReturn(this, (MapController.__proto__ || Object.getPrototypeOf(MapController)).call(this, model, view));
    }

    _createClass(MapController, [{
        key: '_getAllInfo',
        value: function _getAllInfo() {
            var model = this.getModel();
            var weatherCity = void 0;
            var locationCity = void 0;

            model.emitEvent('get-all');

            model.getWeatherInfo(model.get('coords')).then(function (weather) {
                model.set('weather', weather);
                weatherCity = weather.city;
            }).then(function () {
                return model.getCityInfo(weatherCity);
            }).then(function (location) {
                model.set('location', location);
                locationCity = location.name;
            }).then(function () {
                return model.getWikiInfo(weatherCity);
            }).then(function (info) {
                return model.set('info', info);
            }).then(function () {
                return model.emitEvent('change-all');
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'onCoordsChange',
        value: function onCoordsChange() {
            var map = this.getModel().get('map');

            var _getModel$get = this.getModel().get('coords'),
                _getModel$get2 = _slicedToArray(_getModel$get, 2),
                lat = _getModel$get2[0],
                lng = _getModel$get2[1];

            var latLng = new google.maps.LatLng(lat, lng);

            map.marker.setPosition(latLng);
            map.map.setCenter(latLng);

            this._getAllInfo();
        }
    }, {
        key: 'onDbClick',
        value: function onDbClick(event) {
            var model = this.getModel();
            var coords = [event.latLng.lat(), event.latLng.lng()];

            model.set('coords', coords);
            console.log(model.get('coords'));
            model.emitEvent('change-coords');
        }
    }]);

    return MapController;
}(_MVC.Controller);

exports.default = MapController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var SearchFormController = function (_Controller) {
    _inherits(SearchFormController, _Controller);

    function SearchFormController(model, view) {
        _classCallCheck(this, SearchFormController);

        return _possibleConstructorReturn(this, (SearchFormController.__proto__ || Object.getPrototypeOf(SearchFormController)).call(this, model, view));
    }

    _createClass(SearchFormController, [{
        key: '_getAllInfoFromValue',
        value: function _getAllInfoFromValue(value) {
            var model = this.getModel();
            var cityLocation = void 0;

            model.emitEvent('get-all');

            model.getCityInfo(value).then(function (location) {
                model.set('location', location);
                cityLocation = location.name;

                if (model.get('coords')) {
                    model.set('coords', location.coords);
                    model.emitEvent('change-coords');
                } else {
                    model.set('coords', location.coords);
                    model.emitEvent('initial-coords');
                }
            }).then(function () {
                return model.getWeatherInfo();
            }).then(function (weather) {
                return model.set('weather', weather);
            }).then(function () {
                return model.getWikiInfo(cityLocation);
            }).then(function (info) {
                return model.set('info', info);
            }).then(function () {
                console.log(model.get('weather'));
                console.log(model.get('info'));
                console.log(model.get('location'));
                model.emitEvent('change-all');
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            var value = event.target.children.searchCity.value;
            event.preventDefault();
            this._getAllInfoFromValue(value);
        }
    }]);

    return SearchFormController;
}(_MVC.Controller);

exports.default = SearchFormController;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

var _utilis = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var WeatherController = function (_Controller) {
    _inherits(WeatherController, _Controller);

    function WeatherController(model, view) {
        _classCallCheck(this, WeatherController);

        return _possibleConstructorReturn(this, (WeatherController.__proto__ || Object.getPrototypeOf(WeatherController)).call(this, model, view));
    }

    _createClass(WeatherController, [{
        key: '_getAllInfo',
        value: function _getAllInfo() {
            var model = this.getModel();
            var weatherCity = void 0;
            var locationCity = void 0;

            model.emitEvent('get-all');

            model.getCoords().then(function (coords) {
                if (model.get('coords')) {
                    model.set('coords', coords);
                    model.emitEvent('change-coords');
                } else {
                    model.set('coords', coords);
                    model.emitEvent('initial-coords');
                }
            }).then(function () {
                return model.getWeatherInfo(model.get('coords'));
            }).then(function (weather) {
                model.set('weather', weather);
                weatherCity = weather.city;
            }).then(function () {
                return model.getCityInfo(weatherCity);
            }).then(function (location) {
                model.set('location', location);
                locationCity = location.name;
            }).then(function () {
                return model.getWikiInfo((0, _utilis.getNonASCII)(weatherCity, locationCity));
            }).then(function (info) {
                return model.set('info', info);
            }).then(function () {
                return model.emitEvent('change-all');
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(checkBoxState) {
            var model = this.getModel();

            var system = checkBoxState ? 'metric' : 'imperial';

            model.setSystem(system);
            model.emitEvent('change-weather');
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            this._getAllInfo();
        }
    }, {
        key: 'onRefresh',
        value: function onRefresh() {
            this._getAllInfo();
        }
    }]);

    return WeatherController;
}(_MVC.Controller);

exports.default = WeatherController;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilis = __webpack_require__(1);

var _config = __webpack_require__(10);

var _config2 = _interopRequireDefault(_config);

var _MVC = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var AppModel = function (_Model) {
    _inherits(AppModel, _Model);

    function AppModel() {
        _classCallCheck(this, AppModel);

        var _this = _possibleConstructorReturn(this, (AppModel.__proto__ || Object.getPrototypeOf(AppModel)).call(this));

        _this._settings = _config2.default;
        _this.set('location', null);
        _this.set('coords', null);
        _this.set('weather', null);
        _this.set('info', null);
        _this.set('map', null);
        return _this;
    }

    _createClass(AppModel, [{
        key: 'init',
        value: function init() {
            // decide on unit system
            if (localStorage.getItem('app-system')) {
                var system = localStorage.getItem('app-system');
                this._settings.system = system;
            } else {
                var defaultSystem = 'metric';
                localStorage.setItem('app-system', defaultSystem);
                this._settings.system = defaultSystem;
            }

            this.emitEvent('load');
        }
    }, {
        key: 'getCoords',
        value: function getCoords() {
            return (0, _utilis.fetchCoords)();
        }
    }, {
        key: 'getSettings',
        value: function getSettings() {
            return this._settings;
        }
    }, {
        key: 'getCityInfo',
        value: function getCityInfo(value) {
            return (0, _utilis.fetchCityInfo)(value, this.getSettings().geocodeKey).then(_utilis.parseCityInfo);
        }
    }, {
        key: 'getWeatherInfo',
        value: function getWeatherInfo() {
            var coords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.get('location').coords;

            var weatherKey = this.getSettings().weatherKey;
            var system = this.getSettings().system;

            return (0, _utilis.parseCoords)(coords).then(function (parsedCoords) {
                return (0, _utilis.fetchWeatherInfo)(parsedCoords, weatherKey);
            }).then(function (weatherInfo) {
                return (0, _utilis.parseWeatherInfo)(weatherInfo, system);
            });
        }
    }, {
        key: 'getWikiInfo',
        value: function getWikiInfo(city) {
            return (0, _utilis.fetchWikiInfo)(city).then(_utilis.parseWikiInfo);
        }
    }, {
        key: 'setSystem',
        value: function setSystem(newSystem) {
            this._settings.system = newSystem;
            localStorage.setItem('app-system', newSystem);
        }
    }]);

    return AppModel;
}(_MVC.Model);

exports.default = AppModel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var InfoView = function (_View) {
    _inherits(InfoView, _View);

    function InfoView(model, controller) {
        _classCallCheck(this, InfoView);

        var _this = _possibleConstructorReturn(this, (InfoView.__proto__ || Object.getPrototypeOf(InfoView)).call(this, model, controller));

        _this.setRoot(document.getElementById('city'));
        _this._elements = {
            content: _this.getRoot().querySelector('.city__content'),
            loadingIndicator: _this.getRoot().querySelector('.loading-indicator')
        };

        _this.events();
        return _this;
    }

    _createClass(InfoView, [{
        key: 'getEl',
        value: function getEl() {
            return this._elements;
        }
    }, {
        key: 'events',
        value: function events() {
            var _this2 = this;

            this.getModel().addEventListener('change-all', function () {
                _this2.render();
                _this2.toggleLoadingIndicator();
            });
            this.getModel().addEventListener('get-all', function () {
                return _this2.toggleLoadingIndicator();
            });
        }
    }, {
        key: 'toggleLoadingIndicator',
        value: function toggleLoadingIndicator() {
            this.getEl().loadingIndicator.classList.toggle('loading-indicator--active');
        }
    }, {
        key: 'render',
        value: function render() {
            var info = this.getModel().get('info');
            var title = info.title;
            var link = '<a class="city__link" href="' + info.link + '" target="_blank" title="Learn more about ' + info.title + ' on wiki" >Learn more</a>';
            var details = void 0;

            if (info.extract) {
                details = info.extract.split('</p>')[0];
            } else {
                title = 'what city again? ';
                details = '<p>Try typing name of the city manually in the search bar or click on some other nearby place on the map. Sometimes given location may be too crowded.</p>';
                link = '';
            }

            this.getEl().content.innerHTML = '\n            <h2 class="city__title">About ' + title + '</h2>\n            ' + details + '\n            <div class="city__actions">\n                ' + link + '\n            </div>\n        ';
        }
    }]);

    return InfoView;
}(_MVC.View);

exports.default = InfoView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

var _mapStyle = __webpack_require__(11);

var _mapStyle2 = _interopRequireDefault(_mapStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var MapView = function (_View) {
    _inherits(MapView, _View);

    function MapView(model, controller) {
        _classCallCheck(this, MapView);

        var _this = _possibleConstructorReturn(this, (MapView.__proto__ || Object.getPrototypeOf(MapView)).call(this, model, controller));

        _this.setRoot(document.getElementById('map'));

        _this.events();
        console.log(_mapStyle2.default);
        return _this;
    }

    _createClass(MapView, [{
        key: 'events',
        value: function events() {
            var _this2 = this;

            this.getModel().addEventListener('initial-coords', function () {
                return _this2.setUpMap();
            });
            this.getModel().addEventListener('change-coords', function () {
                return _this2.getController().onCoordsChange();
            });
        }
    }, {
        key: 'mapEvents',
        value: function mapEvents() {
            var _this3 = this;

            this.getModel().get('map').map.addListener('dblclick', function (event) {
                return _this3.getController().onDbClick(event);
            });
        }
    }, {
        key: 'setUpMap',
        value: function setUpMap() {
            var _this4 = this;

            var model = this.getModel();
            var scriptTag = document.createElement('script');
            var apiKey = model.getSettings().mapKey;
            var coords = model.get('coords');

            var initMap = function initMap() {
                var map = new google.maps.Map(_this4.getRoot(), {
                    center: {
                        lat: coords[0],
                        lng: coords[1]
                    },
                    zoom: 6,
                    styles: _mapStyle2.default
                });
                var marker = new google.maps.Marker({
                    position: {
                        lat: coords[0],
                        lng: coords[1]
                    },
                    map: map
                });
                model.set('map', { map: map, marker: marker });
                // initialize events
                _this4.mapEvents();
            };
            // add initMap to global env
            window.initMap = initMap;

            // get map code by jsonp
            scriptTag.setAttribute("src", 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap');
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        }
    }]);

    return MapView;
}(_MVC.View);

exports.default = MapView;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var SearchFormView = function (_View) {
    _inherits(SearchFormView, _View);

    function SearchFormView(model, controller) {
        _classCallCheck(this, SearchFormView);

        var _this = _possibleConstructorReturn(this, (SearchFormView.__proto__ || Object.getPrototypeOf(SearchFormView)).call(this, model, controller));

        _this.setRoot(document.getElementById('searchForm'));
        _this.events();
        return _this;
    }

    _createClass(SearchFormView, [{
        key: 'events',
        value: function events() {
            var _this2 = this;

            this.getRoot().addEventListener('submit', function (event) {
                return _this2.getController().onSubmit(event);
            });
        }
    }]);

    return SearchFormView;
}(_MVC.View);

exports.default = SearchFormView;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

var _utilis = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var toggleLoadingIndicator = function toggleLoadingIndicator(root) {
    root.innerHTML = '\n        \n    ';
};

var WeatherView = function (_View) {
    _inherits(WeatherView, _View);

    function WeatherView(model, controller) {
        _classCallCheck(this, WeatherView);

        var _this = _possibleConstructorReturn(this, (WeatherView.__proto__ || Object.getPrototypeOf(WeatherView)).call(this, model, controller));

        _this.setRoot(document.getElementById('weather'));

        // const containers = [...this.getRoot().querySelectorAll('.weather-info__container')];

        _this._elements = {
            timePlace: _this.getRoot().querySelector('.weather-timeplace'),
            description: _this.getRoot().querySelector('.weather-description'),
            details: _this.getRoot().querySelector('.weather-details'),
            refresh: _this.getRoot().querySelector('.weather-actions__refresh'),
            change: _this.getRoot().querySelector('.switch'),
            changeCheckbox: _this.getRoot().querySelector('.switch__checkbox'),
            changeIndicator: _this.getRoot().querySelector('.switch__indicator'),
            loadingIndicator: _this.getRoot().querySelector('.loading-indicator')
        };

        _this.events();
        return _this;
    }

    _createClass(WeatherView, [{
        key: 'getEl',
        value: function getEl() {
            return this._elements;
        }
    }, {
        key: 'events',
        value: function events() {
            var _this2 = this;

            this.getModel().addEventListener('change-all', function () {
                _this2.render();
                _this2.toggleLoadingIndicator();
            });
            this.getModel().addEventListener('get-all', function () {
                return _this2.toggleLoadingIndicator();
            });
            this.getModel().addEventListener('change-weather', function () {
                return _this2.render();
            });
            this.getModel().addEventListener('load', function () {
                _this2.getController().onLoad();
                _this2.setCheckboxState();
            });
            this.getEl().refresh.addEventListener('click', function () {
                return _this2.getController().onRefresh();
            });
            this.getEl().change.addEventListener('change', function () {
                var checkboxState = _this2.toggleCheckbox();
                _this2.getController().onChange(checkboxState);
            });
        }
    }, {
        key: 'setCheckboxState',
        value: function setCheckboxState() {
            var model = this.getModel();
            var checkbox = this.getEl().changeCheckbox;
            var indicator = this.getEl().changeIndicator;

            if (model.getSettings().system === 'imperial') {
                checkbox.checked = false;
                indicator.textContent = 'check_box_outline_blank';
            }
        }
    }, {
        key: 'toggleCheckbox',
        value: function toggleCheckbox() {
            var indicator = this.getEl().changeIndicator;
            var checkbox = this.getEl().changeCheckbox;

            if (checkbox.checked) {
                indicator.textContent = 'check_box';
            } else {
                indicator.textContent = 'check_box_outline_blank';
            }

            return checkbox.checked;
        }
    }, {
        key: 'toggleLoadingIndicator',
        value: function toggleLoadingIndicator() {
            this.getEl().loadingIndicator.classList.toggle('loading-indicator--active');
        }
    }, {
        key: 'render',
        value: function render() {
            var system = this.getModel().getSettings().system;
            var weather = this.getModel().get('weather');
            var info = this.getModel().get('info');

            this.getEl().timePlace.innerHTML = '\n            <h2 class="weather-timeplace__title">' + (0, _utilis.getNonASCII)(weather.city, info.title) + '</h2>\n            <strong class="weather-timeplace__date">Weather on: <time>' + weather.time + '</time></strong>';

            this.getEl().description.innerHTML = '\n            <div class="weather-description__container">\n                <img class="weather-description__icon" src="' + weather.description.icon + '" alt="" aria-hidden="true">\n                <strong class="weather-description__temp">' + (0, _utilis.convertTemp)(weather.temp, system) + '</strong>\n            </div>\n            <strong class="weather-description__desc">' + weather.description.info + '</strong>\n            ';

            this.getEl().details.innerHTML = '\n            <thead class="weather-details__thead">\n                <tr>\n                    <th>Sunrise</th>\n                    <th>Sunset</th>\n                    <th>Pressure</th>\n                    <th>Humidity</th>\n                    <th>Wind</th>\n                </tr>\n            </thead>\n            <tbody class="weather-details__tbody">\n                <tr>\n                    <td>' + weather.sunrise + '</td>\n                    <td>' + weather.sunset + '</td>\n                    <td>' + weather.pressure + '</td>\n                    <td>' + weather.humidity + '</td>\n                    <td>' + (0, _utilis.convertSpeed)(weather.wind, system) + '</td>\n                </tr>\n            </tbody>';
        }
    }]);

    return WeatherView;
}(_MVC.View);

exports.default = WeatherView;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
	"geocodeKey": "AIzaSyCzS_VaGlP12Ddwn9hQIWW3qi_vcc2PWdc",
	"weatherKey": "ecade6d2f60bfbb23bf403c610064563",
	"mapKey": "AIzaSyCAoZKb18BDrDlKTiNGe_K6NsfRXxE1IqE"
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = [
	{
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#7c7775"
			}
		]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#746855"
			}
		]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#242f3e"
			}
		]
	},
	{
		"featureType": "administrative.locality",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#ffb74d"
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "labels.text",
		"stylers": [
			{
				"color": "#d7ccc8"
			},
			{
				"weight": 2
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#242f3e"
			}
		]
	},
	{
		"featureType": "administrative.country",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#d7ccc8"
			},
			{
				"weight": 1
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#d59563"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#686361"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#6b9a76"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#38414e"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#212a37"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9ca5b3"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#746855"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#1f2835"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#f3d19c"
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#2f3948"
			}
		]
	},
	{
		"featureType": "transit.station",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#d59563"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#17263c"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#515c6d"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#17263c"
			}
		]
	}
];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _appModel = __webpack_require__(5);

var _appModel2 = _interopRequireDefault(_appModel);

var _SearchFormView = __webpack_require__(8);

var _SearchFormView2 = _interopRequireDefault(_SearchFormView);

var _WeatherView = __webpack_require__(9);

var _WeatherView2 = _interopRequireDefault(_WeatherView);

var _InfoView = __webpack_require__(6);

var _InfoView2 = _interopRequireDefault(_InfoView);

var _MapView = __webpack_require__(7);

var _MapView2 = _interopRequireDefault(_MapView);

var _SearchFormController = __webpack_require__(3);

var _SearchFormController2 = _interopRequireDefault(_SearchFormController);

var _WeatherController = __webpack_require__(4);

var _WeatherController2 = _interopRequireDefault(_WeatherController);

var _MapController = __webpack_require__(2);

var _MapController2 = _interopRequireDefault(_MapController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

// app model
var appModel = new _appModel2.default();

// controllers
var searchFormController = new _SearchFormController2.default(appModel);
var weatherController = new _WeatherController2.default(appModel);
var mapController = new _MapController2.default(appModel);

// views
var searchFormView = new _SearchFormView2.default(appModel, searchFormController);
var weatherView = new _WeatherView2.default(appModel, weatherController);
var infoView = new _InfoView2.default(appModel);
var mapView = new _MapView2.default(appModel, mapController);

// initialize app
document.addEventListener('DOMContentLoaded', function () {
  return appModel.init();
});

/***/ }),
/* 13 */
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

/***/ })
/******/ ]);