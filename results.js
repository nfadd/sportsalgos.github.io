import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { query, orderBy, limit, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

cbbResultsTable();

document.getElementById("sports").addEventListener("change", (e) => {
    let sports = document.getElementById("sports").value;
    if(sports == "cbb"){
        // console.log("CBB");
        hideRadioButtons();
        resetTable();
        cbbResultsTable();
    } else if (sports == "nba"){
        // console.log("NBA");
        hideRadioButtons();
        resetTable();
        nbaResultsTable();
    } else if (sports == "mlb"){
        // console.log("MLB");
        hideRadioButtons();
        showMoneylineRadioButtons();
        resetTable();
        const isMoneylineChecked = document.getElementById("moneyline").checked;
        mlbResultsTable(isMoneylineChecked);
    } else if (sports == "cfb"){
        // console.log("CFB");
        hideRadioButtons();
        showSpreadRadioButtons();
        resetTable();
        const isSpreadChecked = document.getElementById("spread").checked;
        cfbResultsTable(isSpreadChecked);
    } else if (sports == "nfl"){
        // console.log("NFL");
        hideRadioButtons();
        showSpreadRadioButtons();
        resetTable();
        const isSpreadChecked = document.getElementById("spread").checked;
        nflResultsTable(isSpreadChecked);
    } 
});

document.getElementById("moneyline").addEventListener("change", (e) => {
    resetTable();
    const isMoneylineChecked = document.getElementById("moneyline").checked;
    let sports = document.getElementById("sports").value;
    switch (sports) {
        case "mlb":
            mlbResultsTable(isMoneylineChecked);
            break;
        default:
            break;
    }
})

document.getElementById("over-under-moneyline").addEventListener("change", (e) => {
    resetTable();
    const isMoneylineChecked = document.getElementById("moneyline").checked;
    let sports = document.getElementById("sports").value;
    switch (sports) {
        case "mlb":
            mlbResultsTable(isMoneylineChecked);
            break;
        default:
            break;
    }
})

document.getElementById("spread").addEventListener("change", (e) => {
    resetTable();
    const isSpreadChecked = document.getElementById("spread").checked;
    let sports = document.getElementById("sports").value;
    switch (sports) {
        case "cfb":
            cfbResultsTable(isSpreadChecked);
            break;
        case "nfl":
            nflResultsTable(isSpreadChecked);
            break;
        default:
            break;
    }
})

document.getElementById("over-under-spread").addEventListener("change", (e) => {
    resetTable();
    const isSpreadChecked = document.getElementById("spread").checked;
    let sports = document.getElementById("sports").value;
    switch (sports) {
        case "cfb":
            cfbResultsTable(isSpreadChecked);
            break;
        case "nfl":
            nflResultsTable(isSpreadChecked);
            break;
        default:
            break;
    }
})


function resetTable(){
    let table = document.getElementById('results-body');
    table.innerHTML = "";

    let dateText = document.getElementById('results-date');
    dateText.innerHTML = "";
}

function showMoneylineRadioButtons() {
    let radioButtons = document.getElementById('radio-container-moneyline');
    radioButtons.style.display = "flex";
    let moneylineButton = document.getElementById('moneyline');
    moneylineButton.checked = true;
}

function showSpreadRadioButtons() {
    let radioButtons = document.getElementById('radio-container-spread');
    radioButtons.style.display = "flex";
    let spreadButton = document.getElementById('spread');
    spreadButton.checked = true;
}

function hideRadioButtons() {
    let radioButtonsMoneyline = document.getElementById('radio-container-moneyline');
    radioButtonsMoneyline.style.display = "none";
    let radioButtonsSpread = document.getElementById('radio-container-spread');
    radioButtonsSpread.style.display = "none";
}

async function cbbResultsTable() {
    const collRef = collection(db, "records");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('results-head');
    head.innerHTML =    `<tr>
                            <th>Grade</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Percent</th>
                            <th>Results</th>
                        </tr>`;

    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = `<tr>
                                <td>${doc.data()[val].grade}</td>
                                <td>${doc.data()[val].wins}</td>
                                <td>${doc.data()[val].losses}</td>
                                <td>${doc.data()[val].win_pct}</td>
                                <td>${doc.data()[val]['profit (units)']}</td>
                            </tr>`;
                let table = document.getElementById('results-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                let row = `<h2>Updated through games on ${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()}</h2>`;
                let dateText = document.getElementById('results-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function nbaResultsTable() {
    const collRef = collection(db, "nbarecords");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('results-head');
    head.innerHTML =    `<tr>
                            <th>Grade</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Percent</th>
                            <th>Results</th>
                        </tr>`;

    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = `<tr>
                                <td>${doc.data()[val].grade}</td>
                                <td>${doc.data()[val].wins}</td>
                                <td>${doc.data()[val].losses}</td>
                                <td>${doc.data()[val].win_pct}</td>
                                <td>${doc.data()[val]['profit (units)']}</td>
                            </tr>`;
                let table = document.getElementById('results-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                let row = `<h2>Updated through games on ${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()}</h2>`;
                let dateText = document.getElementById('results-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function mlbResultsTable(isML) {
    const collRef = collection(db, "mlbrecords");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('results-head');
    head.innerHTML =    `<tr>
                            <th>Grade</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Percent</th>
                            <th>Results</th>
                        </tr>`;

    let count = 0;
    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = '';
                if(isML) {
                    row = `<tr>
                                <td>${doc.data()[val].grade}</td>
                                <td>${doc.data()[val].wins}</td>
                                <td>${doc.data()[val].losses}</td>
                                <td>${doc.data()[val].win_pct}</td>
                                <td>${doc.data()[val]['profit (units)']}</td>
                            </tr>`;
                } else {
                    count++;
                    if (count <= 5) {
                        row = `<tr>
                                    <td>${doc.data()[val].grade}</td>
                                    <td>${doc.data()[val].totals_wins}</td>
                                    <td>${doc.data()[val].totals_losses}</td>
                                    <td>${doc.data()[val].totals_win_pct}</td>
                                    <td>${doc.data()[val]['totals profit (units)']}</td>
                                </tr>`;
                    }
                }
                let table = document.getElementById('results-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                let row = `<h2>Updated through games on ${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()}</h2>`;
                let dateText = document.getElementById('results-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function cfbResultsTable(isSpread) {
    const collRef = collection(db, "cfbrecords");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('results-head');
    head.innerHTML =    `<tr>
                            <th>Grade</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Percent</th>
                            <th>Results</th>
                        </tr>`;

    let count = 0;
    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = '';
                if(isSpread) {
                    row = `<tr>
                                <td>${doc.data()[val].grade}</td>
                                <td>${doc.data()[val].wins}</td>
                                <td>${doc.data()[val].losses}</td>
                                <td>${doc.data()[val].win_pct}</td>
                                <td>${doc.data()[val]['profit (units)']}</td>
                            </tr>`;
                } else {
                    count++;
                    if (count <= 5) {
                        row = `<tr>
                                    <td>${doc.data()[val].grade}</td>
                                    <td>${doc.data()[val].totals_wins}</td>
                                    <td>${doc.data()[val].totals_losses}</td>
                                    <td>${doc.data()[val].totals_win_pct}</td>
                                    <td>${doc.data()[val]['totals profit (units)']}</td>
                                </tr>`;
                    }
                }
                let table = document.getElementById('results-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                let row = `<h2>Updated through games on ${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()}</h2>`;
                let dateText = document.getElementById('results-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

async function nflResultsTable(isSpread) {
    const collRef = collection(db, "nflrecords");
    const q = query(collRef, orderBy("date", "desc"), limit(1));
    const docSnap = await getDocs(q);

    let head = document.getElementById('results-head');
    head.innerHTML =    `<tr>
                            <th>Grade</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Percent</th>
                            <th>Results</th>
                        </tr>`;

    let count = 0;
    docSnap.forEach(doc => {
        for(let val in doc.data()){
            if (val != 'date'){
                let row = '';
                if(isSpread) {
                    row = `<tr>
                                <td>${doc.data()[val].grade}</td>
                                <td>${doc.data()[val].wins}</td>
                                <td>${doc.data()[val].losses}</td>
                                <td>${doc.data()[val].win_pct}</td>
                                <td>${doc.data()[val]['profit (units)']}</td>
                            </tr>`;
                } else {
                    count++;
                    if (count <= 5) {
                        row = `<tr>
                                    <td>${doc.data()[val].grade}</td>
                                    <td>${doc.data()[val].totals_wins}</td>
                                    <td>${doc.data()[val].totals_losses}</td>
                                    <td>${doc.data()[val].totals_win_pct}</td>
                                    <td>${doc.data()[val]['totals profit (units)']}</td>
                                </tr>`;
                    }
                }
                let table = document.getElementById('results-body');
                table.innerHTML += row;
            } else if (val == 'date'){
                let epochDate = doc.data()[val];
                let date = new Date(epochDate*1000);
                let row = `<h2>Updated through games on ${(date.getMonth()+1)+"/"+(date.getDate())+"/"+date.getFullYear()}</h2>`;
                let dateText = document.getElementById('results-date');
                dateText.innerHTML += row;
            }
        }
    });
    gradeColor();
}

//Color Code for Results Table
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