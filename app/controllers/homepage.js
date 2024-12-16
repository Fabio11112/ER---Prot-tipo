
$.homepage.open();
var args = $.args;
var utilizador = args.utilizador || {};

console.log("utilizador homepage" + JSON.stringify(utilizador));


var welcome = $.welcomeLabel;
welcome.text = "Bem-vindo, ";
welcome.text += (Object.keys(utilizador).length === 0) ? 'convidado' : utilizador.user.userable.user.name;


function doClick(e) {
	Alloy.createController('imagesInsert').getView().open();
}
