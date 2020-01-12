cities = [];

init();

$("#searchButton").on("click", function (e) {
    e.preventDefault();
    var city = $("#searchInput").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7fa45168636da3dfeda4e9655b6bccab";
    var queryUrlFore = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=7fa45168636da3dfeda4e9655b6bccab";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var iconID = response.weather[0].icon;
        var fahrenheit = Math.round((response.main.temp * (9 / 5) - 459.67));
        $("#cityName").text(response.name + " " + "(" + moment().format("MMMM Do YYYY") + ")");
        $("#temp").text(fahrenheit + " " + "°F")
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " " + "MPH");
        $("#clouds").text("Cloudiness: " + response.clouds.all + "%");
        if (cities.includes(response.name) === true) {
            cities.splice(cities.indexOf(response.name), 1);
        }
        cities.push(response.name);
        if (cities.length > 10) {
            cities.splice(0, 1);
        }
        storeCities();
        renderCities();
        addE();
    });
    $.ajax({
        url: queryUrlFore,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".five-day").empty();
        var j = 0;
        for (var i = 0; i < 5; i++) {
            if (i === 0) {
                j = 0;
            }
            else {
                j += 8;
            }
            var fahrenheitFore = "Temp: " + Math.round((response.list[j].main.temp * (9 / 5) - 459.67)) + " °F";
            var status = response.list[j].weather[0].main;
            var humidityFore = "Humidity: " + response.list[j].main.humidity + "%";
            var yearSlice = response.list[j].dt_txt.slice(0, 4);
            var monthSlice = response.list[j].dt_txt.slice(5, 7);
            var daySlice = response.list[j].dt_txt.slice(8, 10);
            var newRow = $("<div>").addClass("col-md-2 five-card");
            var newDate = $("<h5>").text(monthSlice + "/" + daySlice + "/" + yearSlice).addClass("five-date");
            var newTemp = $("<p>").text(fahrenheitFore);
            var newHumidity = $("<p>").text(humidityFore).addClass("five-humidity");
            var newIcon = $("<i>").addClass("five-icon");
            $(".five-day").append(newRow);
            newRow.append(newDate);
            newRow.append(newIcon);
            newRow.append(newTemp);
            newRow.append(newHumidity);

            if (status == "Clear") {
                newIcon.addClass("fas fa-sun");
            }
            else if (status == "Clouds") {
                newIcon.addClass("fas fa-cloud");
            }
            else if (status == "Drizzle") {
                newIcon.addClass("fas fa-cloud-rain");
            }
            else if (status == "Rain") {
                newIcon.addClass("fas fa-cloud-showers-heavy");
            }
            else if (status == "Thunderstorm") {
                newIcon.addClass("fas fa-bolt");
            }
            else if (status == "Snow") {
                newIcon.addClass("fas fa-snowflake");
            }
        }
    })
})

