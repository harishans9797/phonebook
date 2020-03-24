var countries;
var cities;
var phonebooks;
var selcountry; //selected country
var selId; //id of selected country
var pcities; // cities possible to choose

function getCountries() {

    $.get(
        'https://localhost:5001/api/countries',

        function (data) {

            countries = data;


            localStorage.setItem('countries', JSON.stringify(countries));

            var elements = $('#country');
            getCities();
            $.each(data, function (key, countries) {

                elements.append(`<option> ${countries.country_name} </option>`);
            })
        },
        'json'
    );
}

function getCities() {
    $.get(
        'https://localhost:5001/api/cities',

        function (data) {

            
            cities = data;
            localStorage.setItem('cities', JSON.stringify(cities));
            getPhonebook();
            citiesAppend();


        },
        'json'
    );
}


function getPhonebook() {
    $.get(
        'https://localhost:5001/api/phonebooks',

        function (data) {
            
            phonebooks = data;
            localStorage.setItem('phonebooks', JSON.stringify(phonebooks)); 

            var elements = $('#elements')

            element = '';

            $.each(data, function (key, value) {

                var i = 0;
                var cityName;
                while (i < cities.length) {
                    if (value.city_Id == cities[i].city_id) {
                        cityName = cities[i].city_name;
                    }
                    i++;
                }

                var j = 0;
                var countryName;
                while (j < countries.length) {
                    if (value.country_Id == countries[j].country_Id) {
                        countryName = countries[j].country_name;
                    }
                    j++;
                }


                if (value.male == true) {

                    elements.append(`<tr><td>${value.name}</td>` + `<td> ${value.lastName}</td>` +
                        `<td> ${value.phone}</td>` +
                        `<td><span class="male"></span></td>`
                        + `<td> ${value.email}</td>` + `<td> ${cityName}</td>` + `<td> ${countryName}</td>` +
                        `<td> ${value.birthdayFormat}</td>` + `<td> ${value.old}</td>` +
                        `<td><button value="${value.id_user}" class="edit" onclick="rowId(${value.id_user})" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Izmjeni</button></td>`
                        + `<td><button value="${value.id_user}" class='delete' onclick="deleteUser()">Izbriši</button></td> </tr>`);
                } else if (value.female == true) {

                    elements.append(`<tr><td>${value.name}</td>` + `<td> ${value.lastName}</td>` +
                        `<td> ${value.phone}</td>` +
                        `<td><span class="female"></span></td>`
                        + `<td> ${value.email}</td>` + `<td> ${cityName}</td>` + `<td> ${countryName}</td>` +
                        `<td> ${value.birthdayFormat}</td>` + `<td> ${value.old}</td>` +
                        `<td><button value="${value.id_user}" class="edit" onclick="rowId(${value.id_user})" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Izmjeni</button></td>`
                        + `<td><button value="${value.id_user}" class='delete' onclick="deleteUser()">Izbriši</button></td> </tr>`);
                }
            })
        },
        'json'
    );
}




$(document).ready(function () {

    getCountries();

});

$("#country").change(function () {
    $('.cityopts').remove();
    citiesAppend();
    citiesAppend2();
});

function citiesAppend(){
    var elements = $('#city');
    selcountry = $("#country").val();
            var i = 0;
            var j = 0;
            while (i < countries.length) {
                if (selcountry === countries[i].country_name) {
                    selId = countries[i].country_Id;
                }
                i++;
            }

            while (j < cities.length) {
                if (cities[j].country_Id == selId) {
                    // $.each(data, function (key, cities) {

                    elements.append(`<option class="cityopts"> ${cities[j].city_name} </option>`);

                    //  })
                }
                j++;
            }
    }

    function citiesAppend2(){
        var elements = $('#city2');
        selcountry = $("#country").val();
                var i = 0;
                var j = 0;
                while (i < countries.length) {
                    if (selcountry === countries[i].country_name) {
                        selId = countries[i].country_Id;
                    }
                    i++;
                }
    
                while (j < cities.length) {
                    if (cities[j].country_Id == selId && cities[j].city_name !== $('#city2').val()) {
                        
    
                        elements.append(`<option class="cityopts"> ${cities[j].city_name} </option>`);
    
                        
                    }
                    j++;
                }
        }


