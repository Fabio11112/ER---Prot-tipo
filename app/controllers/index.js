function doClick(e) {
	//alert($.label.text);
	Alloy.createController('backoffice').getView().open();
}
function doClick2(e) {
	//alert($.label.text);
	Alloy.createController('site').getView().open();
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


mainWindow.add(imageView);
//$.imageInitial.image = "../app/assets/android/images/res-long-land-baleia/unnamed.png";

mainWindow.open();

$.index.open();