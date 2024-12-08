function openAnimalDetails(e) {
    var animalName = e.source.id; // Identifica o animal pelo ID
    alert("És um  " + animalName);
    Alloy.createController('especieDetalhe').getView().open();
}

var url = "https://wave-labs.org/";
function fetchPage(pageNumber) {
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
                        imagem = animal.photos ? animal.photos[0].link : 'Sem foto';
                        id = animal.id;
                           console.log(name);
                           console.log(imagem);
                           console.log(id);
                           fetch_Object(imagem, id, name);
                        });    
                if(pageNumber != 7){
                    fetchPage(7);
                }
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

    // Construir URL com parâmetros de página
    var queryString = "page=" + encodeURIComponent(pageNumber);
    console.log(queryString);
    client.open("GET", url + "api/creature?" + queryString);
    client.send(); // Enviar requisição GET

}

fetchPage(1)

function fetch_Object(imagem, id, name){ {
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            const imageBlob = this.responseData;
            try {
                var view = Titanium.UI.createView({
                    width: 120,
                    height: 150,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                    borderWidth: 1,
                    
                });
                var label1 = Ti.UI.createLabel({
                    text: name,
                    color: "#000",
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    textAlign: "center",
                    top: 5
                  });
                var imageView = Ti.UI.createImageView({
                    image: imageBlob,
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE,
                    
                });
                
                view.add(imageView); 
                view.add(label1); 
                $.animalContainer.add(view);
        
                var response = this.responseText; // Parseia o JSON recebido
                //console.log("Resposta da página " + pageNumber + ":", response);
                if (response.data && response.data.length > 0) {
                   console.log(response)

                }
            } catch (err) {
                console.error("Erro ao processar resposta!!!!!", err);
            }
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
        },
        timeout: 5000 // Timeout em milissegundos
    });

    client.open("GET", url + "api/" + imagem);
    client.send(); // Enviar requisição GET
}
}



