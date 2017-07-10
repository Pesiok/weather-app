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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
    function Controller(model) {
        _classCallCheck(this, Controller);

        this._model = model;
        this._view;
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var SearchFormController = function (_Controller) {
    _inherits(SearchFormController, _Controller);

    function SearchFormController(model) {
        _classCallCheck(this, SearchFormController);

        return _possibleConstructorReturn(this, (SearchFormController.__proto__ || Object.getPrototypeOf(SearchFormController)).call(this, model));
    }

    _createClass(SearchFormController, [{
        key: 'onSubmit',
        value: function onSubmit(event) {
            var value = event.target.children.searchCity.value;

            event.preventDefault();

            var model = this.getModel();

            model.getCityInfo(value).then(function (location) {
                return model.set('location', location);
            }).then(function () {
                return model.getWeatherInfo();
            }).then(function (weather) {
                return model.set('weather', weather);
            }).then(function () {
                return model.getWikiInfo();
            }).then(function (info) {
                return model.set('info', info);
            }).then(function () {
                return model.emitEvent('change-all');
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }]);

    return SearchFormController;
}(_MVC.Controller);

exports.default = SearchFormController;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilis = __webpack_require__(9);

var _config = __webpack_require__(6);

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
        _this.set('location', {});
        _this.set('weather', []);
        _this.set('info', {});
        return _this;
    }

    _createClass(AppModel, [{
        key: 'getCoords',
        value: function getCoords() {
            return (0, _utilis.fetchCoords)().then(function (coords) {
                return (0, _utilis.parseCoords)(coords);
            });
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

            return (0, _utilis.parseCoords)(coords).then(function (coords) {
                return (0, _utilis.fetchWeatherInfo)(coords, weatherKey);
            }).then(_utilis.parseWeatherInfo);
        }
    }, {
        key: 'getWikiInfo',
        value: function getWikiInfo() {
            var city = this.get('weather').city || this.get('location').address;

            return (0, _utilis.fetchWikiInfo)(city).then(_utilis.parseWikiInfo);
        }
    }]);

    return AppModel;
}(_MVC.Model);

exports.default = AppModel;

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

var InfoView = function (_View) {
    _inherits(InfoView, _View);

    function InfoView(model, controller) {
        _classCallCheck(this, InfoView);

        var _this = _possibleConstructorReturn(this, (InfoView.__proto__ || Object.getPrototypeOf(InfoView)).call(this, model, controller));

        _this.setRoot(document.querySelector('.city-info'));
        _this.events();
        return _this;
    }

    _createClass(InfoView, [{
        key: 'events',
        value: function events() {
            var _this2 = this;

            this.getModel().addEventListener('change-all', function () {
                return _this2.render();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var info = this.getModel().get('info');

            this.getRoot().innerHTML = '\n            <h2 class="city-info__title">About ' + info.title + '</h2>\n            <p class="city-info__description">' + info.extract + '</p>\n            <a class="button" href="' + info.link + '">Learn more</a>\n        ';
        }
    }]);

    return InfoView;
}(_MVC.View);

exports.default = InfoView;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MVC = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

'use strict';

var WeatherView = function (_View) {
    _inherits(WeatherView, _View);

    function WeatherView(model, controller) {
        _classCallCheck(this, WeatherView);

        var _this = _possibleConstructorReturn(this, (WeatherView.__proto__ || Object.getPrototypeOf(WeatherView)).call(this, model, controller));

        _this.setRoot(document.querySelector('.weather-info'));

        var containers = [].concat(_toConsumableArray(_this.getRoot().querySelectorAll('.weather-info__container')));

        _this._elements = {
            placeAndTime: containers[0],
            weather: containers[1],
            details: _this.getRoot().querySelector('.weather-info__details')
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
                return _this2.render();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var location = this.getModel().get('location');
            var weather = this.getModel().get('weather');

            this.getEl().placeAndTime.innerHTML = '\n            <h2>' + location.address + '</h2>\n            <p>Weather on: ' + weather.time + '</p>';

            this.getEl().weather.innerHTML = '\n            <img src="' + weather.description.icon + '" alt="" aria-hidden="true">\n            <span>' + weather.temp + '</span>\n            <span>' + weather.description.info + '</span>';

            this.getEl().details.innerHTML = '\n            <thead>\n                <tr>\n                    <th>Sunrise</th>\n                    <th>Sunset</th>\n                    <th>Pressure</th>\n                    <th>Humidity</th>\n                    <th>Wind</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td>' + weather.sunrise + '</td>\n                    <td>' + weather.sunset + '</td>\n                    <td>' + weather.pressure + '</td>\n                    <td>' + weather.humidity + '</td>\n                    <td>' + weather.wind + '</td>\n                </tr>\n            </tbody>';
        }
    }]);

    return WeatherView;
}(_MVC.View);

exports.default = WeatherView;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"geocodeKey": "AIzaSyCzS_VaGlP12Ddwn9hQIWW3qi_vcc2PWdc",
	"weatherKey": "ecade6d2f60bfbb23bf403c610064563"
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _appModel = __webpack_require__(2);

var _appModel2 = _interopRequireDefault(_appModel);

var _SearchFormView = __webpack_require__(4);

var _SearchFormView2 = _interopRequireDefault(_SearchFormView);

var _WeatherView = __webpack_require__(5);

var _WeatherView2 = _interopRequireDefault(_WeatherView);

var _InfoView = __webpack_require__(3);

var _InfoView2 = _interopRequireDefault(_InfoView);

var _SearchFormController = __webpack_require__(1);

var _SearchFormController2 = _interopRequireDefault(_SearchFormController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

// main model
var appModel = new _appModel2.default();

// controllers
var searchFormController = new _SearchFormController2.default(appModel);

// views
var searchFormView = new _SearchFormView2.default(appModel, searchFormController);
var weatherView = new _WeatherView2.default(appModel);
var infoView = new _InfoView2.default(appModel);

// start app on load

// document.addEventListener('DOMContentLoaded', () => {
//     appModel.getCoords()
//         .then(() => appModel.getWeatherInfo())
//         .then(weather => appModel.set('weater', weather))
//         .then(() => getCityInfo(appModel.get('weather').city))
//         .then(location => appModel.set('location', location))
//         .then(() => appModel.getWikiInfo())
//         .then(info => appModel.set('info', info))
//         .then(() => appModel.emitEvent('change-all'))
//         .catch(error => console.log(error));
// });

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseWikiInfo = exports.fetchWikiInfo = exports.parseWeatherInfo = exports.fetchWeatherInfo = exports.parseCityInfo = exports.fetchCityInfo = exports.parseCoords = exports.fetchCoords = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsonp = __webpack_require__(8);

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

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
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + key;

    return fetch(url).then(function (response) {
        return response.json();
    });
};

var parseCityInfo = exports.parseCityInfo = function parseCityInfo(data) {
    if (!data.status === 'OK') {
        throw new Error('Incorrect data status');
    }

    return {
        address: data.results[0].formatted_address,
        coords: [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]
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

var parseWeatherInfo = exports.parseWeatherInfo = function parseWeatherInfo(data) {
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

var fetchWikiInfo = exports.fetchWikiInfo = function fetchWikiInfo(value) {
    var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=' + value;

    return (0, _jsonp2.default)(url).then(function (response) {
        return response.json();
    });
};

var parseWikiInfo = exports.parseWikiInfo = function parseWikiInfo(data) {
    var info = Object.values(data.query.pages)[0];
    // console.log(data);
    return {
        title: info.title,
        link: 'http://en.wikipedia.org/?curid=' + info.pageid,
        extract: info.extract
    };
};

/***/ })
/******/ ]);