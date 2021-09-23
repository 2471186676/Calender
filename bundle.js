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
        const get = await fetch(api, {mode: 'cors'});
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
		"https://api.openweathermap.org/data/2.5/forecast?q=" +
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFNkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRzdDO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxzQ0FBc0MsYUFBYTtBQUNuRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7OztBQUdBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQnZCOztBQUVnQztBQUN1Qzs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBTztBQUNmOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsbUVBQWdCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFa0c7Ozs7Ozs7VUNuRmxHO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNvRzs7O0FBR3BHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG1FQUFVO0FBQ1osRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsbUVBQVU7QUFDYixHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7OztBQUdBLHdFQUFlO0FBQ2Y7QUFDQSxtRUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL0NhbGVuZGVyLy4vc3JjL3dlYXRoZXIvY3JlYXRlV2VhdGhlckJhci5qcyIsIndlYnBhY2s6Ly9DYWxlbmRlci8uL3NyYy93ZWF0aGVyL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vQ2FsZW5kZXIvLi9zcmMvd2VhdGhlci93ZWF0aGVyRGlzcGxheS5qcyIsIndlYnBhY2s6Ly9DYWxlbmRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9DYWxlbmRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQ2FsZW5kZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9DYWxlbmRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0NhbGVuZGVyLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlV2VhdGhlckJveChhcnJheSwgYW1vdW50LCB1bml0KSB7XG5cdC8vIEMgPSBDZWxzaXVzICAgICAgRiA9IEZhaHJlbmhlaXRcblxuXHQvLyBjcmVhdGUgd2VhdGhlciBib3hcblx0Y29uc3Qgd2VhdGhlckJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdHdlYXRoZXJCYXIuaWQgPSBcIndlYXRoZXJCYXJcIjtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKSB7XG5cdFx0Y29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRib3guY2xhc3NOYW1lID0gXCJ3ZWF0aGVyQm94XCI7XG5cblx0XHRjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0Y29uc3Qgb3B0aW9uID0geyBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJ307XG5cdFx0ZGF0ZS5pbm5lclRleHQgPSBhcnJheVtpXS5kYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1HQicsIG9wdGlvbik7XG5cdFx0Ym94LmFwcGVuZENoaWxkKGRhdGUpO1xuXG5cdFx0Y29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHRpbWcuc3JjID0gXCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArIGFycmF5W2ldLmljb24gKyBcIi5wbmdcIjtcblx0XHRib3guYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHR0ZW1wLmlubmVyVGV4dCA9XG5cdFx0XHR1bml0Q29udmVydChhcnJheVtpXS5tYXhUZW1wLCB1bml0KSArXG5cdFx0XHRcIiAtIFwiICtcblx0XHRcdHVuaXRDb252ZXJ0KGFycmF5W2ldLm1pblRlbXAsIHVuaXQpICtcblx0XHRcdHVuaXQ7XG5cblx0XHRib3guYXBwZW5kQ2hpbGQodGVtcCk7XG5cblx0XHRjb25zdCB3ZWF0aGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0d2VhdGhlci5pbm5lclRleHQgPSBhcnJheVtpXS53ZWF0aGVyO1xuXHRcdGJveC5hcHBlbmRDaGlsZCh3ZWF0aGVyKTtcblxuXHRcdHdlYXRoZXJCYXIuYXBwZW5kQ2hpbGQoYm94KTtcblx0fVxuXG5cdHJldHVybiB3ZWF0aGVyQmFyO1xufVxuXG5mdW5jdGlvbiB1bml0Q29udmVydCh0ZW1wLCB1bml0KSB7XG5cdC8vIGNvbnZlcnQgZnJvbSBrZWx2aW4gdG8gQyBvciBGXG5cdC8vIEsgLSBDIChLIOKIkiAyNzMuMTUpXG5cdC8vIEsgLSBGICgoSyDiiJIgMjczLjE1KSDDlyA5LzUgKyAzMilcblxuXHRsZXQgYW5zd2VyID0gdGVtcDtcblxuXHRpZiAodW5pdC50b0xvd2VyQ2FzZSgpID09IFwiY1wiKSB7XG5cdFx0YW5zd2VyID0gYW5zd2VyIC0gMjczLjE1O1xuXHR9IGVsc2UgaWYgKHVuaXQudG9Mb3dlckNhc2UoKSA9PSBcImZcIikge1xuXHRcdGFuc3dlciA9IChhbnN3ZXIgLSAyNzMuMTUpICogKDkgLyA1KSArIDMyO1xuXHR9XG5cblx0cmV0dXJuIGFuc3dlci50b0ZpeGVkKDEpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZWFyY2hCYXIoKSB7XG5cdC8vIGNyZWF0ZSBkb20gdG8gZGlzcGxheSBkYXRhXG5cdGNvbnN0IHdCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXJcIik7XG5cblx0Ly8gY3JlYXRlIHNlYXJjaCBiYXJcblx0Y29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0c2VhcmNoQmFyLmNsYXNzTmFtZSA9IFwic2VhcmNoQmFyXCI7XG5cblx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpXG5cblx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGlucHV0LnR5cGUgPSBcInRleHRcIjtcblx0aW5wdXQuaWQgPSBcImNpdHlcIjtcblx0aW5wdXQuZGVmYXVsdFZhbHVlID0gXCJzaGVuemhlblwiO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG5cdGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdHNlYXJjaC5pZCA9IFwidGVzdFwiO1xuXHRzZWFyY2guaW5uZXJUZXh0ID0gXCJHT1wiO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoc2VhcmNoKTtcblxuXHQvLyAtLS0tLS0tXG5cblx0XG5cdGNvbnN0IGZhaHJlbmhlaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGZhaHJlbmhlaXQudHlwZSA9IFwicmFkaW9cIjtcblx0ZmFocmVuaGVpdC5uYW1lID0gXCJ1bml0XCI7XG5cdGZhaHJlbmhlaXQudmFsdWUgPSBcImZcIjtcblx0ZmFocmVuaGVpdC5pZCA9IFwiZlwiO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoZmFocmVuaGVpdCk7XG5cblx0Y29uc3QgbGFiZWxGID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXHRsYWJlbEYuaW5uZXJUZXh0ID0gXCJmYWhyZW5oZWl0XCI7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChsYWJlbEYpO1xuXG5cdGNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGNlbHNpdXMudHlwZSA9IFwicmFkaW9cIjtcblx0Y2Vsc2l1cy5uYW1lID0gXCJ1bml0XCI7XG5cdGNlbHNpdXMudmFsdWUgPSBcImNcIjtcblx0Y2Vsc2l1cy5pZCA9IFwiY1wiO1xuXHRjZWxzaXVzLmNoZWNrZWQgPSB0cnVlO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoY2Vsc2l1cyk7XG5cblx0Y29uc3QgbGFiZWxDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXHRsYWJlbEMuaW5uZXJUZXh0ID0gXCJjZWxzaXVzXCI7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChsYWJlbEMpO1xuXG5cblx0c2VhcmNoQmFyLmFwcGVuZENoaWxkKGZvcm0pO1xuXHR3QmFyLmFwcGVuZENoaWxkKHNlYXJjaEJhcik7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVNlYXJjaEJhciwgY3JlYXRlV2VhdGhlckJveCB9O1xuIiwiXG4vLyBnb29nbGUgYXBpIGtleSBBSXphU3lBemVRcU5GVExCb1BNaENacy1YdEdpbEVSZnRIZndoWU1cbi8vIG93IGFwaSAgICAgICAgIDNmNzlmODk2ZTk3Y2ZlNDk3YzA0OTc5NDFkYzdhNDJmXG4vLyBnaXBoeSAgICAgICAgICBORUQ3RnM5QmtNbm9TRHRScUR2UUMydDlIZEl3SFFHd1xuXG5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SlNPTihhcGkpe1xuICAgIHRyeXtcbiAgICAgICAgY29uc3QgZ2V0ID0gYXdhaXQgZmV0Y2goYXBpLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGdldC5qc29uKGFwaSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGdldEpTT047XG5cbiIsIi8vIG1hbmlwdWxhdGUganNvbiBkYXRhXG5cbmltcG9ydCBnZXRKU09OIGZyb20gXCIuL3JlcXVlc3RcIjtcbmltcG9ydCB7IGNyZWF0ZVdlYXRoZXJCb3gsIGNyZWF0ZVNlYXJjaEJhciB9IGZyb20gXCIuL2NyZWF0ZVdlYXRoZXJCYXJcIjtcblxuLy8ganNvbiBjb250YWluIDUgcmVjb3JkcyBmcm9tIGEgc2luZ2xlIGRheVxuLy8gSSB3YW50IDEgcmVjb3JkIHBlciBkYXlcbmZ1bmN0aW9uIGdldFVuaXF1ZWRhdGUoYXJyYXkpIHtcblx0bGV0IGRhdGUgPSBbXTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IHB1c2ggPSB0cnVlO1xuXHRcdGxldCBjaGVja2RhdGUgPSBuZXcgRGF0ZShhcnJheVtpXS5kdF90eHQpO1xuXG5cdFx0Zm9yIChsZXQgeCA9IDA7IHggPCBkYXRlLmxlbmd0aDsgeCsrKSB7XG5cdFx0XHRpZiAoY2hlY2tkYXRlLmdldERhdGUoKSA9PSBnZXRXZWF0aGVyRGF0ZVR5cGUoZGF0ZVt4XSkuZ2V0RGF0ZSgpKSB7XG5cdFx0XHRcdHB1c2ggPSBmYWxzZTtcblx0XHRcdFx0eCA9IGRhdGUubGVuZ3RoICsgMTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAocHVzaCkge1xuXHRcdFx0ZGF0ZS5wdXNoKGFycmF5W2ldKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0ZTtcbn1cblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGVUeXBlKG9iamVjdCkge1xuXHRyZXR1cm4gbmV3IERhdGUob2JqZWN0LmR0X3R4dCk7XG59XG5cbmZ1bmN0aW9uIGdldFdlYXRoZXJVcmwob2JqZWN0KSB7XG5cdGNvbnN0IHVybCA9IFwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCI7XG5cdHJldHVybiB1cmwgKyBvYmplY3Qud2VhdGhlci5pY29uO1xufVxuXG5mdW5jdGlvbiBnZXRXZWF0aGVyKHBsYWNlKSB7XG5cdGxldCBhcGkgPVxuXHRcdFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9XCIgK1xuXHRcdHBsYWNlICtcblx0XHRcIiZhcHBpZD0zZjc5Zjg5NmU5N2NmZTQ5N2MwNDk3OTQxZGM3YTQyZlwiO1xuXHRyZXR1cm4gZ2V0SlNPTihhcGkpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5Rm9yZWNhc3QoYXJyYXksIHVuaXQpIHtcblx0bGV0IGRhdGEgPSBnZXRVbmlxdWVkYXRlKGFycmF5KTtcblx0bGV0IG9iamVjdEFycmF5ID0gW107XG5cblx0Ly8gbG9hZCBkYXRhIGludG8gYW4gb2JqZWN0XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG5cdFx0bGV0IHdlYXRoZXIgPSB7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShkYXRhW2ldLmR0X3R4dCksXG5cdFx0XHRpY29uOiBkYXRhW2ldLndlYXRoZXJbMF0uaWNvbixcblx0XHRcdG1heFRlbXA6IGRhdGFbaV0ubWFpbi50ZW1wX21heCxcblx0XHRcdG1pblRlbXA6IGRhdGFbaV0ubWFpbi50ZW1wX21pbixcblx0XHRcdHdlYXRoZXI6IGRhdGFbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcblx0XHR9O1xuXHRcdG9iamVjdEFycmF5LnB1c2god2VhdGhlcik7XG5cdH1cblxuXHRjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyXCIpO1xuXHRjb25zdCBiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXJCYXJcIik7XG5cblx0aWYgKGJhciAhPSBudWxsKSB7XG5cdFx0YmFyLnJlbW92ZSgpO1xuXHR9XG5cblx0Ym9keS5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQm94KG9iamVjdEFycmF5LCBvYmplY3RBcnJheS5sZW5ndGgsIHVuaXQpKTtcbn1cblxuZnVuY3Rpb24gZmV0Y2hFdmVudChfY2l0eSwgdW5pdCkge1xuXHRnZXRXZWF0aGVyKFN0cmluZyhfY2l0eSkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYgKHJlc3BvbnNlLmNvZCA9PSBcIjIwMFwiKSB7XG5cdFx0XHRjb25zdCBhcnJheSA9IHJlc3BvbnNlLmxpc3Q7XG5cdFx0XHRkaXNwbGF5Rm9yZWNhc3QoYXJyYXksIHVuaXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbGVydChyZXNwb25zZS5tZXNzYWdlKTtcblx0XHR9XG5cdH0pO1xufVxuXG5leHBvcnQgeyBnZXRVbmlxdWVkYXRlLCBnZXRXZWF0aGVyVXJsLCBkaXNwbGF5Rm9yZWNhc3QsIGdldFdlYXRoZXIgLCBjcmVhdGVTZWFyY2hCYXIsIGZldGNoRXZlbnR9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL2ltcG9ydCAnLi9nbG9iYWwuY3NzJztcbmltcG9ydCB7IGdldFdlYXRoZXIsIGRpc3BsYXlGb3JlY2FzdCwgY3JlYXRlU2VhcmNoQmFyLCBmZXRjaEV2ZW50IH0gZnJvbSBcIi4vd2VhdGhlci93ZWF0aGVyRGlzcGxheVwiO1xuXG5cbmZ1bmN0aW9uIHJlYWRDaXR5KCkge1xuXHRsZXQgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXN0XCIpO1xuXHRsZXQgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eVwiKTtcblxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRsZXQgdW5pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSd1bml0J106Y2hlY2tlZFwiKTtcblx0XHRjb25zb2xlLmxvZyh1bml0LnZhbHVlKTtcblx0XHRmZXRjaEV2ZW50KGNpdHkudmFsdWUsIHVuaXQudmFsdWUpO1xuXHR9KTtcblxuXHRsZXQgcmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbmFtZT0ndW5pdCddXCIpO1xuXHRyYWRpby5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9Pntcblx0XHRcdGxldCB1bml0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3VuaXQnXTpjaGVja2VkXCIpO1xuXHRcdFx0ZmV0Y2hFdmVudChjaXR5LnZhbHVlLCB1bml0LnZhbHVlKTtcblx0XHR9KTtcblx0fSk7XG5cblx0XG5cdFxufVxuXG5cbmNyZWF0ZVNlYXJjaEJhcigpO1xucmVhZENpdHkoKTtcbmZldGNoRXZlbnQoXCJzaGVuemhlblwiLFwiY1wiKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9