var url = "https://wave-labs.org/";



let userable_type = 'UserPerson';


$.registerButton.addEventListener('click', function () {

    let email = $.emailField.value.trim();
    let password = $.passwordField.value.trim();   
    let name = $.nameField.value.trim();

    if (!email || !password || !name) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            console.log("Objeto e: "+ JSON.stringify(e));
            Ti.API.info("Received text: " + this.responseText);
            alert('success');
        },
        onerror : function(e) {
            console.log("Objeto e: "+ JSON.stringify(e));
            Ti.API.debug(e.error);
            
            alert('error');
        },
        timeout : 5000  
    });

    

    let jsonPost = {
        email: email,
        password: password,
        name: name,
        userable_type: userable_type
    }

    client.open("POST", url + "api/register");
    client.send(jsonPost);

});
