var male = false;
var female = false;

$('#buton').click(function () {

    forma();

    $.ajax({
        url: 'https://localhost:5001/api/phonebooks',
        type: 'POST',
        data: JSON.stringify(forma()),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            location.reload();
        },
        error: function (res) {
          //alert(res);
        }
    });
});


function forma() {


        var name = $("#fname").val();
        var lname = $("#lname").val();
        var mail = $("#email").val();
        var phone = $("#phone").val();
        var gender = $("#gender").val();
        var countryName = $("#country").val();
        var cityName = $("#city").val();
        var countryId;
        var cityId;
        var date = $("#date").val();

        var phonebooks = JSON.parse(localStorage.getItem('phonebooks'));
        var countries = JSON.parse(localStorage.getItem('countries'));
        var cities = JSON.parse(localStorage.getItem('cities'));


        var k=0;
        while(k<phonebooks.length){
            if(phone === phonebooks[k].phone){
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