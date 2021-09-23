// manipulate json data

import getJSON from "./request";
import { createWeatherBox, createSearchBar } from "./createWeatherBar";

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
	return getJSON(api);
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

	body.appendChild(createWeatherBox(objectArray, objectArray.length, unit));
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

export { getUniquedate, getWeatherUrl, displayForecast, getWeather , createSearchBar, fetchEvent};
