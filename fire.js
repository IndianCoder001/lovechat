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
const db = firebase.database();
if(sessionStorage.getItem("username")){
  var username = sessionStorage.getItem("username");
}else{
  var username = prompt("What's your name?");
  sessionStorage.setItem("username", username);
  
}

/***************************************FireBase Config********************************************/
/*Send Msg by Button*/
function sendMsg(){
  const btn = document.getElementById('send-btn');
  const mytxt = document.getElementsByClassName('outmsg');
  var msg_val = document.getElementById("msg_bar");
  var my_msg = msg_val.value.trim();
  var chat_win = document.getElementById('chat-window');
  var chat_name = chat_win.getElementsByTagName('a')[0];
  var to_user = chat_name.textContent;
  
  if (my_msg){
      var newBox = document.createElement("div");
      newBox.setAttribute("class","outmsg");
      document.getElementById("chat-body").appendChild(newBox);
      mytxt[mytxt.length-1].innerHTML = '<p>'+my_msg+'</p>';

      const timestamp = new Date();
      var sendTime = new Date().toLocaleString('en-US');
    
      db.ref("messages/"+ to_user +"/"+timestamp).set({
          fromUser: username,
          toUser: to_user,
          msg: my_msg,
          send: sendTime
      });

      var clr_typed_msg = document.getElementById("msg_bar").value="";
      var objDiv = document.getElementById("chat-window");
      objDiv.scrollTop = objDiv.scrollHeight-objDiv.clientHeight;
      
  }else{
      var clr_typed_msg = document.getElementById("msg_bar").value="";
      return;
  }
}



/*Incomming Msg*/
const fetchChat = db.ref("messages/"+username+"/");
fetchChat.on("child_added", function (snapshot) {
  var messages = snapshot.val();
  var chat_win = document.getElementById('chat-window');
  var chat_name = chat_win.getElementsByTagName('a')[0];
  var chat_user = chat_name.textContent;

  var fromUser = messages.fromUser;
  var incommingMsg = messages.msg;
  var SendDT = messages.send;
  if(fromUser == chat_user){
    
    const mytxt = document.getElementsByClassName('inmsg');
    var newinBox = document.createElement("div");
    newinBox.setAttribute("class","inmsg");
    document.getElementById("chat-body").appendChild(newinBox);
    mytxt[mytxt.length-1].innerHTML = '<p>'+incommingMsg+'</p>';
    
  }

  var objDiv = document.getElementById("chat-window");
  objDiv.scrollTop = objDiv.scrollHeight-objDiv.clientHeight;
  });

