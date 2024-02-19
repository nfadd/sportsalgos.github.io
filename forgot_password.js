import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("submit").addEventListener("click", (e) => {
    //Send Forgot Password Email

    var email = document.getElementById("email");

    sendPasswordResetEmail(auth, email.value)
        .then((userCredential) => {
            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage);
        });
    
    if (alert("Reset password link sent to email")) 
        {}
    else
        window.location.href = "login.html";
});
