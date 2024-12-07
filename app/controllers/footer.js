
function onButtonAvistamentos(e) {
    // Navegar para o controlador de avistamentos
    var avistamentosController = Alloy.createController('avistamento'); // Certifique-se de que o nome está correto
    avistamentosController.getView().open();
}

// Função chamada quando o botão de espécies é clicado
function onButtonEspecies(e) {
    // Navegar para o controlador de espécies
    var especiesController = Alloy.createController('especies'); // Certifique-se de que o nome está correto
    especiesController.getView().open();
}

exports.onButtonAvistamentos = onButtonAvistamentos;
exports.onButtonEspecies = onButtonEspecies;
