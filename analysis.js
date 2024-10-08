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

mlbStreamlit();

document.getElementById("sports").addEventListener("change", (e) => {
    let sports = document.getElementById("sports").value;
    if(sports == "cbb"){
        // console.log("CBB");
    } else if (sports == "nba"){
        // console.log("NBA");
    } else if (sports == "mlb"){
        // console.log("MLB");
        mlbStreamlit();
    } else if (sports == "cfb"){
        cfbStreamlit();
        // console.log("CFB");
    } else if (sports == "nfl"){
        // console.log("NFL");
        nflStreamlit();
    }
});

function mlbStreamlit(){
    let head = document.getElementById('streamlit');
    head.innerHTML = `  <iframe
                            src="https://models-nqwojsvxamihjg3ds9g62p.streamlit.app/?embed=true"
                            width="100%"
                            height="100%"
                            frameborder="0">
                        </iframe>`;
}

function nflStreamlit(){
    let head = document.getElementById('streamlit');
    head.innerHTML = `  <iframe
                            src="https://models-b5t5kdor8q5kpbmkrqie9g.streamlit.app/?embed=True"
                            width="100%"
                            height="100%"
                            frameborder="0">
                        </iframe>`;
}

function cfbStreamlit(){
    let head = document.getElementById('streamlit');
    head.innerHTML = `  <iframe
                            src="https://models-jlshcb64h7nur85fq2a5tg.streamlit.app/?embed=True"
                            width="100%"
                            height="100%"
                            frameborder="0">
                        </iframe>`;
}