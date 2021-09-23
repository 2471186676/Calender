/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/weather/createWeatherBar.js":
/*!*****************************************!*\
  !*** ./src/weather/createWeatherBar.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSearchBar": () => (/* binding */ createSearchBar),
/* harmony export */   "createWeatherBox": () => (/* binding */ createWeatherBox)
/* harmony export */ });
function createWeatherBox(array, amount, unit) {
	// C = Celsius      F = Fahrenheit

	// create weather box
	const weatherBar = document.createElement("div");
	weatherBar.id = "weatherBar";

	for (let i = 0; i < amount; i++) {
		const box = document.createElement("div");
		box.className = "weatherBox";

		const date = document.createElement("p");
		const option = { month: 'long', day: 'numeric'};
		date.innerText = array[i].date.toLocaleString('en-GB', option);
		box.appendChild(date);

		const img = document.createElement("img");
		img.src = "http://openweathermap.org/img/wn/" + array[i].icon + ".png";
		box.appendChild(img);

		const temp = document.createElement("p");
		temp.innerText =
			unitConvert(array[i].maxTemp, unit) +
			" - " +
			unitConvert(array[i].minTemp, unit) +
			unit;

		box.appendChild(temp);

		const weather = document.createElement("p");
		weather.innerText = array[i].weather;
		box.appendChild(weather);

		weatherBar.appendChild(box);
	}

	return weatherBar;
}

function unitConvert(temp, unit) {
	// convert from kelvin to C or F
	// K - C (K − 273.15)
	// K - F ((K − 273.15) × 9/5 + 32)

	let answer = temp;

	if (unit.toLowerCase() == "c") {
		answer = answer - 273.15;
	} else if (unit.toLowerCase() == "f") {
		answer = (answer - 273.15) * (9 / 5) + 32;
	}

	return answer.toFixed(1);
}

function createSearchBar() {
	// create dom to display data
	const wBar = document.getElementById("weather");

	// create search bar
	const searchBar = document.createElement("div");
	searchBar.className = "searchBar";

	const form = document.createElement("form")

	const input = document.createElement("input");
	input.type = "text";
	input.id = "city";
	input.defaultValue = "shenzhen";
	searchBar.appendChild(input);

	const search = document.createElement("button");
	search.id = "test";
	search.innerText = "GO";
	searchBar.appendChild(search);

	// -------

	
	const fahrenheit = document.createElement("input");
	fahrenheit.type = "radio";
	fahrenheit.name = "unit";
	fahrenheit.value = "f";
	fahrenheit.id = "f";
	searchBar.appendChild(fahrenheit);

	const labelF = document.createElement("label");
	labelF.innerText = "fahrenheit";
	searchBar.appendChild(labelF);

	const celsius = document.createElement("input");
	celsius.type = "radio";
	celsius.name = "unit";
	celsius.value = "c";
	celsius.id = "c";
	celsius.checked = true;
	searchBar.appendChild(celsius);

	const labelC = document.createElement("label");
	labelC.innerText = "celsius";
	searchBar.appendChild(labelC);


	searchBar.appendChild(form);
	wBar.appendChild(searchBar);
}




/***/ }),

/***/ "./src/weather/request.js":
/*!********************************!*\
  !*** ./src/weather/request.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

// google api key AIzaSyAzeQqNFTLBoPMhCZs-XtGilERftHfwhYM
// ow api         3f79f896e97cfe497c0497941dc7a42f
// giphy          NED7Fs9BkMnoSDtRqDvQC2t9HdIwHQGw



async function getJSON(api){
    try{
        const get = await fetch(api);
        let response = await get.json(api);
        return response;
    }catch(e){
        return e;
    }

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getJSON);



/***/ }),

/***/ "./src/weather/weatherDisplay.js":
/*!***************************************!*\
  !*** ./src/weather/weatherDisplay.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUniquedate": () => (/* binding */ getUniquedate),
/* harmony export */   "getWeatherUrl": () => (/* binding */ getWeatherUrl),
/* harmony export */   "displayForecast": () => (/* binding */ displayForecast),
/* harmony export */   "getWeather": () => (/* binding */ getWeather),
/* harmony export */   "createSearchBar": () => (/* reexport safe */ _createWeatherBar__WEBPACK_IMPORTED_MODULE_1__.createSearchBar),
/* harmony export */   "fetchEvent": () => (/* binding */ fetchEvent)
/* harmony export */ });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./src/weather/request.js");
/* harmony import */ var _createWeatherBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createWeatherBar */ "./src/weather/createWeatherBar.js");
// manipulate json data




