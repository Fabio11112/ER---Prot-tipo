function doClick(e) {
	//alert($.label.text);
	Alloy.createController('imagesInsert').getView().open();
}
function doClick2(e) {
	//alert($.label.text);
	Alloy.createController('site').getView().open();
}

function doClick3(e) {
	//alert($.label.text);
	Alloy.createController('especie').getView().open();
}

var mainWindow = Ti.UI.createWindow({
    backgroundColor: '#ffffff',
    layout: 'vertical' 
});


var imageView = Ti.UI.createImageView({
    image: 'images/baleialogo/unnamed.png', 
    width: '80%', 
    height: Ti.UI.SIZE, 
    top: 20 
});
