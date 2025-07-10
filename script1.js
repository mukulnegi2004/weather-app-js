const apikey = "6501a6bc3f94ae26e674c02ef7839358";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

//async keyword: Marks the function as asynchronous, allowing it to use await inside,checkweather(city): This function takes a city name as input and fetches weather data for it
async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);   //it Stores the HTTP response from the API.
    var data =  await response.json();     //await response.json(): Extracts JSON data from the API response, data: Stores the parsed JSON object containing weather details.
    

    if (data.cod == "404") {            // Checks if the API returns error code 404 (city not found).
        alert("Invalid city name. Please enter a valid city.");
        return;                        // Stop execution if city is invalid
    }


    console.log(data);    //  Prints the entire API response to the browser's console for debugging, it Helps in checking weather details, temperature, humidity, etc.

    document.querySelector(".city").innerHTML = data.name;  // it will update the city name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °c";   //round()	Rounds to the nearest integer (rounds .5 to even)
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    //Changing Weather Icon Based on Conditions
    if(data.weather[0].main == "Clouds"){
        weathericon.src = "images/cloudy.png";
    }
    else if(data.weather[0].main == "Clear"){
        weathericon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weathericon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weathericon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weathericon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
        weathericon.src = "images/snowy.png";
    }

    document.querySelector(".weather").style.display = "block";  //Shows the weather details section by setting display = "block" and  this section is hidden using display: none; in CSS.
}

searchbtn.addEventListener("click", ()=>{
    checkweather(searchbox.value); //When clicked, it runs and call checkweather function with parameter is searchbox.value which contains input city name
})