// json contain 5 records from a single day
// I want 1 record per day
function getUniquedate(array) {
	let date = [];

	for (let i = 0; i < array.length; i++) {
		let push = true;
		let checkdate = new Date(array[i].dt_txt);

		for (let x = 0; x < date.length; x++) {
			if (checkdate.getDate() == getWeatherDateType(date[x]).getDate()) {
				push = false;
				x = date.length + 1;
			}
		}

		if (push) {
			date.push(array[i]);
		}
	}

	return date;
}

function getWeatherDateType(object) {
	return new Date(object.dt_txt);
}

function getWeatherUrl(object) {
	const url = "http://openweathermap.org/img/wn/";
	return url + object.weather.icon;
}

function getWeather(place) {
	let api =
		"http://api.openweathermap.org/data/2.5/forecast?q=" +
		place +
		"&appid=3f79f896e97cfe497c0497941dc7a42f";
	return (0,_request__WEBPACK_IMPORTED_MODULE_0__["default"])(api);
}

function displayForecast(array, unit) {
	let data = getUniquedate(array);
	let objectArray = [];

	// load data into an object
	for (let i = 0; i < 5; i++) {
		let weather = {
			date: new Date(data[i].dt_txt),
			icon: data[i].weather[0].icon,
			maxTemp: data[i].main.temp_max,
			minTemp: data[i].main.temp_min,
			weather: data[i].weather[0].description,
		};
		objectArray.push(weather);
	}

	const body = document.getElementById("weather");
	const bar = document.getElementById("weatherBar");

	if (bar != null) {
		bar.remove();
	}

	body.appendChild((0,_createWeatherBar__WEBPACK_IMPORTED_MODULE_1__.createWeatherBox)(objectArray, objectArray.length, unit));
}

function fetchEvent(_city, unit) {
	getWeather(String(_city)).then((response) => {
		if (response.cod == "200") {
			const array = response.list;
			displayForecast(array, unit);
		} else {
			alert(response.message);
		}
	});
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather_weatherDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather/weatherDisplay */ "./src/weather/weatherDisplay.js");
//import './global.css';



function readCity() {
	let button = document.getElementById("test");
	let city = document.getElementById("city");

	button.addEventListener("click", () => {
		let unit = document.querySelector("input[name='unit']:checked");
		console.log(unit.value);
		(0,_weather_weatherDisplay__WEBPACK_IMPORTED_MODULE_0__.fetchEvent)(city.value, unit.value);
	});

	let radio = document.querySelectorAll("input[name='unit']");
	radio.forEach(element => {
		element.addEventListener('change', ()=>{
			let unit = document.querySelector("input[name='unit']:checked");
			(0,_weather_weatherDisplay__WEBPACK_IMPORTED_MODULE_0__.fetchEvent)(city.value, unit.value);
		});
	});

	
	
}


