//import './global.css';
import getJSON from "./weather/request";
import {getUniquedate,getWeatherUrl} from "./weather/weatherDisplay";
import {createSearchBar, createWeatherBox} from "./createWeatherBar"


function getWeather(place){
    let api = "http://api.openweathermap.org/data/2.5/forecast?q="+place+"&appid=3f79f896e97cfe497c0497941dc7a42f"
    return getJSON(api);
}


function readCity() {
	let button = document.getElementById("test");
	let city = document.getElementById("city");

	button.addEventListener("click", () => {
        buttonEvent(city.value);
	});

    
}

function buttonEvent(_city){
		getWeather(String(_city)).then((response) => {
            if(response.cod == "200"){
			    const array = response.list;
                displayForecast(array);
            }else{
                alert(response.message);
            }
		});
}

function displayForecast(array){
    let data = getUniquedate(array);
    let objectArray = []    
    
    // load data into an object
    for(let i = 0; i < 5; i++){
        let weather = {
            date: new Date(data[i].dt_txt).getDate(),
            icon: data[i].weather[0].icon,
            maxTemp: data[i].main.temp_max,
            minTemp: data[i].main.temp_min,
            weather: data[i].weather[0].description
        }
        objectArray.push(weather);
    }

    const body = document.getElementById("weather");
    const bar = document.getElementById("weatherBar");

    if(bar != null){
        bar.remove()
    }

    body.appendChild(createWeatherBox(objectArray,objectArray.length, "c"));


}

createSearchBar();
readCity();
buttonEvent("shenzhen");