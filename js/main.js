const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

/***************************************FireBase Config********************************************/
const firebaseConfig = {
	apiKey: "AIzaSyChfPi3z7Nqn5Y0M19y8HTqklbmjsAcOcQ",
	authDomain: "webchatv001.firebaseapp.com",
	databaseURL: "https://webchatv001-default-rtdb.firebaseio.com",
	projectId: "webchatv001",
	storageBucket: "webchatv001.appspot.com",
	messagingSenderId: "366452806918",
	appId: "1:366452806918:web:bdf28121bcd5fb20527a87"
	};
firebase.initializeApp(firebaseConfig);
function sendMsg(){
		var user = document.getElementById("userName");
		var pass = document.getElementById("userPass");

		const dbRef = firebase.database().ref();
		dbRef.child("Users").child(user.value).get().then((snapshot) => {
			if (snapshot.exists()) {
				var users = snapshot.val();
				var pWord = users.password;
				if (pass.value == pWord){
					sessionStorage.setItem("username", user.value);
					document.getElementById('userName').value = "";
					document.getElementById('userPass').value = "";
					/*window.location.href = 'chat.html';*/
					console.log(sessionStorage.getItem("username"));
					if (sessionStorage.getItem("username")){
						//window.location.assign("index.html");
						window.open('chat.html','_self');
					}
					
				}
    			

			} else {
				alert("User Data Unavailable !");
				document.getElementById('userName').value = "";
				document.getElementById('userPass').value = "";
			}
		}).catch((error) => {
			console.error(error);
		});
		
	}
	