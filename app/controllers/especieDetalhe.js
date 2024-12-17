var args = arguments[0] || {};
var idEspecie = args.idEspecie;

Ti.API.info("ID Específico recebido: " + idEspecie);

var url = "https://wave-labs.org/";

function fetchPage(pageNumber, idEspecie) {
    var client = Ti.Network.createHTTPClient({
        onload: function (e) {
            try {
                var response = JSON.parse(this.responseText);

                if (response.data && response.data.length > 0) {
                    var filteredAnimals = response.data.filter(animal => animal.id == idEspecie);
                    filteredAnimals.forEach(function (animal) {
                        var name = animal.name || "Nome não disponível";
                        var id = animal.id || 0;
                        var imagem = animal.photos ? animal.photos[0].link : "Sem foto";
                        var description = animal.description || "Descrição não disponível";
                        var curiosity = animal.curiosity || "Curiosidade não disponível";

                        Ti.API.info("Animal encontrado: ", name);
                        fetch_Object(imagem, id, name, description, curiosity);
                    });
                }

                if (pageNumber < 7) {
                    fetchPage(pageNumber + 1, idEspecie);
                }
            } catch (err) {
                console.error("Erro ao processar resposta:", err);
            }
        },
        onerror: function (e) {
            Ti.API.debug(e.error);
            alert("Erro ao buscar dados da API.");
        },
        timeout: 5000 
    });

    var queryString = "page=" + encodeURIComponent(pageNumber);
    Ti.API.info("Buscando: " + url + "api/creature?" + queryString);

    client.open("GET", url + "api/creature?" + queryString);
    client.send();
}

fetchPage(1, idEspecie);

function fetch_Object(imagem, id, name, description, curiosity) {
    var url = "https://wave-labs.org/api/";
    var imagem_especie = url + imagem;
    var view = Titanium.UI.createView({
        bottom: 20,
        width: "100%",
        height: "83%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        id: id,
    });

    view.addEventListener("touchstart", animateAnimal);
    view.addEventListener("touchend", resetAnimal);

    var labelName = Ti.UI.createLabel({
        text: name,
        color: "#000",
        font: { fontSize: 18, fontWeight: "bold" },
        textAlign: "center",
        top: 15,
    });

    var labelDescription = Ti.UI.createLabel({
        text: "Descrição: \n" + description,
        color: "#555",
        font: { fontSize: 14 },
        textAlign: "center",
        top: "10%",
        left: 10,
        right: 10,
    });

    var labelCuriosity = Ti.UI.createLabel({
        text: "Curiosidade: \n" + curiosity,
        color: "#777",
        font: { fontSize: 14, fontStyle: "italic" },
        textAlign: "center",
        top: "40%",
        left: 10,
        right: 10,
    });

    var imageView = Ti.UI.createImageView({
        image: imagem_especie,
        width: 180,
        height: 180,
        borderRadius: 10,
        bottom: 100
    });

    view.add(labelName);
    view.add(labelDescription);
    view.add(labelCuriosity);
    view.add(imageView);

    $.animalContainer.add(view);
}

// Funções de Animação
function animateAnimal(e) {
    var view = e.source;
    view.animate({
        transform: Ti.UI.create2DMatrix().scale(1.1), 
        duration: 200,
    });
}

function resetAnimal(e) {
    var view = e.source;
    view.animate({
        transform: Ti.UI.create2DMatrix().scale(1), 
        duration: 200,
    });
}
