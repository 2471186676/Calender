// manipulate json data

import getJSON from "./request";
import { createWeatherBox, createSearchBar } from "./createWeatherBar";

// json contain 5 records from a single day
// I want 1 record per day
// also min and max temperature of each day
function getUniquedate(array) {
	let date = [];

	let current = 0;
	for (let uniqueDate = 0; uniqueDate < 5; uniqueDate++) {
		let condition = true;
		let thisDate = [];

		while (condition) {
			let currentDate = new Date(array[current].dt_txt).getDate();
			let nextDate = new Date(array[current + 1].dt_txt).getDate();

			if (currentDate == nextDate) {
				thisDate.push(array[current]);
			} else {
				condition = false;
			}
			current++;
		}

		let object = {
			date: new Date(thisDate[0].dt_txt),
			icon: thisDate[0].weather[0].icon,
			maxTemp: getMax(thisDate),
			minTemp: getMin(thisDate),
			weather: thisDate[0].weather[0].description,
		};
		date.push(object);
		//console.log(date);
	}

	return date;
}

function getMax(array) {
	let temp = array[0].main.temp;
	for (let i = 1; i < array.length; i++) {
		if (temp < array[i].main.temp) {
			temp = array[i].main.temp;
		}
	}
	return temp;
}

function getMin(array) {
	let temp = array[0].main.temp;
	for (let i = 1; i < array.length; i++) {
		if (temp > array[i].main.temp) {
			temp = array[i].main.temp;
		}
	}
	return temp;
}

function getWeather(place) {
	let api =
		"https://api.openweathermap.org/data/2.5/forecast?q=" +
		place +
		"&appid=3f79f896e97cfe497c0497941dc7a42f";

	return getJSON(api);
}

function displayForecast(array, unit) {
	let data = getUniquedate(array);

	// load data into an object
	console.log(data);

	const body = document.getElementById("weather");
	const bar = document.getElementById("weatherBar");

	if (bar != null) {
		bar.remove();
	}

	body.appendChild(createWeatherBox(data, data.length, unit));
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

export {
	createSearchBar,
	fetchEvent,
};
