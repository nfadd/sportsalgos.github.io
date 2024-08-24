import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";
import { getCheckoutUrl } from "./processPayment.js";
import { priceConfig } from "./priceConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user){
        window.location.href = 'login.html';
    }
});

const subOptions = document.querySelectorAll(".subscribe-button");
let priceId;

subOptions.forEach((option) => {
    option.addEventListener("click", async (e) => {
        subOptions.forEach(option => option.classList.remove('active'));
        option.classList.add("active");

        priceId = option.id;
    });
})

document.getElementById("sign-up").addEventListener("click", async (e) => {
    var monthlySub = document.getElementById("monthly");
    var yearlySub = document.getElementById("yearly");

    if (monthlySub.classList.length == 1 && yearlySub.classList.length == 1) {
        monthlySub.setCustomValidity("Please Select a Membership Package");
        monthlySub.reportValidity();
    } else {
        monthlySub.setCustomValidity('');
        
        document.getElementsByClassName("subscribe-box")[0].style.display = "none";
        document.getElementsByClassName("back")[0].style.display = "none";
        document.getElementById("loader").style.display = "block";
        await getPayment();
        document.getElementById("loader").style.display = "none";
    }
});

const getPayment = async () => {
    try {
        let checkoutUrl;
        if (priceId == "monthly") {
            checkoutUrl = await getCheckoutUrl(app, priceConfig.monthlyLive);
        } else if (priceId == "yearly") {
            checkoutUrl = await getCheckoutUrl(app, priceConfig.yearlyLive);
        }
        window.location.href = checkoutUrl;
    } catch (error) {
        console.error(error);
    }
}