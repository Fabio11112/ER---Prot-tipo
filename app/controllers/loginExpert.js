
$.btnLogin.addEventListener('click', function () {
    var email = $.emailField.value.trim();
    var password = $.passwordField.value.trim();
    
    console.log(email);
    console.log(password);
    
    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    var url = "https://wave-labs.org/";
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            console.log(JSON.stringify(e))
            Ti.API.info("Received text: " + this.responseText);
            alert('success');
        },
        onerror : function(e) {
            JSON.stringify(e);
            Ti.API.debug(e.error);
            alert('error');
        },
        timeout : 5000  
    });

    client.open("POST", url + "api/login");


    let jsonPost = {
        email: email,
        password: password
    }
    
    client.send(jsonPost);
});

