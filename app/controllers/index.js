//LINK de registro

var url = "https://wave-labs.org/";

$.registerLink.addEventListener('click', function () {
    Alloy.createController('homepage').getView().open();
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
        onload : function(e) {

            if(e.success){
                alert('Login bem-sucedido!');
                var nextController = Alloy.createController('homepage', {utilizador: e}).getView(); 
                $.window.add(nextController);
            }
            else{
                alert('Problema ao fazer login:' + e.error);
            }       
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('Problema ao fazer login:' + e.error);
        },
        timeout : 5000  
    });

    let login = {};
    login['email'] = email;
    login['password'] = password;
    alert(login);
    client.open("POST", url + "api/login");
    client.send(JSON.stringify(login));          

});


$.index.open();

mainWindow.add(imageView);
//$.imageInitial.image = "../app/assets/android/images/res-long-land-baleia/unnamed.png";

mainWindow.open();

$.index.open();