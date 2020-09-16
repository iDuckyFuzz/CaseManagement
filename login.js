// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'home.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
  };

  ui.start('#firebaseui-auth-container', uiConfig);

let count = 0;

/*This Script allows people to enter by using a form that asks for a
UserID and Password*/
function pasuser(form) {
    if (form.id.value == "PLW293") {
        if (form.pass.value == "Password123") {
            location = "home.html"
        } else {
            count++;
            console.print(count);
            alert("Invalid Password")
            if (count === 3) {
                alert("Your account has been locked please contact 1111!");
            }
        }
    } else {
        alert("Invalid UserID");
    }
}