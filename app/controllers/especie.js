
var url = "https://wave-labs.org/";
function fetchPage() {
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
                        name = animal.taxa_category;
                        imagem = animal.image;
                        id = animal.id;
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

    client.open("GET", url + "api/creature-type");
    
    client.send(); // Enviar requisição GET

}

fetchPage();

function fetch_Object(imagem, id, name){
var url = "https://wave-labs.org/";
    var imagem_especie = url + imagem;
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
                    image: imagem_especie,
                    width: 140,
                    height: 140,
                    borderRadius: 10
                    
                });
                imageView.addEventListener('click', function() {
                    Alloy.createController('creatureType', { idEspecie: id }).getView().open();
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


