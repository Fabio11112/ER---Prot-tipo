// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const args = $.args;

$.buttonImage.addEventListener('click', function () {
    Ti.Media.openPhotoGallery({
        allowMultiple: true,
        success: function (event) {
            console.log(event);
            if (event.images) {

                event.images.forEach(image =>  addImagePreview(image));
                    
                if (event.media.nativePath) {
                    //$.imagePath.text = 'Caminho: ' + event.media.nativePath;
                } 
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

function onClicked(e) {
	//alert($.label.text);
	Alloy.createController('aceitarSugestao').getView().open();
}
