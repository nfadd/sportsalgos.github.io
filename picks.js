import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { query, orderBy, limit, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user){
        window.location.href = '/login.html';
    }
});

const db = getFirestore(app);

const collRef = collection(db, "picks");
const q = query(collRef, orderBy("date", "desc"), limit(1));
const docSnap = await getDocs(q);

docSnap.forEach(doc => {
    for(let val in doc.data()){
        if (val != 'date'){
            let row = `<tr>
                            <td>${doc.data()[val].away_team}</td>
                            <td>${doc.data()[val].home_team}</td>
                            <td>${doc.data()[val].predicted_ml_to_spread}</td>
                            <td>${doc.data()[val].ml_to_spread_picks}</td>
                            <td>${doc.data()[val].grade}</td>
                        </tr>`;
            let table = document.getElementById('picks-body');
            table.innerHTML += row;
        }
    }
});

//Color Code for Picks Table
const colors = {
    "A": "#008000",
    "B": "#32cd32",
    "C": "#ffd700",
    "D": "#ff0000",
    "F": "#b22222"
}
for (const cell of document.getElementsByTagName("td")){
    if(cell.innerHTML == "A"){
        cell.style.backgroundColor = colors["A"];
    } else if(cell.innerHTML == "B"){
        cell.style.backgroundColor = colors["B"];
    } else if(cell.innerHTML == "C"){
        cell.style.backgroundColor = colors["C"];
    } else if(cell.innerHTML == "D"){
        cell.style.backgroundColor = colors["D"];
    } else if(cell.innerHTML == "F"){
        cell.style.backgroundColor = colors["F"]
    }
}