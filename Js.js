var host = "https://localhost:";
var port = "44360/";
var agenciesEndpoint = "api/Agencies/";
var advertisementsEndpoint = "api/get/";
var updateAdvertisementsEndpoint = "api/Advertisements/";
var loginEndpoint = "api/Authentication/login";
var registerEndpoint = "api/Authentication/register";
var searchAdvertisementsEndpoint = "api/search/";
var deleteEndpoint = "/api/Advertisements/{id}"
var formAction = "Create";
var editingId;
var jwt_token;

function showLogin(){
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("data").innerHTML = "";
}

function loadAdvertisements(){

    var requestUrl = host + port + advertisementsEndpoint;
    var headers = { 'Content-Type': 'application/json' };
	console.log("URL zahteva: " + requestUrl);
	fetch(requestUrl,{headers:headers})
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setAdvertisements);
			} else {
				console.log("Error occured with code " + response.status);
				//showError();
			}
		})
		.catch(error => console.log(error));
}

function loadAgencies() {
	var requestUrl = host + port + agenciesEndpoint;
	console.log("URL zahteva: " + requestUrl);
	fetch(requestUrl)
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setAgencies);
			} else {
				console.log("Error occured with code " + response.status);
			}
		})
		.catch(error => console.log(error));
};

function setAgencies(data) {
	var dropdown = document.getElementById("agencyName");
	dropdown.innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		var option = document.createElement("option");
		option.value = data[i].id;
		var text = document.createTextNode(data[i].name);
		option.appendChild(text);
		dropdown.appendChild(option);
	}
}


function setAdvertisements(data){
    var container = document.getElementById("data");

    console.log(data);

    var h1 = document.createElement("h1");
    container.appendChild(h1);
	h1.innerHTML = "Advertisements";
    container.appendChild(document.createElement("br"));
    var table = document.createElement("table");
	
    
    var tableBody = document.createElement("tbody");
    var tableHeader = document.createElement("thead");
	tableHeader.className = "prviHeader";
    
	var row = document.createElement("tr");
    var th1 = document.createElement("th") //.appendChild(document.createTextNode("ID"));
	var th1Text = document.createTextNode("Id");
	th1.appendChild(th1Text);
    var th2 = document.createElement("th") //.appendChild(document.createTextNode("Ime"));
	var th2Text = document.createTextNode("Title");
	th2.appendChild(th2Text);
    var th3 = document.createElement("th") //.appendChild(document.createTextNode("Prezime"));
	var th3Text = document.createTextNode("Type");
	th3.appendChild(th3Text);
    var th4 = document.createElement("th") //.appendChild(document.createTextNode("Prezime"));
	var th4Text = document.createTextNode("ConstructionYear");
	th4.appendChild(th4Text);
    var th5 = document.createElement("th") //.appendChild(document.createTextNode("Prezime"));
	var th5Text = document.createTextNode("AgencyName");
	th5.appendChild(th5Text);

    row.appendChild(th1);
    row.appendChild(th2);
    row.appendChild(th3);
    row.appendChild(th4);
    row.appendChild(th5);

    if(jwt_token){
            var th6 = document.createElement("th") 
	        var th6Text = document.createTextNode("Delete");
	        th6.appendChild(th6Text);
            row.appendChild(th6);
            var th7 = document.createElement("th") 
	        var th7Text = document.createTextNode("Update");
	        th7.appendChild(th7Text);
            row.appendChild(th7);
    }

	tableHeader.appendChild(row);

    for(var i=0; i<data.length; i++){
        var row1 = document.createElement("tr");

        var td1 = document.createElement("td") //.appendChild(document.createTextNode(data[i].id));
		var td1Text = document.createTextNode(data[i].id);
		td1.appendChild(td1Text);
        var td2 = document.createElement("td") //.appendChild(document.createTextNode(data[i].ime));
		var td2Text = document.createTextNode(data[i].title);
		td2.appendChild(td2Text);
        var td3 = document.createElement("td") //.appendChild(document.createTextNode(data[i].prezime));
		var td3Text = document.createTextNode(data[i].type);
		td3.appendChild(td3Text);
        var td4 = document.createElement("td") //.appendChild(document.createTextNode(data[i].prezime));
		var td4Text = document.createTextNode(data[i].constructionYear);
		td4.appendChild(td4Text);
        var td5 = document.createElement("td") //.appendChild(document.createTextNode(data[i].prezime));
		var td5Text = document.createTextNode(data[i].agencyName);
		td5.appendChild(td5Text);

        row1.appendChild(td1);
        row1.appendChild(td2);
        row1.appendChild(td3);
        row1.appendChild(td4);
        row1.appendChild(td5);

        if (jwt_token) {
            var stringId = data[i].id.toString();

            var buttonDelete = document.createElement("button");
            buttonDelete.name = stringId;
            buttonDelete.addEventListener("click", deleteAdvertisement);
            var buttonDeleteText = document.createTextNode("Delete");
            buttonDelete.appendChild(buttonDeleteText);
            var buttonDeleteCell = document.createElement("td");
            buttonDeleteCell.appendChild(buttonDelete);
            row1.appendChild(buttonDeleteCell);	

            var buttonEdit = document.createElement("button");
            buttonEdit.name = stringId;
            buttonEdit.addEventListener("click", editAdvertisement);
            var buttonEditText = document.createTextNode("Edit");
            buttonEdit.appendChild(buttonEditText);
            var buttonEditCell = document.createElement("td");
            buttonEditCell.appendChild(buttonEdit);
            row1.appendChild(buttonEditCell);
        }

        tableBody.appendChild(row1);
    }
    
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    
    container.appendChild(table);
}

