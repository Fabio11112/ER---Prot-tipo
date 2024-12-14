// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const args = $.args;
let test_user_id = 23;
let mime_test = 'image/jpeg';
let images = [];


let url = "http://backoffice_er.test/";

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
            image: image,
            user_id: test_user_id,
            mime: mime_test
        };
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

$.buttonOk.addEventListener('click', onClicked);

function onClicked(e) {
    console.log("CLICKED!!!\n");
	//alert($.label.text);
	//Alloy.createController('aceitarSugestao').getView().open();
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            try {
                if (response.data && response.data.length > 0) {
                   console.log(response)
                }
                else {
                    console.log("Erro ao processar resposta!!!!!")
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

    console.log(url + "uploadImage");
    
    client.open("POST", url + "uploadImage");
    client.send(images); // Enviar requisição GET
}