(0,_weather_weatherDisplay__WEBPACK_IMPORTED_MODULE_0__.createSearchBar)();
readCity();
(0,_weather_weatherDisplay__WEBPACK_IMPORTED_MODULE_0__.fetchEvent)("shenzhen","c");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFNkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRzdDO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7O0FBR0EsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CdkI7O0FBRWdDO0FBQ3VDOztBQUV2RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFPO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixtRUFBZ0I7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVrRzs7Ozs7OztVQ25GbEc7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ29HOzs7QUFHcEc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsbUVBQVU7QUFDWixFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxtRUFBVTtBQUNiLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7O0FBR0Esd0VBQWU7QUFDZjtBQUNBLG1FQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQ2FsZW5kZXIvLi9zcmMvd2VhdGhlci9jcmVhdGVXZWF0aGVyQmFyLmpzIiwid2VicGFjazovL0NhbGVuZGVyLy4vc3JjL3dlYXRoZXIvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9DYWxlbmRlci8uL3NyYy93ZWF0aGVyL3dlYXRoZXJEaXNwbGF5LmpzIiwid2VicGFjazovL0NhbGVuZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NhbGVuZGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9DYWxlbmRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0NhbGVuZGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQ2FsZW5kZXIvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVXZWF0aGVyQm94KGFycmF5LCBhbW91bnQsIHVuaXQpIHtcblx0Ly8gQyA9IENlbHNpdXMgICAgICBGID0gRmFocmVuaGVpdFxuXG5cdC8vIGNyZWF0ZSB3ZWF0aGVyIGJveFxuXHRjb25zdCB3ZWF0aGVyQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0d2VhdGhlckJhci5pZCA9IFwid2VhdGhlckJhclwiO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50OyBpKyspIHtcblx0XHRjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGJveC5jbGFzc05hbWUgPSBcIndlYXRoZXJCb3hcIjtcblxuXHRcdGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRjb25zdCBvcHRpb24gPSB7IG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnfTtcblx0XHRkYXRlLmlubmVyVGV4dCA9IGFycmF5W2ldLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2VuLUdCJywgb3B0aW9uKTtcblx0XHRib3guYXBwZW5kQ2hpbGQoZGF0ZSk7XG5cblx0XHRjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdGltZy5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgYXJyYXlbaV0uaWNvbiArIFwiLnBuZ1wiO1xuXHRcdGJveC5hcHBlbmRDaGlsZChpbWcpO1xuXG5cdFx0Y29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdHRlbXAuaW5uZXJUZXh0ID1cblx0XHRcdHVuaXRDb252ZXJ0KGFycmF5W2ldLm1heFRlbXAsIHVuaXQpICtcblx0XHRcdFwiIC0gXCIgK1xuXHRcdFx0dW5pdENvbnZlcnQoYXJyYXlbaV0ubWluVGVtcCwgdW5pdCkgK1xuXHRcdFx0dW5pdDtcblxuXHRcdGJveC5hcHBlbmRDaGlsZCh0ZW1wKTtcblxuXHRcdGNvbnN0IHdlYXRoZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHR3ZWF0aGVyLmlubmVyVGV4dCA9IGFycmF5W2ldLndlYXRoZXI7XG5cdFx0Ym94LmFwcGVuZENoaWxkKHdlYXRoZXIpO1xuXG5cdFx0d2VhdGhlckJhci5hcHBlbmRDaGlsZChib3gpO1xuXHR9XG5cblx0cmV0dXJuIHdlYXRoZXJCYXI7XG59XG5cbmZ1bmN0aW9uIHVuaXRDb252ZXJ0KHRlbXAsIHVuaXQpIHtcblx0Ly8gY29udmVydCBmcm9tIGtlbHZpbiB0byBDIG9yIEZcblx0Ly8gSyAtIEMgKEsg4oiSIDI3My4xNSlcblx0Ly8gSyAtIEYgKChLIOKIkiAyNzMuMTUpIMOXIDkvNSArIDMyKVxuXG5cdGxldCBhbnN3ZXIgPSB0ZW1wO1xuXG5cdGlmICh1bml0LnRvTG93ZXJDYXNlKCkgPT0gXCJjXCIpIHtcblx0XHRhbnN3ZXIgPSBhbnN3ZXIgLSAyNzMuMTU7XG5cdH0gZWxzZSBpZiAodW5pdC50b0xvd2VyQ2FzZSgpID09IFwiZlwiKSB7XG5cdFx0YW5zd2VyID0gKGFuc3dlciAtIDI3My4xNSkgKiAoOSAvIDUpICsgMzI7XG5cdH1cblxuXHRyZXR1cm4gYW5zd2VyLnRvRml4ZWQoMSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlYXJjaEJhcigpIHtcblx0Ly8gY3JlYXRlIGRvbSB0byBkaXNwbGF5IGRhdGFcblx0Y29uc3Qgd0JhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlclwiKTtcblxuXHQvLyBjcmVhdGUgc2VhcmNoIGJhclxuXHRjb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRzZWFyY2hCYXIuY2xhc3NOYW1lID0gXCJzZWFyY2hCYXJcIjtcblxuXHRjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIilcblxuXHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0aW5wdXQudHlwZSA9IFwidGV4dFwiO1xuXHRpbnB1dC5pZCA9IFwiY2l0eVwiO1xuXHRpbnB1dC5kZWZhdWx0VmFsdWUgPSBcInNoZW56aGVuXCI7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChpbnB1dCk7XG5cblx0Y29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0c2VhcmNoLmlkID0gXCJ0ZXN0XCI7XG5cdHNlYXJjaC5pbm5lclRleHQgPSBcIkdPXCI7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChzZWFyY2gpO1xuXG5cdC8vIC0tLS0tLS1cblxuXHRcblx0Y29uc3QgZmFocmVuaGVpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0ZmFocmVuaGVpdC50eXBlID0gXCJyYWRpb1wiO1xuXHRmYWhyZW5oZWl0Lm5hbWUgPSBcInVuaXRcIjtcblx0ZmFocmVuaGVpdC52YWx1ZSA9IFwiZlwiO1xuXHRmYWhyZW5oZWl0LmlkID0gXCJmXCI7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChmYWhyZW5oZWl0KTtcblxuXHRjb25zdCBsYWJlbEYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cdGxhYmVsRi5pbm5lclRleHQgPSBcImZhaHJlbmhlaXRcIjtcblx0c2VhcmNoQmFyLmFwcGVuZENoaWxkKGxhYmVsRik7XG5cblx0Y29uc3QgY2Vsc2l1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0Y2Vsc2l1cy50eXBlID0gXCJyYWRpb1wiO1xuXHRjZWxzaXVzLm5hbWUgPSBcInVuaXRcIjtcblx0Y2Vsc2l1cy52YWx1ZSA9IFwiY1wiO1xuXHRjZWxzaXVzLmlkID0gXCJjXCI7XG5cdGNlbHNpdXMuY2hlY2tlZCA9IHRydWU7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChjZWxzaXVzKTtcblxuXHRjb25zdCBsYWJlbEMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cdGxhYmVsQy5pbm5lclRleHQgPSBcImNlbHNpdXNcIjtcblx0c2VhcmNoQmFyLmFwcGVuZENoaWxkKGxhYmVsQyk7XG5cblxuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cdHdCYXIuYXBwZW5kQ2hpbGQoc2VhcmNoQmFyKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlU2VhcmNoQmFyLCBjcmVhdGVXZWF0aGVyQm94IH07XG4iLCJcbi8vIGdvb2dsZSBhcGkga2V5IEFJemFTeUF6ZVFxTkZUTEJvUE1oQ1pzLVh0R2lsRVJmdEhmd2hZTVxuLy8gb3cgYXBpICAgICAgICAgM2Y3OWY4OTZlOTdjZmU0OTdjMDQ5Nzk0MWRjN2E0MmZcbi8vIGdpcGh5ICAgICAgICAgIE5FRDdGczlCa01ub1NEdFJxRHZRQzJ0OUhkSXdIUUd3XG5cblxuXG5hc3luYyBmdW5jdGlvbiBnZXRKU09OKGFwaSl7XG4gICAgdHJ5e1xuICAgICAgICBjb25zdCBnZXQgPSBhd2FpdCBmZXRjaChhcGkpO1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBnZXQuanNvbihhcGkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfWNhdGNoKGUpe1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBnZXRKU09OO1xuXG4iLCIvLyBtYW5pcHVsYXRlIGpzb24gZGF0YVxuXG5pbXBvcnQgZ2V0SlNPTiBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5pbXBvcnQgeyBjcmVhdGVXZWF0aGVyQm94LCBjcmVhdGVTZWFyY2hCYXIgfSBmcm9tIFwiLi9jcmVhdGVXZWF0aGVyQmFyXCI7XG5cbi8vIGpzb24gY29udGFpbiA1IHJlY29yZHMgZnJvbSBhIHNpbmdsZSBkYXlcbi8vIEkgd2FudCAxIHJlY29yZCBwZXIgZGF5XG5mdW5jdGlvbiBnZXRVbmlxdWVkYXRlKGFycmF5KSB7XG5cdGxldCBkYXRlID0gW107XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBwdXNoID0gdHJ1ZTtcblx0XHRsZXQgY2hlY2tkYXRlID0gbmV3IERhdGUoYXJyYXlbaV0uZHRfdHh0KTtcblxuXHRcdGZvciAobGV0IHggPSAwOyB4IDwgZGF0ZS5sZW5ndGg7IHgrKykge1xuXHRcdFx0aWYgKGNoZWNrZGF0ZS5nZXREYXRlKCkgPT0gZ2V0V2VhdGhlckRhdGVUeXBlKGRhdGVbeF0pLmdldERhdGUoKSkge1xuXHRcdFx0XHRwdXNoID0gZmFsc2U7XG5cdFx0XHRcdHggPSBkYXRlLmxlbmd0aCArIDE7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHB1c2gpIHtcblx0XHRcdGRhdGUucHVzaChhcnJheVtpXSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGU7XG59XG5cbmZ1bmN0aW9uIGdldFdlYXRoZXJEYXRlVHlwZShvYmplY3QpIHtcblx0cmV0dXJuIG5ldyBEYXRlKG9iamVjdC5kdF90eHQpO1xufVxuXG5mdW5jdGlvbiBnZXRXZWF0aGVyVXJsKG9iamVjdCkge1xuXHRjb25zdCB1cmwgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiO1xuXHRyZXR1cm4gdXJsICsgb2JqZWN0LndlYXRoZXIuaWNvbjtcbn1cblxuZnVuY3Rpb24gZ2V0V2VhdGhlcihwbGFjZSkge1xuXHRsZXQgYXBpID1cblx0XHRcImh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9XCIgK1xuXHRcdHBsYWNlICtcblx0XHRcIiZhcHBpZD0zZjc5Zjg5NmU5N2NmZTQ5N2MwNDk3OTQxZGM3YTQyZlwiO1xuXHRyZXR1cm4gZ2V0SlNPTihhcGkpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5Rm9yZWNhc3QoYXJyYXksIHVuaXQpIHtcblx0bGV0IGRhdGEgPSBnZXRVbmlxdWVkYXRlKGFycmF5KTtcblx0bGV0IG9iamVjdEFycmF5ID0gW107XG5cblx0Ly8gbG9hZCBkYXRhIGludG8gYW4gb2JqZWN0XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG5cdFx0bGV0IHdlYXRoZXIgPSB7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShkYXRhW2ldLmR0X3R4dCksXG5cdFx0XHRpY29uOiBkYXRhW2ldLndlYXRoZXJbMF0uaWNvbixcblx0XHRcdG1heFRlbXA6IGRhdGFbaV0ubWFpbi50ZW1wX21heCxcblx0XHRcdG1pblRlbXA6IGRhdGFbaV0ubWFpbi50ZW1wX21pbixcblx0XHRcdHdlYXRoZXI6IGRhdGFbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcblx0XHR9O1xuXHRcdG9iamVjdEFycmF5LnB1c2god2VhdGhlcik7XG5cdH1cblxuXHRjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyXCIpO1xuXHRjb25zdCBiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXJCYXJcIik7XG5cblx0aWYgKGJhciAhPSBudWxsKSB7XG5cdFx0YmFyLnJlbW92ZSgpO1xuXHR9XG5cblx0Ym9keS5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQm94KG9iamVjdEFycmF5LCBvYmplY3RBcnJheS5sZW5ndGgsIHVuaXQpKTtcbn1cblxuZnVuY3Rpb24gZmV0Y2hFdmVudChfY2l0eSwgdW5pdCkge1xuXHRnZXRXZWF0aGVyKFN0cmluZyhfY2l0eSkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYgKHJlc3BvbnNlLmNvZCA9PSBcIjIwMFwiKSB7XG5cdFx0XHRjb25zdCBhcnJheSA9IHJlc3BvbnNlLmxpc3Q7XG5cdFx0XHRkaXNwbGF5Rm9yZWNhc3QoYXJyYXksIHVuaXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbGVydChyZXNwb25zZS5tZXNzYWdlKTtcblx0XHR9XG5cdH0pO1xufVxuXG5leHBvcnQgeyBnZXRVbmlxdWVkYXRlLCBnZXRXZWF0aGVyVXJsLCBkaXNwbGF5Rm9yZWNhc3QsIGdldFdlYXRoZXIgLCBjcmVhdGVTZWFyY2hCYXIsIGZldGNoRXZlbnR9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL2ltcG9ydCAnLi9nbG9iYWwuY3NzJztcbmltcG9ydCB7IGdldFdlYXRoZXIsIGRpc3BsYXlGb3JlY2FzdCwgY3JlYXRlU2VhcmNoQmFyLCBmZXRjaEV2ZW50IH0gZnJvbSBcIi4vd2VhdGhlci93ZWF0aGVyRGlzcGxheVwiO1xuXG5cbmZ1bmN0aW9uIHJlYWRDaXR5KCkge1xuXHRsZXQgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXN0XCIpO1xuXHRsZXQgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eVwiKTtcblxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRsZXQgdW5pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSd1bml0J106Y2hlY2tlZFwiKTtcblx0XHRjb25zb2xlLmxvZyh1bml0LnZhbHVlKTtcblx0XHRmZXRjaEV2ZW50KGNpdHkudmFsdWUsIHVuaXQudmFsdWUpO1xuXHR9KTtcblxuXHRsZXQgcmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbmFtZT0ndW5pdCddXCIpO1xuXHRyYWRpby5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9Pntcblx0XHRcdGxldCB1bml0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3VuaXQnXTpjaGVja2VkXCIpO1xuXHRcdFx0ZmV0Y2hFdmVudChjaXR5LnZhbHVlLCB1bml0LnZhbHVlKTtcblx0XHR9KTtcblx0fSk7XG5cblx0XG5cdFxufVxuXG5cbmNyZWF0ZVNlYXJjaEJhcigpO1xucmVhZENpdHkoKTtcbmZldGNoRXZlbnQoXCJzaGVuemhlblwiLFwiY1wiKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9