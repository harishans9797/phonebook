var user;
var editId;
var male = false;
var female = false;
function rowId(edit){
    localStorage.setItem('edit', JSON.stringify(edit));
    appendRow();
}

function appendRow(){
    editId = JSON.parse(localStorage.getItem('edit'));
    var phonebooks = JSON.parse(localStorage.getItem('phonebooks'));

    var i = 0;
    while(i<phonebooks.length){
        if(editId == phonebooks[i].id_user){
            user = phonebooks[i];
            break;
        }
        i++;
    }

    $("#fname").val(user.name);
    $("#lname").val(user.lastName);
    $("#email").val(user.email);
    $("#phone").val(user.phone);
    $("#date").val(user.birthdayFormat);
    console.log(user.birthdayFormat);
    var countries = JSON.parse(localStorage.getItem('countries'));
    var cities = JSON.parse(localStorage.getItem('cities'));
    var j = 0;
    while(j<countries.length){
        if(user.country_Id == countries[j].country_Id){
            countryName = countries[j].country_name;
            break;
        }
        j++;
    }
     
    var k = 0;
    while(k<cities.length){
        if(user.city_Id == cities[k].city_id){
            cityName = cities[k].city_name;
            break;
        }
        k++;
    }

    $("#country").val(countryName);
    var elements = $('#city2');
    elements.append(`<option class="cityopts"> ${cityName} </option>`);
    citiesAppend2();


    if(user.male == true){
        $("#gender").val("Muško");
    }
    else if (user.female == true){
        $("#gender").val("Žensko");
    }
   
}

function clearOpt(){
   $('.cityopts').remove();
}

function datatoPut(){
    var name = $("#fname").val();
    var lname = $("#lname").val();
    var mail = $("#email").val();
    var phone = $("#phone").val();
    var gender = $("#gender").val();
    var countryName = $("#country").val();
    var cityName = $("#city2").val();
    var countryId;
    var cityId;
    var date = $("#date").val();

    var phonebooks = JSON.parse(localStorage.getItem('phonebooks'));
    var countries = JSON.parse(localStorage.getItem('countries'));
    var cities = JSON.parse(localStorage.getItem('cities'));

    var k=0;
        while(k<phonebooks.length){

            if(phone === phonebooks[k].phone && phone!==user.phone){
                alert("Ovaj broj telefona se već koristi");
            }
            k++;
        }

    var i=0;
    while(i<countries.length){
        if(countryName === countries[i].country_name){
            countryId =  countries[i].country_Id;
        }
        i++;
    }

    var j=0;
    while(j<cities.length){
        if(cityName === cities[j].city_name){
            cityId = cities[j].city_id;
        }
        j++;
    }

    if (gender.length == 5) {
        male = true;  
    }
    else if (gender.length == 6) {
        female = true;
    }

    return {
        "id_user": editId,
        "name": name,
        "lastName": lname,
        "phone": phone,
        "male": male,
        "female": female,
        "email": mail,
        "city_Id": cityId,
        "country_Id": countryId,
        "birthDate": date
    }
}



function put(){
    datatoPut();
    $.ajax({
        url: 'https://localhost:5001/api/phonebooks/' + editId,
        type: 'PUT',
        data: JSON.stringify(datatoPut()),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            location.reload();
        },
        error: function (res) {
          //  alert("Bad thing happend! " + res.statusText);
        }
    });
}
