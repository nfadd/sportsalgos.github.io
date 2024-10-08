import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";
import { getSubscriptionStatus } from "./getSubscriptionStatus.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("submit").addEventListener("click", (e) => {
    //Sign in

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid; 

            setPersistence(auth, browserSessionPersistence);
            // window.location.href = "picks.html";

            const status = await getStatus(app);
            if (status) {
                // window.location.href = "picks.html";
                window.location.href = "member_landing_page.html";
            } else {
                alert("No active subscriptions found");
                window.location.href = "subscribe.html";
            }
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
                password.setCustomValidity("Incorrect email or password");
                password.reportValidity();
                // alert("Incorrect email or password");
            }
        });
});

const getStatus = async (app) => {
    try {
        const subStatus = await getSubscriptionStatus(app);
        return subStatus;
    } catch (error) {
        console.error(error);
    }
};