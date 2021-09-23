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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFNkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRzdDO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxzQ0FBc0MsYUFBYTtBQUNuRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7OztBQUdBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQnZCOztBQUVnQztBQUN1Qzs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBTztBQUNmOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsbUVBQWdCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFa0c7Ozs7Ozs7VUNuRmxHO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNvRzs7O0FBR3BHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG1FQUFVO0FBQ1osRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsbUVBQVU7QUFDYixHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7OztBQUdBLHdFQUFlO0FBQ2Y7QUFDQSxtRUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL0NhbGVuZGVyLy4vc3JjL3dlYXRoZXIvY3JlYXRlV2VhdGhlckJhci5qcyIsIndlYnBhY2s6Ly9DYWxlbmRlci8uL3NyYy93ZWF0aGVyL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vQ2FsZW5kZXIvLi9zcmMvd2VhdGhlci93ZWF0aGVyRGlzcGxheS5qcyIsIndlYnBhY2s6Ly9DYWxlbmRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9DYWxlbmRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQ2FsZW5kZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9DYWxlbmRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0NhbGVuZGVyLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlV2VhdGhlckJveChhcnJheSwgYW1vdW50LCB1bml0KSB7XG5cdC8vIEMgPSBDZWxzaXVzICAgICAgRiA9IEZhaHJlbmhlaXRcblxuXHQvLyBjcmVhdGUgd2VhdGhlciBib3hcblx0Y29uc3Qgd2VhdGhlckJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdHdlYXRoZXJCYXIuaWQgPSBcIndlYXRoZXJCYXJcIjtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKSB7XG5cdFx0Y29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRib3guY2xhc3NOYW1lID0gXCJ3ZWF0aGVyQm94XCI7XG5cblx0XHRjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0Y29uc3Qgb3B0aW9uID0geyBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJ307XG5cdFx0ZGF0ZS5pbm5lclRleHQgPSBhcnJheVtpXS5kYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1HQicsIG9wdGlvbik7XG5cdFx0Ym94LmFwcGVuZENoaWxkKGRhdGUpO1xuXG5cdFx0Y29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHRpbWcuc3JjID0gXCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArIGFycmF5W2ldLmljb24gKyBcIi5wbmdcIjtcblx0XHRib3guYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHR0ZW1wLmlubmVyVGV4dCA9XG5cdFx0XHR1bml0Q29udmVydChhcnJheVtpXS5tYXhUZW1wLCB1bml0KSArXG5cdFx0XHRcIiAtIFwiICtcblx0XHRcdHVuaXRDb252ZXJ0KGFycmF5W2ldLm1pblRlbXAsIHVuaXQpICtcblx0XHRcdHVuaXQ7XG5cblx0XHRib3guYXBwZW5kQ2hpbGQodGVtcCk7XG5cblx0XHRjb25zdCB3ZWF0aGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0d2VhdGhlci5pbm5lclRleHQgPSBhcnJheVtpXS53ZWF0aGVyO1xuXHRcdGJveC5hcHBlbmRDaGlsZCh3ZWF0aGVyKTtcblxuXHRcdHdlYXRoZXJCYXIuYXBwZW5kQ2hpbGQoYm94KTtcblx0fVxuXG5cdHJldHVybiB3ZWF0aGVyQmFyO1xufVxuXG5mdW5jdGlvbiB1bml0Q29udmVydCh0ZW1wLCB1bml0KSB7XG5cdC8vIGNvbnZlcnQgZnJvbSBrZWx2aW4gdG8gQyBvciBGXG5cdC8vIEsgLSBDIChLIOKIkiAyNzMuMTUpXG5cdC8vIEsgLSBGICgoSyDiiJIgMjczLjE1KSDDlyA5LzUgKyAzMilcblxuXHRsZXQgYW5zd2VyID0gdGVtcDtcblxuXHRpZiAodW5pdC50b0xvd2VyQ2FzZSgpID09IFwiY1wiKSB7XG5cdFx0YW5zd2VyID0gYW5zd2VyIC0gMjczLjE1O1xuXHR9IGVsc2UgaWYgKHVuaXQudG9Mb3dlckNhc2UoKSA9PSBcImZcIikge1xuXHRcdGFuc3dlciA9IChhbnN3ZXIgLSAyNzMuMTUpICogKDkgLyA1KSArIDMyO1xuXHR9XG5cblx0cmV0dXJuIGFuc3dlci50b0ZpeGVkKDEpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZWFyY2hCYXIoKSB7XG5cdC8vIGNyZWF0ZSBkb20gdG8gZGlzcGxheSBkYXRhXG5cdGNvbnN0IHdCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXJcIik7XG5cblx0Ly8gY3JlYXRlIHNlYXJjaCBiYXJcblx0Y29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0c2VhcmNoQmFyLmNsYXNzTmFtZSA9IFwic2VhcmNoQmFyXCI7XG5cblx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpXG5cblx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGlucHV0LnR5cGUgPSBcInRleHRcIjtcblx0aW5wdXQuaWQgPSBcImNpdHlcIjtcblx0aW5wdXQuZGVmYXVsdFZhbHVlID0gXCJzaGVuemhlblwiO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG5cdGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdHNlYXJjaC5pZCA9IFwidGVzdFwiO1xuXHRzZWFyY2guaW5uZXJUZXh0ID0gXCJHT1wiO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoc2VhcmNoKTtcblxuXHQvLyAtLS0tLS0tXG5cblx0XG5cdGNvbnN0IGZhaHJlbmhlaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGZhaHJlbmhlaXQudHlwZSA9IFwicmFkaW9cIjtcblx0ZmFocmVuaGVpdC5uYW1lID0gXCJ1bml0XCI7XG5cdGZhaHJlbmhlaXQudmFsdWUgPSBcImZcIjtcblx0ZmFocmVuaGVpdC5pZCA9IFwiZlwiO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoZmFocmVuaGVpdCk7XG5cblx0Y29uc3QgbGFiZWxGID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXHRsYWJlbEYuaW5uZXJUZXh0ID0gXCJmYWhyZW5oZWl0XCI7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChsYWJlbEYpO1xuXG5cdGNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGNlbHNpdXMudHlwZSA9IFwicmFkaW9cIjtcblx0Y2Vsc2l1cy5uYW1lID0gXCJ1bml0XCI7XG5cdGNlbHNpdXMudmFsdWUgPSBcImNcIjtcblx0Y2Vsc2l1cy5pZCA9IFwiY1wiO1xuXHRjZWxzaXVzLmNoZWNrZWQgPSB0cnVlO1xuXHRzZWFyY2hCYXIuYXBwZW5kQ2hpbGQoY2Vsc2l1cyk7XG5cblx0Y29uc3QgbGFiZWxDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXHRsYWJlbEMuaW5uZXJUZXh0ID0gXCJjZWxzaXVzXCI7XG5cdHNlYXJjaEJhci5hcHBlbmRDaGlsZChsYWJlbEMpO1xuXG5cblx0c2VhcmNoQmFyLmFwcGVuZENoaWxkKGZvcm0pO1xuXHR3QmFyLmFwcGVuZENoaWxkKHNlYXJjaEJhcik7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVNlYXJjaEJhciwgY3JlYXRlV2VhdGhlckJveCB9O1xuIiwiXG4vLyBnb29nbGUgYXBpIGtleSBBSXphU3lBemVRcU5GVExCb1BNaENacy1YdEdpbEVSZnRIZndoWU1cbi8vIG93IGFwaSAgICAgICAgIDNmNzlmODk2ZTk3Y2ZlNDk3YzA0OTc5NDFkYzdhNDJmXG4vLyBnaXBoeSAgICAgICAgICBORUQ3RnM5QmtNbm9TRHRScUR2UUMydDlIZEl3SFFHd1xuXG5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SlNPTihhcGkpe1xuICAgIHRyeXtcbiAgICAgICAgY29uc3QgZ2V0ID0gYXdhaXQgZmV0Y2goYXBpLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGdldC5qc29uKGFwaSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGdldEpTT047XG5cbiIsIi8vIG1hbmlwdWxhdGUganNvbiBkYXRhXG5cbmltcG9ydCBnZXRKU09OIGZyb20gXCIuL3JlcXVlc3RcIjtcbmltcG9ydCB7IGNyZWF0ZVdlYXRoZXJCb3gsIGNyZWF0ZVNlYXJjaEJhciB9IGZyb20gXCIuL2NyZWF0ZVdlYXRoZXJCYXJcIjtcblxuLy8ganNvbiBjb250YWluIDUgcmVjb3JkcyBmcm9tIGEgc2luZ2xlIGRheVxuLy8gSSB3YW50IDEgcmVjb3JkIHBlciBkYXlcbmZ1bmN0aW9uIGdldFVuaXF1ZWRhdGUoYXJyYXkpIHtcblx0bGV0IGRhdGUgPSBbXTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IHB1c2ggPSB0cnVlO1xuXHRcdGxldCBjaGVja2RhdGUgPSBuZXcgRGF0ZShhcnJheVtpXS5kdF90eHQpO1xuXG5cdFx0Zm9yIChsZXQgeCA9IDA7IHggPCBkYXRlLmxlbmd0aDsgeCsrKSB7XG5cdFx0XHRpZiAoY2hlY2tkYXRlLmdldERhdGUoKSA9PSBnZXRXZWF0aGVyRGF0ZVR5cGUoZGF0ZVt4XSkuZ2V0RGF0ZSgpKSB7XG5cdFx0XHRcdHB1c2ggPSBmYWxzZTtcblx0XHRcdFx0eCA9IGRhdGUubGVuZ3RoICsgMTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAocHVzaCkge1xuXHRcdFx0ZGF0ZS5wdXNoKGFycmF5W2ldKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0ZTtcbn1cblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGVUeXBlKG9iamVjdCkge1xuXHRyZXR1cm4gbmV3IERhdGUob2JqZWN0LmR0X3R4dCk7XG59XG5cbmZ1bmN0aW9uIGdldFdlYXRoZXJVcmwob2JqZWN0KSB7XG5cdGNvbnN0IHVybCA9IFwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCI7XG5cdHJldHVybiB1cmwgKyBvYmplY3Qud2VhdGhlci5pY29uO1xufVxuXG5mdW5jdGlvbiBnZXRXZWF0aGVyKHBsYWNlKSB7XG5cdGxldCBhcGkgPVxuXHRcdFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT1cIiArXG5cdFx0cGxhY2UgK1xuXHRcdFwiJmFwcGlkPTNmNzlmODk2ZTk3Y2ZlNDk3YzA0OTc5NDFkYzdhNDJmXCI7XG5cdHJldHVybiBnZXRKU09OKGFwaSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlGb3JlY2FzdChhcnJheSwgdW5pdCkge1xuXHRsZXQgZGF0YSA9IGdldFVuaXF1ZWRhdGUoYXJyYXkpO1xuXHRsZXQgb2JqZWN0QXJyYXkgPSBbXTtcblxuXHQvLyBsb2FkIGRhdGEgaW50byBhbiBvYmplY3Rcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcblx0XHRsZXQgd2VhdGhlciA9IHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKGRhdGFbaV0uZHRfdHh0KSxcblx0XHRcdGljb246IGRhdGFbaV0ud2VhdGhlclswXS5pY29uLFxuXHRcdFx0bWF4VGVtcDogZGF0YVtpXS5tYWluLnRlbXBfbWF4LFxuXHRcdFx0bWluVGVtcDogZGF0YVtpXS5tYWluLnRlbXBfbWluLFxuXHRcdFx0d2VhdGhlcjogZGF0YVtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuXHRcdH07XG5cdFx0b2JqZWN0QXJyYXkucHVzaCh3ZWF0aGVyKTtcblx0fVxuXG5cdGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXJcIik7XG5cdGNvbnN0IGJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlckJhclwiKTtcblxuXHRpZiAoYmFyICE9IG51bGwpIHtcblx0XHRiYXIucmVtb3ZlKCk7XG5cdH1cblxuXHRib2R5LmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJCb3gob2JqZWN0QXJyYXksIG9iamVjdEFycmF5Lmxlbmd0aCwgdW5pdCkpO1xufVxuXG5mdW5jdGlvbiBmZXRjaEV2ZW50KF9jaXR5LCB1bml0KSB7XG5cdGdldFdlYXRoZXIoU3RyaW5nKF9jaXR5KSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRpZiAocmVzcG9uc2UuY29kID09IFwiMjAwXCIpIHtcblx0XHRcdGNvbnN0IGFycmF5ID0gcmVzcG9uc2UubGlzdDtcblx0XHRcdGRpc3BsYXlGb3JlY2FzdChhcnJheSwgdW5pdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFsZXJ0KHJlc3BvbnNlLm1lc3NhZ2UpO1xuXHRcdH1cblx0fSk7XG59XG5cbmV4cG9ydCB7IGdldFVuaXF1ZWRhdGUsIGdldFdlYXRoZXJVcmwsIGRpc3BsYXlGb3JlY2FzdCwgZ2V0V2VhdGhlciAsIGNyZWF0ZVNlYXJjaEJhciwgZmV0Y2hFdmVudH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vaW1wb3J0ICcuL2dsb2JhbC5jc3MnO1xuaW1wb3J0IHsgZ2V0V2VhdGhlciwgZGlzcGxheUZvcmVjYXN0LCBjcmVhdGVTZWFyY2hCYXIsIGZldGNoRXZlbnQgfSBmcm9tIFwiLi93ZWF0aGVyL3dlYXRoZXJEaXNwbGF5XCI7XG5cblxuZnVuY3Rpb24gcmVhZENpdHkoKSB7XG5cdGxldCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlc3RcIik7XG5cdGxldCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5XCIpO1xuXG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGxldCB1bml0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3VuaXQnXTpjaGVja2VkXCIpO1xuXHRcdGNvbnNvbGUubG9nKHVuaXQudmFsdWUpO1xuXHRcdGZldGNoRXZlbnQoY2l0eS52YWx1ZSwgdW5pdC52YWx1ZSk7XG5cdH0pO1xuXG5cdGxldCByYWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtuYW1lPSd1bml0J11cIik7XG5cdHJhZGlvLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+e1xuXHRcdFx0bGV0IHVuaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0ndW5pdCddOmNoZWNrZWRcIik7XG5cdFx0XHRmZXRjaEV2ZW50KGNpdHkudmFsdWUsIHVuaXQudmFsdWUpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRcblx0XG59XG5cblxuY3JlYXRlU2VhcmNoQmFyKCk7XG5yZWFkQ2l0eSgpO1xuZmV0Y2hFdmVudChcInNoZW56aGVuXCIsXCJjXCIpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=