function openAnimalDetails(e) {
    var animalName = e.source.id; // Identifica o animal pelo ID
    alert("És um  " + animalName);
    Alloy.createController('subespeciedetalhe').getView().open();
}