function changeAdv(){

	var title = document.getElementById("title").value;
    var type = document.getElementById("type").value;
    var constructionYear = document.getElementById("constructionYear").value;
    var agencyId = document.getElementById("agencyName").value;

	var httpAction;
	var sendData;
	var url;

	
	if(formAction != "CREATE") {
		httpAction = "PUT";
		url = host + port + updateAdvertisementsEndpoint + editingId.toString();
		sendData = {
			"Id": editingId,
			"Title": title,
            "Type": type,
            "ConstructionYear": constructionYear,
            "AgencyId": agencyId
		};
	}

	console.log("Objekat za slanje");
	console.log(sendData);
	var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		
	}
	fetch(url, { method: httpAction, headers: headers, body: JSON.stringify(sendData) })
		.then((response) => {
			if (response.status === 200 || response.status === 201) {
				console.log("Successful action");
				formAction = "Create";
                document.getElementById("title").value = "";
				document.getElementById("type").value = "";
				document.getElementById("constructionYear").value = "";
				document.getElementById("data").innerHTML = "";
                loadAdvertisements();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
	return false;
}

function editAdvertisement() {
	var editId = this.name;
	var url = host + port + updateAdvertisementsEndpoint + editId.toString();
    var headers = { };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;
	}
	fetch(url,{ headers: headers})
		.then((response) => {
			if (response.status === 200) {
				console.log("Successful action");
				response.json().then(data => {
                    document.getElementById("kreirajForm").style.display = "block";
                  
					
					document.getElementById("title").value = data.title;
					document.getElementById("type").value = data.type;
					document.getElementById("constructionYear").value = data.constructionYear;
                    document.getElementById("agencyName").value = data.agencyName;
                    
					editingId = data.id;
					formAction = "Update";
				});
			} else {
				formAction = "Create";
				console.log("Error occured with code " + response.status);
				alert("Error ocured!");
			}
		})
		.catch(error => console.log(error));
};





function showRegistration() {
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("registerForm").style.display = "block";
}

function validateRegisterForm(username,email,password,confirmPassword){
    var usernameError = document.getElementById("usernameRegError");
    usernameError.innerHTML = "";
    var emailError = document.getElementById("emailRegError");
    emailError.innerHTML = "";
    var passwordError = document.getElementById("passwordRegError");
    passwordError.innerHTML = "";
    var confirmPassError = document.getElementById("confirmPassRegError");
    confirmPassError.innerHTML = "";

    var isValid = true;
    if(!username){
        usernameError.innerHTML = "This field can not be empty!";
        isValid = false;
    }
    if(!email){
        emailError.innerHTML = "This field can not be empty!";
        isValid = false;
    }
    if(!password){
        passwordError.innerHTML = "This field can not be empty!";
        isValid = false;
    }
    if(!confirmPassword){
        confirmPassError.innerHTML = "This field can not be empty!";
        isValid = false;
    }
    else if(confirmPassword != password){
        confirmPassError.innerHTML = "The input value does not match the value of password!";
        isValid = false;
    }

    return isValid;
}

function registerUser() {
	var username = document.getElementById("usernameRegister").value;
	var email = document.getElementById("emailRegister").value;
	var password = document.getElementById("passwordRegister").value;
	var confirmPassword = document.getElementById("confirmPasswordRegister").value;

	if (validateRegisterForm(username, email, password, confirmPassword)) {
		var url = host + port + registerEndpoint;
		var sendData = { "Username": username, "Email": email, "Password": password };
		fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200) {
					document.getElementById("registerForm");
					console.log("Successful registration");
					//alert("Successful registration");
					showLogin();
				} else {
					console.log("Error occured with code " + response.status);
					console.log(response);
					alert("Error occured!");
					response.text().then(text => { console.log(text); })
				}
			})
			.catch(error => console.log(error));
	}
	return false;
}

