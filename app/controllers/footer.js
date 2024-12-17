
 function onButtonAvistamentos(e) {
    // Navegar para o controlador de avistamentos
    var avistamentosController = Alloy.createController('imagesInsert'); // Certifique-se de que o nome está correto
    avistamentosController.getView().open();

    
}

// Função chamada quando o botão de espécies é clicado
function onButtonEspecies(e) {
    // Navegar para o controlador de espécies
    var especiesController = Alloy.createController('especie'); // Certifique-se de que o nome está correto
    especiesController.getView().open();
}
function onButtonHome(e) {
    // Navegar para o controlador de espécies
    var homeController = Alloy.createController('homepage'); // Certifique-se de que o nome está correto
    homeController.getView().open();
}

exports.onButtonAvistamentos = onButtonAvistamentos;
exports.onButtonEspecies = onButtonEspecies;
exports.onButtonHome = onButtonHome;
