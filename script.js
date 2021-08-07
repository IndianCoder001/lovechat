window.addEventListener("beforeunload", function(event) {
    event.returnValue = "Are You Sure !";
});
document.addEventListener("contextmenu", function(e){
  e.preventDefault();
}, false);
document.addEventListener("keydown", function(e){
  if (e.ctrlKey || e.keyCode==123) {
    e.stopPropagation();
    e.preventDefault();
  }
});
/*Search User in SideBar*/
function searchUserName() {
    var input, filter,nouser,j , ul, li, a, i, txtValue;
    input = document.getElementById("user_search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("allUser");
    nouser = document.getElementById("nouser");
    li = ul.getElementsByTagName("li");
    j=0
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            nouser.style.display = "none";
        } else {
            j=j+1
            li[i].style.display = "none";	
        }
    }
    if (li.length==j) {
            nouser.style.display = "";
    }
}

/*User Data*/

function userData(uName,uProfile){
    var uName,uProfile;
    var chat_win = document.getElementById('chat-window');
    var chat_name = chat_win.getElementsByTagName('a')[0];
    var chat_img = chat_win.getElementsByTagName('img')[0];
    chat_name.textContent = uName;
    chat_img.setAttribute("src",uProfile);
    var username = sessionStorage.getItem("username");
    document.getElementById('chat-body').innerHTML = ""; /*Clear Body*/

    /*Update Msg*/
    var msgDATAS = [];
    var msgDATALEN, i, msgARRAY;
    
    const updateChatX = db.ref("messages/"+username+"/");
    updateChatX.once("child_added", function (snapshot) {
        var messages1 = snapshot.val();
        var fromUser1 = messages1.fromUser;
        var toUser1 = messages1.toUser;
        var incommingMsg1 = messages1.msg;
        var sendDT1 = messages1.send;
        msgDATAS.push({from:fromUser1,to:toUser1,msg:incommingMsg1,SorR:"recv",sendTime:sendDT1});
    });

    const updateChatY = db.ref("messages/"+uName+"/");    
    updateChatY.once("child_added", function (snapshot) {
        var messages2 = snapshot.val();
        var fromUser2 = messages2.fromUser;
        var toUser2 = messages2.toUser;
        var outgoingMsg2 = messages2.msg;
        var sendDT2 = messages2.send;
        msgDATAS.push({from:fromUser2,to:toUser2,msg:outgoingMsg2,SorR:"send",sendTime:sendDT2});
    });

    msgDATAS.sort(function(a, b){
        return new Date(a.sendTime) - new Date(b.sendTime);
    });

    msgDATALEN = msgDATAS.length;
    for (i = 0; i < msgDATALEN; i++) {
        msgARRAY = msgDATAS[i];
        if(msgARRAY["SorR"] === "recv"){

            if(msgARRAY["from"] == uName){
                const mytxt = document.getElementsByClassName('inmsg');
                var newinBox = document.createElement("div");
                newinBox.setAttribute("class","inmsg");
                document.getElementById("chat-body").appendChild(newinBox);
                mytxt[mytxt.length-1].innerHTML = '<p>'+msgARRAY['msg']+'</p>'; 
            }
        }
        
        if(msgARRAY["SorR"] === "send"){
            
            if(msgARRAY["to"] == uName){            
                const mytxt = document.getElementsByClassName('outmsg');
                var newinBox = document.createElement("div");
                newinBox.setAttribute("class","outmsg");
                document.getElementById("chat-body").appendChild(newinBox);
                mytxt[mytxt.length-1].innerHTML = '<p>'+msgARRAY['msg']+'</p>';
            }
        }
    }




    var objDiv = document.getElementById("chat-window");
    objDiv.scrollTop = objDiv.scrollHeight-objDiv.clientHeight;
    
    
}


