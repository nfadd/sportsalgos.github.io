import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("sign-up").addEventListener("click", async (e) => {
    var email = document.getElementById("sign-up-email");
    var password = document.getElementById("sign-up-password");
    var confirm_password = document.getElementById("confirm-password");

    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
        confirm_password.reportValidity();
    } else {
        confirm_password.setCustomValidity('');

        //Sign up
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(async (userCredential) => {
                alert("Account successfully signed up");
                const user = userCredential.user;
                const uid = user.uid;
                
                setPersistence(auth, browserSessionPersistence);
                window.location.href = "subscribe.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if(errorCode == "auth/missing-email"){
                    email.setCustomValidity("Please enter an email");
                    email.reportValidity();
                } else if (errorCode == "auth/invalid-email"){
                    email.setCustomValidity("Invalid email");
                    email.reportValidity();
                } else if (errorCode == "auth/weak-password"){
                    password.setCustomValidity("Password must be at least 6 characters");
                    password.reportValidity();
                } else if (errorCode == "auth/email-already-in-use"){
                    email.setCustomValidity("Account already exists with this email");
                    email.reportValidity();
                }

                console.log(errorCode, errorMessage);
            });
    }
});