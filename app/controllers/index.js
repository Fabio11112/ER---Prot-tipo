//LINK de registro
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
    var username = $.usernameFieldConvidado.value.trim();
    var password = $.passwordField.value.trim();

    if (username === 'xico' && password === 'xico') {
        alert('Login bem-sucedido!');
        Alloy.createController('areaDeVisuali').getView().open();
    } else {
        alert('Usuário não existente!');
    }
});


$.index.open();

mainWindow.add(imageView);
//$.imageInitial.image = "../app/assets/android/images/res-long-land-baleia/unnamed.png";

mainWindow.open();

$.index.open();