import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { query, orderBy, limit, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";
import { getPortalUrl } from "./processPayment.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user){
        window.location.href = 'login.html';
    }
});

const db = getFirestore(app);

// cbbTable();
mlbTable();

document.getElementById("sports").addEventListener("change", (e) => {
    let sports = document.getElementById("sports").value;
    if(sports == "cbb"){
        // console.log("CBB");
        resetTable();
        cbbTable();
    } else if (sports == "nba"){
        // console.log("NBA");
        resetTable();
        nbaTable();
    } else if (sports == "mlb"){
        // console.log("MLB");
        resetTable();
        mlbTable();
    } else if (sports == "cfb"){
        // console.log("CFB");
        resetTable();
        cfbTable();
    } else if (sports == "nfl"){
        // console.log("NFL");
        resetTable();
        nflTable();
    }
});

function resetTable(){
    let head = document.getElementById('picks-head');
    head.innerHTML = "";

    let table = document.getElementById('picks-body');
    table.innerHTML = "";

    let dateText = document.getElementById('picks-date');
    dateText.innerHTML = "";
}

async function cbbTable() {
    const collRef = collection(db, "picks");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('picks-head');
    head.innerHTML =    `<tr>
                            <th>Away Team</th>
                            <th>Home Team</th>
                            <th>Predicted Home Spread</th>
                            <th>Picks</th>
                            <th>Grade</th>
                        </tr>`;

    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = `<tr>
                                <td>${doc.data()[val].away_team.split("-").join(" ")}</td>
                                <td>${doc.data()[val].home_team.split("-").join(" ")}</td>
                                <td>${doc.data()[val].predicted_spread}</td>
                                <td>${doc.data()[val].spread_picks}</td>
                                <td>${doc.data()[val].grade}</td>
                            </tr>`;
                let table = document.getElementById('picks-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                date.setDate(date.getDate()+1);
                let row = `<h2>${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()} Picks</h2>`;
                let dateText = document.getElementById('picks-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function nbaTable() {
    const collRef = collection(db, "nbapicks");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('picks-head');
    head.innerHTML =    `<tr>
                            <th>Away Team</th>
                            <th>Home Team</th>
                            <th>Predicted Home Spread</th>
                            <th>Picks</th>
                            <th>Grade</th>
                        </tr>`;

    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = `<tr>
                                <td>${doc.data()[val].away_team_team_stat_team.split("-").join(" ")}</td>
                                <td>${doc.data()[val].home_team_team_stat_team.split("-").join(" ")}</td>
                                <td>${doc.data()[val].predicted_spread}</td>
                                <td>${doc.data()[val].spread_picks}</td>
                                <td>${doc.data()[val].grade}</td>
                            </tr>`;
                let table = document.getElementById('picks-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                date.setDate(date.getDate()+1);
                let row = `<h2>${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()} Picks</h2>`;
                let dateText = document.getElementById('picks-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function mlbTable() {
    const collRef = collection(db, "mlbpicks");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('picks-head');
    head.innerHTML =    `<tr>
                            <th>Away Team</th>
                            <th>Home Team</th>
                            <th>Win Probability</th>
                            <th>Picks</th>
                            <th>Grade</th>
                            <th>Over/Under Probability</th>
                            <th>Picks</th>
                            <th>Grade</th>
                        </tr>`;

    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = `<tr>
                                <td>${doc.data()[val].away_team_stats_team.split("-").join(" ")}</td>
                                <td>${doc.data()[val].home_team_stats_team.split("-").join(" ")}</td>
                                <td>${(doc.data()[val].win_pct_proba * 100).toFixed(2)}%</td>
                                <td>${doc.data()[val].win_pct_picks}</td>
                                <td>${doc.data()[val].grade}</td>
                                <td>${(doc.data()[val].totals_proba * 100).toFixed(2)}%</td>
                                <td>${doc.data()[val].total_points_picks}</td>
                                <td>${doc.data()[val].totals_grade}</td>
                            </tr>`;
                let table = document.getElementById('picks-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                date.setDate(date.getDate()+1);
                let row = `<h2>${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()} Picks</h2>`;
                let dateText = document.getElementById('picks-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function cfbTable() {
    const collRef = collection(db, "cfbpicks");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('picks-head');
    head.innerHTML =    `<tr>
                            <th>Away Team</th>
                            <th>Home Team</th>
                            <th>Home Win Probability</th>
                            <th>Picks</th>
                            <th>Grade</th>
                            <th>Over/Under Probability</th>
                            <th>Picks</th>
                            <th>Grade</th>
                        </tr>`;

    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = `<tr>
                                <td>${doc.data()[val].away_team_team_stat_team.split("-").join(" ")}</td>
                                <td>${doc.data()[val].home_team_team_stat_team.split("-").join(" ")}</td>
                                <td>${(doc.data()[val].predicted_home_win_pct * 100).toFixed(2)}%</td>
                                <td>${doc.data()[val].spread_picks}</td>
                                <td>${doc.data()[val].grade}</td>
                                <td>${(doc.data()[val].totals_proba * 100).toFixed(2)}%</td>
                                <td>${doc.data()[val].total_points_picks}</td>
                                <td>${doc.data()[val].totals_grade}</td>
                            </tr>`;
                let table = document.getElementById('picks-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                date.setDate(date.getDate()+1);
                let row = `<h2>${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()} Picks</h2>`;
                let dateText = document.getElementById('picks-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function nflTable() {
    const collRef = collection(db, "nflpicks");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('picks-head');
    head.innerHTML =    `<tr>
                            <th>Away Team</th>
                            <th>Home Team</th>
                            <th>Home Win Probability</th>
                            <th>Picks</th>
                            <th>Grade</th>
                            <th>Over/Under Probability</th>
                            <th>Picks</th>
                            <th>Grade</th>
                        </tr>`;

    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = `<tr>
                                <td>${doc.data()[val].away_team_team_stat_team.split("-").join(" ")}</td>
                                <td>${doc.data()[val].home_team_team_stat_team.split("-").join(" ")}</td>
                                <td>${(doc.data()[val].predicted_home_win_pct * 100).toFixed(2)}%</td>
                                <td>${doc.data()[val].spread_picks}</td>
                                <td>${doc.data()[val].grade}</td>
                                <td>${(doc.data()[val].totals_proba * 100).toFixed(2)}%</td>
                                <td>${doc.data()[val].total_points_picks}</td>
                                <td>${doc.data()[val].totals_grade}</td>
                            </tr>`;
                let table = document.getElementById('picks-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                date.setDate(date.getDate()+1);
                let row = `<h2>${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()} Picks</h2>`;
                let dateText = document.getElementById('picks-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

//Color Code for Picks Table
function gradeColor() {
    const colors = {
        "A": "#008000",
        "B": "#32cd32",
        "C": "#ffd700",
        "D": "#ff0000",
        "F": "#b22222",
        "Odds < -150": "#87CEEB",
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
            cell.style.backgroundColor = colors["F"];
        } else if(cell.innerHTML == "Odds &lt; -150"){
            cell.style.backgroundColor = colors["Odds < -150"];
        }
    }
}

document.getElementById("search-bar").addEventListener("keyup", (e) => {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search-bar");
    filter = input.value.toLowerCase();
    table = document.getElementById("picks-body");
    tr = table.getElementsByTagName("tr");

    for (i=0; i<tr.length; i++){
        td = tr[i].getElementsByTagName("td");
        for (j=0; j<td.length; j++){
            if (td[j].innerHTML.indexOf(filter) > -1){
                found = true;
            }
        }
        if (found){
            tr[i].style.display = "";
            found= false;
        } else {
            tr[i].style.display = "none";
        }
    }
});

document.getElementById("manage-subscription").addEventListener("click", async (e) => {
    document.getElementById("loader").style.display = "block";
    const portalUrl = await getPortalUrl(app);
    window.location.href = portalUrl;
    document.getElementById("loader").style.display = "none";
});