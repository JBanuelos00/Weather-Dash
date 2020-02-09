// Save our API key here
var APIKey = "235402aa2c0ae6d8712c89cd9e31a166";

//function to create an element containing the latest search term.
//prepend it to the search div
$("#searchBtn").on("click", function () {

    // Save user search term here for city
    var userInput = $("#mySearch").val();

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey;
    var jumboHead = $("#cityName");
    var jumboTemp = $("#temperature");
    var jumboHumid = $("#humidity");
    var jumboWS = $("#wind-speed");
    var jumboUVI = $("#uv-index");
    var currentDay = moment().format('L');

    // Create div + elements that will locally store and retrieve latest search history. Prepend so most recent is at top.
    // We then created an AJAX call for the current weather

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        // Check to see if API responded successfully
        console.log(response);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        // Populate the jumbotron with the right inputs
        jumboHead.text(response.name + " " + (currentDay));
        jumboTemp.text("Temperature: " + response.main.temp);
        jumboHumid.text("Humidity: " + response.main.humidity);
        jumboWS.text("Wind Speed: " + response.wind.speed);

        // calling the UV Index
        var queryURLUVI = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: queryURLUVI,
            method: "GET"
        }).then(function (response) {

            // Check to see if API responded successfully
            console.log(response);
            jumboUVI.text("UV Index: " + response.value);

        });


    });


    $.ajax({
        url: queryURL5,
        method: "GET"
    }).then(function (response) {

        // Check to see if API responded successfully
        console.log(response);
        for(var i=1; i<=5; i++) {
        var fiveDayForecast = moment().add(i, "d").format('L');

       $("#day"+i).text(fiveDayForecast);
    }
        // Dynamically create cards for 5 day forecast and populate it with the information necessary

    });

});