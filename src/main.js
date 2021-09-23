//import './global.css';
import { getWeather, displayForecast, createSearchBar, fetchEvent } from "./weather/weatherDisplay";


function readCity() {
	let button = document.getElementById("test");
	let city = document.getElementById("city");

	button.addEventListener("click", () => {
		let unit = document.querySelector("input[name='unit']:checked");
		console.log(unit.value);
		fetchEvent(city.value, unit.value);
	});

	let radio = document.querySelectorAll("input[name='unit']");
	radio.forEach(element => {
		element.addEventListener('change', ()=>{
			let unit = document.querySelector("input[name='unit']:checked");
			fetchEvent(city.value, unit.value);
		});
	});

	
	
}


createSearchBar();
readCity();
fetchEvent("shenzhen","c");

