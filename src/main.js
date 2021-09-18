//import './global.css';
import getJSON from "./weather/request";
import {getUniquedate} from "./weather/weatherDisplay";

function getWeather(place){
    let api = "http://api.openweathermap.org/data/2.5/forecast?q="+place+"&appid=3f79f896e97cfe497c0497941dc7a42f"
    return getJSON(api);
}


function readCity() {
	let button = document.getElementById("test");
	let city = document.getElementById("city");

	button.addEventListener("click", () => {
		let _city = city.value;

		getWeather(String(_city)).then((response) => {
            if(response.cod == "200"){
			    const array = response.list;
                displayForecast(array);
                /*
                for(let i = 0; i < array.length; i++){
                    console.log(array[i]);
                }*/
            }else{
                alert(response.message);
            }
		});
	});
}

function displayForecast(array){
    let weatherBox = document.getElementsByClassName("weatherBox");
    console.log(array);

    let date = getUniquedate(array);    
    
    for(let i = 0; i < weatherBox.length; i++){
        weatherBox[i].innerHTML = date[i].dt_txt;
    }
}





readCity();
