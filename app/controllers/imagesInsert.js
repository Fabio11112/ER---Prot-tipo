// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const args = $.args;
let test_user_id = 1;
let mime_test = 'image/jpeg';
let imagem;
let count = 0;

var user = JSON.parse(Titanium.App.Properties.getString("utilizador")) || {};
console.log("User: " + JSON.stringify(user));

$.formMeta.hide();

let url = "http://10.0.2.2:8000/api/";
let urlAI = "http://wave-labs.org/api/ai-detection/";
// $.buttonImage.addEventListener('click', function () {

//     Ti.Media.openPhotoGallery({
//         allowMultiple: false,
//         success: function (event) {
//             console.log(event);
//             if (event.images) {

//                 event.images.forEach(image => addImagePreview(image));

//             }
//             else{
//                 label = Ti.UI.createLabel({
//                     text: 'Caminho: ' + event.media.nativePath,
//                     color: '#000',
//                     font: { fontSize: 20 },
//                 });
//                 $.imagesList.add(label);
//             }
//         },
//         error: function (error) {
//             alert('Erro ao abrir a galeria de fotos: ' + error.code);
//         },
//         mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
//     });
// });

$.buttonImage.addEventListener('click', function () {

    Ti.Media.openPhotoGallery({
        allowMultiple: false,
        success: function (event) {
            console.log(event);
            if (event.media) {
                console.log("dentro do if");
                imagem = event.media;
                addImagePreview(event.media);

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
            image: image,
            user_id: user.user.id,
            mime: image.mimeType
        };

    

    
    
    const newImageView = Ti.UI.createImageView({
        image: image,
        width: "80%",
        height: 170,
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




async function onClicked(e) {
    console.log("CLICKED!!!\n");
   
    if(Object.keys(user).length !== 0){
        let metadadoCreatedId = await criaMetadados(elementos);
        console.log("idddddddddd",metadadoCreatedId);
        submeterImagem(metadadoCreatedId)
    }else{
        submeterImagem(0)
    }

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

    // let requestObject = {};

    // requestObject['user_id'] = test_user_id;
    // requestObject['mime'] = mime_test;
    // // requestObject['metado_id'] = metadadoCreatedId;


    
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

function submeterImagem(metadado_id){
    console.log("Metado:",metadado_id);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                const response = this.responseText ? JSON.parse(this.responseText) : null;
                if (response) {
                    console.log("Resposta do servidor: ", response);
                    alert("Metadados enviados com sucesso: " + response.message);
                    return;
                }
                console.log("Resposta do servidor: ", response);
                alert("Problema ao enviar os metadados: " + response.message);

            } catch (err) {
                console.error("Erro ao processar resposta!!!!!", err);
            }
        },
        onerror: function(e) {
            console.log("Exception Error caught: " + e.error);
            Ti.API.debug(e.error);
            console.log(JSON.stringify(e));
        },
        timeout: 5000 // Timeout em milissegundos
    });

    let requestObject = {};

    requestObject['utilizador_id'] = user.user.id;
    requestObject['mime'] = mime_test;

    requestObject['metadado_id'] = metadado_id;
    
    requestObject['image'] = imagem;

    requestObject['name'] = "nome_imagem";
    

    console.log(url + "uploadImage");

    client.open("POST", url + "uploadImage");
    client.send(requestObject); // Enviar requisição GET
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
    elementos = formularioMetadados();
    var labelAutenticado = Ti.UI.createLabel({
        text: 'Usuário Autenticado',
        color: '#000',
        font: { fontSize: 18 },
    });
    mainView.add(labelAutenticado);


    var switchButton = Ti.UI.createSwitch({
        style: Ti.UI.SWITCH_STYLE_SLIDER,
        textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
        title:'Metadados',
        value:false,
        width: 300 // necessary for textAlign to be effective
      });
      

    $.box.add(switchButton);

    switchButton.addEventListener('change', function (e) {
        console.log(JSON.stringify(e));

        if (e.value === true) {
            $.formMeta.show();
        }else{
            $.formMeta.hide();
        }
    });


    // selectBox.add(pickerData);
    
    // selectBox.addEventListener('change', function (e) {
    //     if (e.row.title === 'Sim') {
    //         $.formMeta.show();
    //     }else{
    //         $.formMeta.hide();
    //     }
    // });
    
    
    // $.box.add(selectBox);
    
}

function formularioMetadados() {
    // Create a ScrollView
    var scrollView = Ti.UI.createView({
        layout: 'vertical',
        backgroundColor: '#f8f8f8',
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 10
    });
    var labelLatitude = Ti.UI.createLabel({ text: 'Latitude:', top: 20, left: 10 });
    var latitudeField = Ti.UI.createTextField({
        hintText: 'Digite a latitude',
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD, // Permite números decimais
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5
    });

    var labelLongitude = Ti.UI.createLabel({ text: 'Longitude:', top: 20, left: 10 });
    var longitudeField = Ti.UI.createTextField({
        hintText: 'Digite a longitude',
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD, // Permite números decimais
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5
    });

    // Elementos do formulário
    var labelVento = Ti.UI.createLabel({ text: 'Escala do Vento:', top: 20, left: 10 });
    var escalaVento = Ti.UI.createTextField({
        hintText: 'Digite a escala do vento',
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: '80%', top: 5,
        name: 'escalaVento'
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

    // Adicionando elementos ao ScrollView
    scrollView.add(labelVento);
    scrollView.add(escalaVento);
    scrollView.add(labelEspecies);
    scrollView.add(numEspecies);
    scrollView.add(labelCrias);
    scrollView.add(numCrias);
    scrollView.add(labelBarco);
    scrollView.add(tipoBarco);
    scrollView.add(labelComportamento);
    scrollView.add(comportamento);
    scrollView.add(labelData);
    scrollView.add(dataInicio);
    scrollView.add(labelLatitude);
    scrollView.add(latitudeField);
    scrollView.add(labelLongitude);
    scrollView.add(longitudeField);
    $.formMeta.add(scrollView); 

    elements = {
        escalaVento: escalaVento,
        numEspecies: numEspecies,
        numCrias: numCrias,
        tipoBarco: tipoBarco,
        comportamento: comportamento,
        dataInicio: dataInicio,
        latitudeField: latitudeField,
        longitudeField: longitudeField
    }
    return elements;
}
async function criaMetadados(elementos) {
    console.log("CRIAR Metadados");

    var metadados = {
        utilizador_id: user.user.id || null,
        escalaVento: elementos.escalaVento.value || null, 
        numEspecies: parseInt(elementos.numEspecies.value) || null,
        numCrias: parseInt(elementos.numCrias.value) || null, 
        tipoBarco: elementos.tipoBarco.value || null, 
        comportamento: elementos.comportamento.value || null,
        dataInicio: elementos.dataInicio.value || null,
        latitude: elementos.latitudeField.value || null,
        longitude: elementos.longitudeField.value || null
    };

    console.log('Metadados:', metadados);

    // Verifica se há dados válidos
    if ((user.user.id !== null) && (
        metadados.escalaVento !== null ||
        metadados.numEspecies !== null ||
        metadados.numCrias !== null ||
        metadados.tipoBarco !== null ||
        metadados.comportamento !== null ||
        metadados.dataInicio !== null ||
        metadados.latitude !== null ||
        metadados.longitude !== null
    )) {
        console.log("DENTRO DO IF");

        return new Promise((resolve, reject) => {
            let url = "http://10.0.2.2:8000/api";
            let client = Ti.Network.createHTTPClient({
                onload: function (e) {
                    console.log("Entrou onload");
                    try {
                        let response = JSON.parse(this.responseText);
                        console.log("Metadado criado com sucesso!");
                        console.log("ID do metadado criado: ", response.id_metadado);

                        // Resolve a Promise com o ID do metadado
                        resolve(response.id_metadado);
                    } catch (err) {
                        console.error("Erro ao processar resposta:", err);
                        reject(err); // Rejeita a Promise em caso de erro
                    }
                },
                onerror: function (e) {
                    console.error("Erro ao inserir metadado: ", e.error);
                    console.error("Status Code: ", this.status);
                    console.error("Response Text: ", this.responseText);
                    reject(e.error); // Rejeita a Promise em caso de erro
                },
                timeout: 5000
            });

            console.log("ANTES DO POST");
            client.open("POST", url + "/metadado");
            console.log("DEPOIS DO POST");

            // Envia os dados para o servidor
            client.send({
                "beaufourt_scale": metadados.escalaVento,
                "qnt_avistamentos": metadados.numEspecies,
                "num_crias": metadados.numCrias,
                "empresa_barcos": metadados.tipoBarco,
                "comportamento_especies": metadados.comportamento,
                "data_hora_avistamento": metadados.dataInicio,
                "utilizador_id": metadados.utilizador_id,
                "latitude": metadados.latitude,
                "longitude": metadados.longitude
            });

            console.log("DEPOIS DO SEND");
        });
    } else {
        throw new Error("Dados insuficientes para criar metadados.");
    }
}


// async function criaMetadados(elementos){
// 	console.log("CRIAR Metados");
//     var metadados = {
//         utilizador_id: user.user.id || null,
//         escalaVento: elementos.escalaVento.value || null, 
//         numEspecies: parseInt(elementos.numEspecies.value) || null,
//         numCrias: parseInt(elementos.numCrias.value) || null, 
//         tipoBarco: elementos.tipoBarco.value || null, 
//         comportamento: elementos.comportamento.value || null,
//         dataInicio: elementos.dataInicio.value || null ,
//         latitude: elementos.latitudeField.value || null,
//         longitude: elementos.longitudeField.value || null
//     };
    

//     console.log('Metadados:', metadados);

//     if((user.user.id!==null)&&(metadados.escalaVento !== null || metadados.numEspecies !== null || metadados.numCrias !== null || metadados.tipoBarco !== null || metadados.comportamento !== null || metadados.dataInicio !== null || metadados.latitude !== null || metadados.longitude !== null)){
// 		console.log("DENTRO DO IF");
// 		let url = "http://10.0.2.2:8000/api";
// 		let client= Ti.Network.createHTTPClient({
// 			onload: function(e){
// 				console.log("Entrou onload");
// 				try{
//                     let response = JSON.stringify(e)
// 					console.log(response);
// 					console.log("Metadado criado com sucesso!");
//                     console.log("ID do metadado criado: ", e.source.responseDictionary.id_metadado);
// 				}
// 				catch(err){
// 					console.log(JSON.stringify(e));
// 					console.error("Erro ao processar resposta:", err);
// 				}
//                 return e.source.responseDictionary.id_metadado;
// 			},
// 			onerror:function(e){
// 				console.log(JSON.stringify(e));
// 				Ti.API.debug(e.error);
// 				console.error("Erro ao inserir metadado: ", e.error);
// 				console.error("Status Code: ", this.status);
// 				console.error("Response Text: ", this.responseText);
// 			},
// 			timeout:5000
// 		});
// 		console.log("ANTES DO POST");
// 		console.log(url);
// 		client.open("POST", url + "/metadado");
// 		console.log("depois DO POST");
// 		client.send({"beaufourt_scale": metadados.escalaVento, "qnt_avistamentos": metadados.numEspecies, "num_crias": metadados.numCrias, "empresa_barcos": metadados.tipoBarco, "comportamento_especies": metadados.comportamento, "data_hora_avistamento": metadados.dataInicio, "utilizador_id": user.user.id, "latitude": metadados.latitude, "longitude": metadados.longitude});
// 		console.log("depois DO SEND");
//     }
// }

