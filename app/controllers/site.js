function LoginGuestClick(e) {
	//alert($.label.text);
	Alloy.createController('loginConvidado').getView().open();
}
function ExpertGuestClick(e) {
	//alert($.label.text);
	Alloy.createController('loginExpert').getView().open();
}