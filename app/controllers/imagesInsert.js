// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const args = $.args;
let test_user_id = 1;
let mime_test = 'image/jpeg';
let imagens = [];
let count = 0;

// var user = args.user;
// if((Object.keys(utilizador).length === 0))
// Ti.API.info("User: " + user);
// console.log();

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