function renderCities() {
    $("#cities-cont").empty();
    for (var i = 0; i < cities.length; i++) {
        // var newDiv = $("<div>").css("margin-top", "30px");
        var newButton = $("<button>").text(cities[i]).addClass("citiesBtn");
        // newDiv.append(newButton);
        $("#cities-cont").prepend(newButton);
    }
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCities();
    addE();
    var city = cities[cities.length - 1];
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7fa45168636da3dfeda4e9655b6bccab";
    var queryUrlFore = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=7fa45168636da3dfeda4e9655b6bccab";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var iconID = response.weather[0].icon;
        var fahrenheit = Math.round((response.main.temp * (9 / 5) - 459.67));
        $("#cityName").text(response.name + " " + "(" + moment().format("MMMM Do YYYY") + ")");
        $("#temp").text(fahrenheit + " " + "°F")
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " " + "MPH");
        $("#clouds").text("Cloudiness: " + response.clouds.all + "%");
        if (cities.includes(response.name) === true) {
            cities.splice(cities.indexOf(response.name), 1);
        }
        cities.push(response.name);
        if (cities.length > 10) {
            cities.splice(0, 1);
        }
        storeCities();
        renderCities();
        addE();
    });
    $.ajax({
        url: queryUrlFore,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".five-day").empty();
        var j = 0;
        for (var i = 0; i < 5; i++) {
            if (i === 0) {
                j = 0;
            }
            else {
                j += 8;
            }
            var fahrenheitFore = "Temp: " + Math.round((response.list[j].main.temp * (9 / 5) - 459.67)) + " °F";
            var status = response.list[j].weather[0].main;
            var humidityFore = "Humidity: " + response.list[j].main.humidity + "%";
            var yearSlice = response.list[j].dt_txt.slice(0, 4);
            var monthSlice = response.list[j].dt_txt.slice(5, 7);
            var daySlice = response.list[j].dt_txt.slice(8, 10);
            var newRow = $("<div>").addClass("col-md-2 five-card");
            var newDate = $("<h5>").text(monthSlice + "/" + daySlice + "/" + yearSlice).addClass("five-date");
            var newTemp = $("<p>").text(fahrenheitFore);
            var newHumidity = $("<p>").text(humidityFore).addClass("five-humidity");
            var newIcon = $("<i>").addClass("five-icon");
            $(".five-day").append(newRow);
            newRow.append(newDate);
            newRow.append(newIcon);
            newRow.append(newTemp);
            newRow.append(newHumidity);

            if (status == "Clear") {
                newIcon.addClass("fas fa-sun");
            }
            else if (status == "Clouds") {
                newIcon.addClass("fas fa-cloud");
            }
            else if (status == "Drizzle") {
                newIcon.addClass("fas fa-cloud-rain");
            }
            else if (status == "Rain") {
                newIcon.addClass("fas fa-cloud-showers-heavy");
            }
            else if (status == "Thunderstorm") {
                newIcon.addClass("fas fa-bolt");
            }
            else if (status == "Snow") {
                newIcon.addClass("fas fa-snowflake");
            }
        }
    })
}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function addE() {
    $(".citiesBtn").each(function () {
        $(this).on("click", function (e) {
            console.log("button clicked!")
            var city = $(this).text();
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7fa45168636da3dfeda4e9655b6bccab";
            var queryUrlFore = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=7fa45168636da3dfeda4e9655b6bccab";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var iconID = response.weather[0].icon;
                var fahrenheit = Math.round((response.main.temp * (9 / 5) - 459.67));
                $("#cityName").text(response.name + " " + "(" + moment().format("MMMM Do YYYY") + ")");
                $("#temp").text(fahrenheit + " " + "°F")
                $("#icon").attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
                $("#humid").text("Humidity: " + response.main.humidity + "%");
                $("#wind").text("Wind Speed: " + response.wind.speed + " " + "MPH");
                $("#clouds").text("Cloudiness: " + response.clouds.all + "%");
                if (cities.includes(response.name) === true) {
                    cities.splice(cities.indexOf(response.name), 1);
                }
                cities.push(response.name);
                if (cities.length > 10) {
                    cities.splice(0, 1);
                }
                storeCities();
                renderCities();
                addE();
            });
            $.ajax({
                url: queryUrlFore,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $(".five-day").empty();
                var j = 0;
                for (var i = 0; i < 5; i++) {
                    if (i === 0) {
                        j = 0;
                    }
                    else {
                        j += 8;
                    }
                    var fahrenheitFore = "Temp: " + Math.round((response.list[j].main.temp * (9 / 5) - 459.67)) + " °F";
                    var status = response.list[j].weather[0].main;
                    var humidityFore = "Humidity: " + response.list[j].main.humidity + "%";
                    var yearSlice = response.list[j].dt_txt.slice(0, 4);
                    var monthSlice = response.list[j].dt_txt.slice(5, 7);
                    var daySlice = response.list[j].dt_txt.slice(8, 10);
                    var newRow = $("<div>").addClass("col-md-2 five-card");
                    var newDate = $("<h5>").text(monthSlice + "/" + daySlice + "/" + yearSlice).addClass("five-date");
                    var newTemp = $("<p>").text(fahrenheitFore);
                    var newHumidity = $("<p>").text(humidityFore).addClass("five-humidity");
                    var newIcon = $("<i>").addClass("five-icon");
                    $(".five-day").append(newRow);
                    newRow.append(newDate);
                    newRow.append(newIcon);
                    newRow.append(newTemp);
                    newRow.append(newHumidity);

                    if (status == "Clear") {
                        newIcon.addClass("fas fa-sun");
                    }
                    else if (status == "Clouds") {
                        newIcon.addClass("fas fa-cloud");
                    }
                    else if (status == "Drizzle") {
                        newIcon.addClass("fas fa-cloud-rain");
                    }
                    else if (status == "Rain") {
                        newIcon.addClass("fas fa-cloud-showers-heavy");
                    }
                    else if (status == "Thunderstorm") {
                        newIcon.addClass("fas fa-bolt");
                    }
                    else if (status == "Snow") {
                        newIcon.addClass("fas fa-snowflake");
                    }
                }
            })
        })
    })
}