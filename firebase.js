var firebaseConfig = {
    apiKey: "AIzaSyD9mizDOAfWv3dT800DrM6_bymDKEedSZs",
    authDomain: "verification-php-d59bc.firebaseapp.com",
    projectId: "verification-php-d59bc",
    storageBucket: "verification-php-d59bc.appspot.com",
    messagingSenderId: "163187254628",
    appId: "1:163187254628:web:391b5949cd047c001cc671",
    measurementId: "G-7YT01VG9C5"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  
  window.onload = function () {
    render();
  };
  
  async function render() {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      await recaptchaVerifier.render();
    } catch (error) {
      console.error(error);
    }
  }
  
  var coderesult;
  
  async function phoneAuth() {
    var number = document.getElementById('number').value;
    try {
      await render();
      var confirmationResult = await firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult);
      alert("Message sent, please verify your phone number");
    } catch (error) {
      alert(error.message);
    }
  }
  
  function codeverify() {
    var code = document.getElementById('verification').value;
    if (window.confirmationResult) {
      window.confirmationResult.confirm(code).then(function (result) {
        alert("Successfully registered");
        var user = result.user;
        console.log(user);
      }).catch(function (error) {
        alert(error.message);
      });
    } else {
      alert("No confirmation result found.");
    }
  }