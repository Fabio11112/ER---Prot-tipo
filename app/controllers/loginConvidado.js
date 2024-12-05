$.btnLogin.addEventListener('click', function () {
    var username = $.usernameFieldConvidado.value.trim();

    if (username === 'xico') {
        alert('Login bem-sucedido!');
        Alloy.createController('homepage').getView().open();
    } else {
        alert('Usuário não existente!');
    }
});

$.loginConvidado.open();
