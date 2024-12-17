//LINK de registro

var url = "https://wave-labs.org/";

let responseText = e.source.responseData.text; 
let utilizadorObject = JSON.parse(responseText);


$.registerLink.addEventListener('click', function () {
    Alloy.createController('register').getView().open();
});
$.registerLink.addEventListener('touchstart', function () {
    $.registerLink.textDecoration = 'underline'; // Aplica sublinhado
});

$.registerLink.addEventListener('touchend', function () {
    $.registerLink.textDecoration = 'none'; // Remove sublinhado
});

//Quando eé convidado passa logo para a pagina de seleçao
$.btnConvidado.addEventListener('click', function () {
    Alloy.createController('homepage').getView().open();
});


$.btnLogin.addEventListener('click', function () {

    var email = $.usernameFieldConvidado.value.trim();
    var password = $.passwordField.value.trim();

    var client = Ti.Network.createHTTPClient({
        onload: function(e) {

            if(e.success){
                alert('Login bem-sucedido!');
                let utilizadorObject = JSON.parse(e.source.responseData.text);
                console.log("Utilizador\n" + e.source.responseData.text);
                Titanium.App.Properties.setString("utilizador", JSON.stringify(utilizadorObject));
                Alloy.createController('homepage').getView().open(); 
            }
            else{
                alert('Problema ao fazer login:' + e.error);
            }       
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert('Problema ao fazer login onerror:' + JSON.stringify(e.source.responseDictionary));
            console.log(JSON.stringify(e));
        },
        timeout : 5000  
    });

    let login = {};
    login['email'] = email;
    login['password'] = password;
    alert(login);

    client.setRequestHeader("Content-Type", "application/json");
    client.open("POST", url + "api/login");
    client.send(JSON.stringify(login));          

});


$.index.open();

// $.mainContainer.add(imageView);
//$.imageInitial.image = "../app/assets/android/images/res-long-land-baleia/unnamed.png";

// $.mainContainerr.open();
