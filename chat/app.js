


function startChat(id) {
  document.getElementById('chatPanel').removeAttribute('style');
  document.getElementById('starter').setAttribute('style', 'display:none');
  back();
}

function chatList() {
  document.getElementById('chatlist').classList.remove('d-none', 'd-md-block');
  document.getElementById('chatPanel').classList.add('d-none');
  // document.getElementById('starter').classList.add('d-none');
}
function back() {
  document.getElementById('chatPanel').classList.remove('d-none', 'd-md-block');
  document.getElementById('chatlist').classList.add('d-none');
}


function sendMessage() {
  document.getElementById('sMsg').removeAttribute('style');
  var message = `<div class="msg2 row">
   <img src="img/profile.png" class="send" alt="">
   <div class="message  sendMsg">
       <div id="senderMsg" class="text">
       ${document.getElementById('textMsg').value}
       </div>
       <div class="time underName float-right">12:30 pm</div> 
   </div> </div>
 `

  document.getElementById('sMsg').innerHTML += message;
  document.getElementById('textMsg').value = '';
  document.getElementById('textMsg').focus();
  document.getElementById('msgBox').scrollTo(0, document.getElementById('msgBox').clientHeight);
}
//////////////////////////////////////////////




////////////////////////////////
function signinFb() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.displayName)
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
function signinGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;


    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
function signout() {
  firebase.auth().signOut();
  alert('signout')
  document.getElementById('userName').innerHTML = "";
  document.getElementById('signout').style = "display:none";
  document.getElementById('signin').style = "";
}
function firebaseStateChange() {
  firebase.auth().onAuthStateChanged(onStateChanged);
}

function onStateChanged(user) {
  if (user) {

    userlist();
    document.getElementById('userName').innerHTML += firebase.auth().currentUser.displayName;

    // alert(firebase.auth().currentUser.email+"\n"+firebase.auth().currentUser.displayName);
    document.getElementById('signin').style = "display:none"
    document.getElementById('signout').style = ""
    // document.getElementById('userImg').src=firebase.auth().currentUser.photoURL;
    // document.getElementById('userImg').title = firebase.auth().currentUser.displayName;
  }
  else {
    document.getElementById('userImg').src = "img/profile.png";
    document.getElementById('userImg').title = "";

    document.getElementById('signin').style = "";
    document.getElementById('signout').style = "display:none";

  }
}




var db = firebase.database().ref("userlist");
////////////////////
function userlist() {
  var flag = false;
  var user = {
    key: db.push().key,
    name: firebase.auth().currentUser.displayName,
    email: firebase.auth().currentUser.email,
    photoURL: firebase.auth().currentUser.photoURL
  }

  // db.push(user)
  db.on('value', function (data) {
    var allUser = data.val()
    db.on('value', function (data) {
      var userData = data.val()

      // console.log(userData)
      console.log(Object.keys(userData).length)
      for (i = 0; i < Object.keys(userData).length; i++) {
        var key = Object.keys(userData)[i];
        value = userData[key]

        console.log(value.email);
        if (value.email === user.email) {
          flag = true;
          break;

        }
      }


      if (value.email === user.email) {
        flag = true;

      } else {
        flag = false;
      }
      if (flag == false) {
        db.push(user)
     
      }
    })

  })

}////////////////


firebaseStateChange();