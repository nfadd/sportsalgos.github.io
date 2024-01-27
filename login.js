import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("submit").addEventListener("click", (e) => {
    //Sign in

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;

            setPersistence(auth, browserSessionPersistence);

            window.location.href = "picks.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage);

            if (errorCode == "auth/invalid-email"){
                email.setCustomValidity("Invalid email");
                email.reportValidity();
            } else if (errorCode == "auth/missing-email"){
                email.setCustomValidity("Please enter an email");
                email.reportValidity();
            } else if (errorCode == "auth/invalid-login-credentials"){
                // password.setCustomValidity("Email or password do not match");
                // password.reportValidity();
                alert("Incorrect email or password");
            }
        });
});


