
$.homepage.open();
var args = arguments[0] || {};
if(args = {}){
	args = {username: 'convidado'};
}

var welcome = $.welcomeLabel;
welcome.text = "Bem-vindo, " + args.username + "!";


function doClick(e) {
	Alloy.createController('imagesInsert').getView().open();
}