function validateLoginForm(username,password){
    var usernameError = document.getElementById("usernameLoginError");
    usernameError.innerHTML = "";
    var passwordError = document.getElementById("passwordLoginError");
    passwordError.innerHTML = "";

    var isValid = true;
    if(!username){
        usernameError.innerHTML = "This field can not be empty!";
        isValid = false;
    }
    if(!password){
        passwordError.innerHTML = "This field can not be empty!";
        isValid = false;
    }

    return isValid;
}

function loginUser(){
    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;

    if(validateLoginForm(username,password)){
        var url = host + port + loginEndpoint;
		var sendData = { "Username": username, "Password": password };
		fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200) {
					console.log("Successful login");
					alert("Successful login");
					response.json().then(function (data) {
						console.log(data);
						document.getElementById("info").innerHTML = "Prijavljeni korisnik: <b>" + data.username + "<b/>.";
                        document.getElementById("infoForm").style.display = "block";
                        document.getElementById("loginForm").style.display = "none";
						jwt_token = data.token;
                        document.getElementById("data").innerHTML = "";
						loadAdvertisements();
                        loadAgencies();
                        document.getElementById("searchForm").style.display = "block";
                        //document.getElementById("kreirajForm").style.display = "block";
                        //document.getElementById("line1").style.display = "block";
					});
				} else {
					console.log("Error occured with code " + response.status);
					console.log(response);
					alert("Desila se greska!");
				}
            })
			.catch(error => console.log(error));
    }
    return false;
}

function deleteAdvertisement(){
    var deleteID = this.name;
	var url = host + port + advertisementsEndpoint + deleteID.toString();
	var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		
	}
	fetch(url, { method: "DELETE", headers: headers})
		.then((response) => {
			if (response.status === 204) {
				console.log("Successful action");
                document.getElementById("data").innerHTML = "";
				loadAdvertisements();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
}

function searchAdvertisements(){
    var minimum = document.getElementById("searchMinimum").value;
    var maximum = document.getElementById("searchMaximum").value;
    var sendData = {
        "Minimum":minimum,
        "Maximum":maximum,
    };

    var url = host + port + searchAdvertisementsEndpoint ;
    var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		
	}

    console.log("Objekat za slanje");
	console.log(sendData);

    if(!minimum && !maximum){
        document.getElementById("data").innerHTML = "";
        loadAdvertisements();
        return false;
    }
	fetch(url, { method: "POST", headers: headers, body: JSON.stringify(sendData) })
		.then((response) => {
			if (response.status === 200) {
                document.getElementById("data").innerHTML = "";
				response.json().then(setAdvertisements);
			} else {
				console.log("Error occured with code " + response.status);
				//showError();
			}
		})
		.catch(error => console.log(error));
	return false;
}