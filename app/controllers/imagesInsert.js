// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const args = $.args;
let test_user_id = 23;
let mime_test = 'image/jpeg';
let images = [];
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
    let imageModel = 
        {
            image: image.media.text,
            user_id: test_user_id,
            mime: image.media.mimeType
        };
        // images[images[${count}]] = {
        //     image: imageModelData
        
        // };

    
    images.push(imageModel);
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
function createFormData(images) {
    let formData = {};
    images.forEach((img, index) => {
        let file = Ti.Filesystem.getFile(img.image.nativePath);
        formData[`file_${index}`] = file;
    });
    formData['user_id'] = test_user_id;
    formData['mime'] = mime_test;

    return formData;
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

    console.log(url + "uploadImage");
    
    client.open("POST", url + "uploadImage");
    client.send(fromArrayToJSON(images)); // Enviar requisição GET
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