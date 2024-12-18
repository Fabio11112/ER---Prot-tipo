
$.homepage.open();
var args = $.args;
var utilizador = JSON.parse(Titanium.App.Properties.getString("utilizador")) || {};
// var string;
console.log("utilizador homepage" + JSON.stringify(utilizador));
console.log("Antes do createUser");
createUser();
console.log("Depois do createUser");

var welcome = $.welcomeLabel;
welcome.text = "Bem-vindo, ";
console.log(JSON.stringify(utilizador));
welcome.text += (Object.keys(utilizador).length === 0) ? 'convidado' : utilizador.user.userable.user.name;

// if((Object.keys(utilizador).length === 0)){
// 	string = 'convidado';
// } else {
// 	string = utilizador.user.userable.user.name;
// }
function doClick(e) {
	Alloy.createController('imagesInsert').getView().open();
	// var avistamentosController = Alloy.createController('imagesInsert'); // Certifique-se de que o nome está correto
    // avistamentosController.getView().open();
}

function logout(e) {
	console.log("Logout");
	let url="https://wave-labs.org/api/logout";
	let client = Ti.Network.createHTTPClient({
		onload : function(e) {
			try {
                var response = JSON.parse(this.responseText); // Parseia o JSON recebido
				console.log("Resposta da página:", response);
                if (response.data && response.data.length > 0) {  
					console.log(JSON.stringify(e));
					console.log("Logout bem-sucedido!");
					if(e.success){
						alert('Logout bem-sucedido!');
						Titanium.App.Properties.removeProperty("utilizador");
						Alloy.createController('index').getView().open();
					}
					else{
						alert('Problema ao fazer logout:' + e.error);
					console.log("Logout NAO FEITO!");

					}
				}
			} catch (err) {
				console.error("Erro ao processar resposta:", err);
				console.log("ERRO CATCH!");

			}
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
			console.error("Erro ao fazer logout: ", e.error);
			console.error("Status Code: ", this.status);
			console.error("Response Text: ", this.responseText);
			alert("Erro da API ao fazer Logout: " + e.error);
			Titanium.App.Properties.removeProperty("utilizador");
			Alloy.createController('index').getView().open();
		},
		timeout:5000
	})
	console.log("ANTES DO GET LOGOUT");
	client.open("GET", url);
	client.send();
}

function createUser(){
	console.log("CRIAR USER");
	console.log("Utilizador: " + JSON.stringify(utilizador));
	if(Object.keys(utilizador).length !== 0){
		console.log("DENTRO DO IF");
		let url = "http://10.0.2.2:8000/api";
		let client= Ti.Network.createHTTPClient({
			onload: function(e){
				console.log("Entrou onload");
				try{
					console.log(JSON.stringify(e));
					console.log("Utilizador criado com sucesso!");
				}
				catch(err){
					console.log(JSON.stringify(e));
					console.error("Erro ao processar resposta:", err);
				}
			},
			onerror:function(e){
				console.log(JSON.stringify(e));
				Ti.API.debug(e.error);
				console.error("Erro ao fazer logout: ", e.error);
				console.error("Status Code: ", this.status);
				console.error("Response Text: ", this.responseText);
			},
			timeout:5000
		});
		console.log("ANTES DO POST");
		console.log(url);
		client.open("POST", url + "/user");
		console.log("depois DO POST");
		client.send({"user_id": parseInt(utilizador.user.id)});
		console.log("depois DO SEND");
	}
}