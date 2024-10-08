import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user){
        window.location.href = 'login.html';
    }
});

document.getElementById('picks').addEventListener('click', (e) => {
    window.location.href = 'picks.html';
})

document.getElementById('analysis').addEventListener('click', (e) => {
    window.location.href = 'analysis.html';
})