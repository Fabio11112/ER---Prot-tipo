$.btnLogin.addEventListener('click', function () {
    var username = $.usernameField.value.trim();
    var password = $.passwordField.value.trim();

    if (username === 'admin' && password === '1234') {
        alert('Login bem-sucedido!');
        Alloy.createController('homepage').getView().open();
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

$.loginExpert.open();
