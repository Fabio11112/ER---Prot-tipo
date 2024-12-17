// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const args = $.args;
let test_user_id = 1;
let mime_test = 'image/jpeg';
let imagens = [];
let count = 0;

var user = JSON.parse(Titanium.App.Properties.getString("utilizador")) || {};
console.log("User: " + JSON.stringify(user));



let url = "http://10.0.2.2:8000/api/";
let urlAI = "http://wave-labs.org/api/ai-detection/";

$.buttonImage.addEventListener('click', function () {

    Ti.Media.openPhotoGallery({
        allowMultiple: true,
        success: function (event) {
            console.log(event);
            if (event.images) {

                event.images.forEach(image => addImagePreview(image));

            }
            else{
                label = Ti.UI.createLabel({
                    text: 'Caminho: ' + event.media.nativePath,
                    color: '#000',
                    font: { fontSize: 20 },
                });
                $.imagesList.add(label);
            }
        },
        error: function (error) {
            alert('Erro ao abrir a galeria de fotos: ' + error.code);
        },
        mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
    });
});

function addImagePreview(image){

    // Create a new ImageView 
    let imageModel = 
        {
            image: image.media,
            user_id: test_user_id,
            mime: image.media.mimeType
        };

    let imageBlob = image.media;
        // images[images[${count}]] = {
        //     image: imageModelData
        
        // };

    
    imagens.push(imageBlob);
    const newImageView = Ti.UI.createImageView({
        image: image,
        width: "80%",
        height: "20%",
        borderColor: '#000',
        borderWidth: 1,
        left: "10%",
        top:"30px"
    });

    // Add the ImageView to the ScrollView
    $.imagesList.add(newImageView);

    // Optionally store the image path or object
    //selectedImages.push(image.nativePath || image);
}

$.buttonOk.addEventListener('click', onClicked);




function onClicked(e) {
    console.log("CLICKED!!!\n");
	//alert($.label.text);
	//Alloy.createController('aceitarSugestao').getView().open();


    // var client = Ti.Network.createHTTPClient({
        
    //     onload: function(e) {
    //         try {
    //             const response = this.responseText ? JSON.parse(this.responseText) : null;
    //             if (response) {
    //                 console.log("Resposta do servidor: ", response);
    //                 alert("Imagens enviadas com sucesso: " + response.message);
    //                 return;
    //             }
    //             console.log("Resposta do servidor: ", response);
    //             alert("Problema ao enviar as imagens: " + response.message);

    //         } catch (err) {
    //             console.error("Erro ao processar resposta!!!!!", err);
    //         }
    //     },
    //     onerror: function(e) {
    //         console.log("Exception Error caught: " + e.error);
    //         Ti.API.debug(e.error);
    //     },
    //     timeout: 5000 // Timeout em milissegundos
    // });

    sugestaoAI(imagens[0]);
    // let requestObject = {};

    // requestObject['user_id'] = test_user_id;
    // requestObject['mime'] = mime_test;
    
    // imagens.forEach((image, index) => {
    //     requestObject[`image[${index}]`] = image;
    // });



    // console.log(url + "uploadImage");

    
    // client.open("POST", url + "uploadImage");
    // client.send(requestObject); // Enviar requisição GET
}

function sugestaoAI($image){
    var client = Ti.Network.createHTTPClient({
        onload:function(e){
            try{
                console.log("Objeto IA:" + JSON.stringify(e));
                if (response) {
                    console.log("Resposta da IA: ", response);
                    alert("Imagens enviadas com sucesso à IA: " + response.message);
                    return;
                }
                console.log("Resposta da IA: ", response);
                alert("Problema ao enviar as imagens à IA: " + response.message);

                const response = this.responseText ? JSON.parse(this.responseText) : null;
            }catch(err){
                console.error("Erro ao processar resposta da IA!!!!!", err);
            }

        },
        onerror:function(e){
            console.log("Exception Error caught AI: " + JSON.stringify(e));
            Ti.API.debug(e.error);
        },
        timeout: 5000
    });

    let requestObject = {};

    requestObject['model_id'] = 1;
    requestObject['directory'] = 1;

    client.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify(requestObject));
    client.open("POST", urlAI);
    client.send(requestObject);
}


function fromArrayToJSON(array){
    let json = {};
    array.forEach((element, index) => {
        json[`image[${index}]`] = element;
    });
    console.log("IMAGENS ENVIADAS\n");
    console.log(json);
    return json;
}


var mainView = Ti.UI.createView({
    layout: 'vertical',
    backgroundColor: '#f8f8f8'
});

// Verificação do usuário
if (Object.keys(user).length === 0) {
    console.log("Convidado");

    var labelConvidado = Ti.UI.createLabel({
        text: 'Convidado',
        color: '#000',
        font: { fontSize: 18 },
    });
    mainView.add(labelConvidado);

} else {
    console.log("User autenticado");

    var labelAutenticado = Ti.UI.createLabel({
        text: 'Usuário Autenticado',
        color: '#000',
        font: { fontSize: 18 },

    });
    mainView.add(labelAutenticado);

        formularioMetadados();

}
function formularioMetadados() {
    var formView = Ti.UI.ScrollView({
        backgroundColor: '#f8f8f8',
        layout: 'vertical',
        width: '100%',
        showVerticalScrollIndicator: 'true'
    });

    // Elementos do formulário
    var labelVento = Ti.UI.createLabel({ text: 'Escala do Vento:', top: 20, left: 10 });
    var escalaVento = Ti.UI.createTextField({
        hintText: 'Digite a escala do vento',
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5
    });

    var labelEspecies = Ti.UI.createLabel({ text: 'Número de Espécies Observadas:', top: 20, left: 10 });
    var numEspecies = Ti.UI.createTextField({
        hintText: 'Digite o número',
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5
    });

    var labelCrias = Ti.UI.createLabel({ text: 'Número de Crias (Bebés):', top: 20, left: 10 });
    var numCrias = Ti.UI.createTextField({
        hintText: 'Digite o número',
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5
    });

    var labelBarco = Ti.UI.createLabel({ text: 'Tipo de Barco:', top: 20, left: 10 });
    var tipoBarco = Ti.UI.createTextField({
        hintText: 'Digite o tipo de barco',
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5
    });

    var labelComportamento = Ti.UI.createLabel({ text: 'Comportamento das Espécies:', top: 20, left: 10 });
    var comportamento = Ti.UI.createTextArea({
        hintText: 'Descreva o comportamento das espécies',
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5, height: 100
    });

    var labelData = Ti.UI.createLabel({ text: 'Data de Início:', top: 20, left: 10 });
    var dataAtual = new Date();
    var dataInicio = Ti.UI.createTextField({
        value: dataAtual.toLocaleString(),
        editable: false,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5
    });

    var btnEnviar = Ti.UI.createButton({ title: 'Enviar', top: 20 });
    btnEnviar.addEventListener('click', function() {
        alert('Formulário Enviado com Sucesso!');
        formView.close();
    });

    // Adicionando elementos ao formulário
    formView.add(labelVento);
    formView.add(escalaVento);
    formView.add(labelEspecies);
    formView.add(numEspecies);
    formView.add(labelCrias);
    formView.add(numCrias);
    formView.add(labelBarco);
    formView.add(tipoBarco);
    formView.add(labelComportamento);
    formView.add(comportamento);
    formView.add(labelData);
    formView.add(dataInicio);
    formView.add(btnEnviar);

    // Abrindo o formulário
    formView.open();
}

$.formMeta.add(mainView);

