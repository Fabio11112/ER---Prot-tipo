// Arguments passed into this controller can be accessed via the `$.args` object directly or:

//$.creatureType.open();
// creatureType.js
// creatureType.js
var args = arguments[0] || {};
var idEspecie = args.idEspecie;

Ti.API.info("ID Específico recebido: " + idEspecie);


var url = "https://wave-labs.org/";
function fetchPage(idEspecie) {
    console.log("ID Especie: " + idEspecie);
    let imagem;
    let id;
    let name;
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                var response = JSON.parse(this.responseText); // Parseia o JSON recebido
                //console.log("Resposta da página " + pageNumber + ":", response);
                if (response.data && response.data.length > 0) {             
                    response.data.forEach( function(animal){
                        name = animal.name;
                        imagem = animal.photos? animal.photos[0].link : "Sem imagem";
                        id = animal.type?animal.id : "Sem id";
                           console.log(name);
                           console.log(imagem);
                           console.log(id);
                           fetch_Object(imagem, id, name);
                        });    

            }
            } catch (err) {
                console.error("Erro ao processar resposta:", err);
            }
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
        },
        timeout: 5000 // Timeout em milissegundos
    });

    client.open("GET", url + "api/creature?creatureType="+idEspecie);
    
    client.send(); // Enviar requisição GET

}

fetchPage(idEspecie);

function fetch_Object(imagem, id, name){
var url = "https://wave-labs.org/api/";
    var imagem_subespecie = url + imagem;
                var view = Titanium.UI.createView({
                    bottom:20,
                    width: "100%",
                    height: 200,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    animalName: name, // NOME REFERENCIA EVENTO
                    id: id,
                    
                    
                });

                view.addEventListener('touchstart', animateAnimal);
                view.addEventListener('touchend', resetAnimal);
                var label1 = Ti.UI.createLabel({
                    text: name,
                    color: "#000",
                    font: {
                        fontSize: 18,
                        fontWeight: "bold"
                    },
                    textAlign: "center",
                    top: 5
                  });
                var imageView = Ti.UI.createImageView({
                    image: imagem_subespecie,
                    width: 140,
                    height: 140,
                    borderRadius: 10
                    
                });
                imageView.addEventListener('click', function() {
                    Alloy.createController('especieDetalhe', { idEspecie: id }).getView().open();
                    alert("Clicou na imagem");
                });
                
                
                view.add(imageView); 
                view.add(label1); 
                $.animalContainer.add(view);

        }

//TENTATIVA
function animateAnimal(e) {
    var view = e.source; 
    view.animate({
        transform: Ti.UI.create2DMatrix().scale(1.1), // AUMENTA IMAGEM
        duration: 200 // TEMPO DE DURAÇAO
    });
}

function resetAnimal(e) {
    var view = e.source; 
    view.animate({
        transform: Ti.UI.create2DMatrix().scale(1), 
        duration: 200
    });
}

// var url = "https://wave-labs.org/";


// function fetchPage(page){
//     let imagem, id, name;

//     let client = Ti.Network.createHTTPClient({
//         onload: function(e){},
//         onerror:function(e){},
//         timeout:5000
//     });
//     client.open("GET", url + "api/creature-type?" + queryString);
//     client.send();
//}