// manipulate json data



// json contain 5 records from a single day
// I want 1 record per day
function getUniquedate(array){
    let date = [];

    for(let i = 0; i < array.length; i++){
        let push = true;
        let checkdate = new Date(array[i].dt_txt);

        for(let x = 0; x < date.length; x++){
            if(checkdate.getDate() == getWeatherDateType(date[x]).getDate() ){
                push = false;
                x = date.length + 1;
            }
        }

        if(push){
            date.push(array[i]);
        }
    }

    return date;
}

function getWeatherDateType(object){
    return new Date(object.dt_txt);
}

function getWeatherUrl(object){
    const url = "http://openweathermap.org/img/wn/";
    return url+object.weather.icon;
}

export {getUniquedate,getWeatherUrl};