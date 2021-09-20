


function createWeatherBox(array, amount, unit){
     // C = Celsius      F = Fahrenheit
 
     // create weather box
     const weatherBar = document.createElement("div");
     weatherBar.id = "weatherBar";
 
     for(let i = 0; i < amount; i++){
        const box = document.createElement("div");
        box.className = "weatherBox";

        const date = document.createElement("p");
        date.innerText = array[i].date;
        box.appendChild(date);

        const img = document.createElement("img");
        img.src = "http://openweathermap.org/img/wn/" + array[i].icon +".png";
        box.appendChild(img);

        const temp = document.createElement("p");
        temp.innerText = unitConvert(array[i].maxTemp, unit) + 
                         " - " + 
                         unitConvert(array[i].minTemp, unit) + unit;

        box.appendChild(temp);
        
        const weather = document.createElement("p");
        weather.innerText = array[i].weather;
        box.appendChild(weather);

        weatherBar.appendChild(box);
     }

     return weatherBar;
}


function unitConvert(temp, unit){
     // convert from kelvin to C or F
     // K - C (K − 273.15)
     // K - F ((K − 273.15) × 9/5 + 32)

     let answer = temp;

     if(unit.toLowerCase() == "c"){
          answer = answer - 273.15;
     }else if(unit.toLowerCase() == "f"){
          answer = (answer - 273.15) * (9/5) + 32;
     }

     return answer.toFixed(2);
}





function createSearchBar(){
    // create dom to display data
     const wBar = document.getElementById("weather");

     // create search bar
     const searchBar = document.createElement("div");
     searchBar.className = "searchBar";
     
     const input = document.createElement("input");
     input.type = "text";
     input.id = "city";
     input.defaultValue = "shenzhen";
     searchBar.appendChild(input);
 
     const search = document.createElement("button");
     search.id = "test";
     search.innerText = "GO";
     searchBar.appendChild(search);
 
     wBar.appendChild(searchBar);
}

export {createSearchBar, createWeatherBox};