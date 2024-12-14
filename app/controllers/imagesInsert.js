// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const args = $.args;
let test_user_id = 23;
let mime_test = 'image/jpeg';
let imagens = [];
let count = 0;


let url = "http://10.0.2.2:8000/api/";

$.buttonImage.addEventListener('click', function () {

    Ti.Media.openPhotoGallery({
        allowMultiple: true,
        success: function (event) {
            console.log(event);
            if (event.images) {

                event.images.forEach(image =>  addImagePreview(image));
                    
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
        height: 100,
        borderColor: '#000',
        borderWidth: 1,
        left: "10%"
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
    var client = Ti.Network.createHTTPClient({
        
        onload: function(e) {
            try {
                const response = this.responseText ? JSON.parse(this.responseText) : null;
                if (response) {
                    console.log("Resposta do servidor: ", response);
                    alert("Imagens enviadas com sucesso: " + response.message);
                    return;
                }
                console.log("Resposta do servidor: ", response);
                alert("Problema ao enviar as imagens: " + response.message);

            } catch (err) {
                console.error("Erro ao processar resposta!!!!!", err);
            }
        },
        onerror: function(e) {
            console.log("Exception Error caught: " + e.error);
            Ti.API.debug(e.error);
        },
        timeout: 5000 // Timeout em milissegundos
    });


    let requestObject = {};

    requestObject['user_id'] = test_user_id;
    requestObject['mime'] = mime_test;
    
    imagens.forEach((image, index) => {
        requestObject[`image[${index}]`] = image;
    });



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


