let paraulaSecreta;
let paraulaSecretaArray = [];
let paraulaSecretaArrayDisplay = [];
let paraulah2 = document.getElementById("paraula-display")
let puntsPactual = 0;
let totalPartidas = 0;
let partidasGuanyades = 0;
let winStreak = 1;
let maximPunts = 0;
paraulah2.textContent = "COMENCEM"
let valorDeLaLletra;
let nJugades = 10;
let imatgepenjat = document.getElementById("imgPenjat");
let imgNumJugades = 0;
desactivarLletres()
//Funcio que s'executa quan li donem al boto començar partida
function començem() {
    //Agafem la paraula i comprovem que hi hagi una paraula i que sigui mes gran que 3 i que no tingui numeros
    paraulaSecreta = String(document.getElementById("introdueix_paraula").value).toLowerCase()
    if (!paraulaSecreta) {
        alert("Has d'afegir una paraula per poder començar a jugar")
    } else {
        if (paraulaSecreta.match(/\d/) !== null) {
            alert("La paraula no pot contenir números")
        } else {
            if (paraulaSecreta.length <= 3) {
                alert("La paraula ha de contenir més de 3 caràcters")
            } else {
                //Fem el disable dels buttons
                document.getElementById("introdueix_paraula").disabled = true;
                document.getElementById("btn-comencem").disabled = true;
                document.getElementById("eye").disabled = true;
                //Creem la Array amb la paraula amb el split si te espai i si no amb el Array.from
                if (paraulaSecreta.indexOf(" ") > -1) {
                    paraulaSecretaArray = paraulaSecreta.split(" ")
                } else {
                    paraulaSecretaArray = Array.from(paraulaSecreta)
                }
                nJugades = 10;
                puntsPactual = 0
                winStreak = 1;
                imgNumJugades = 0
                document.getElementById("njugadas").textContent = nJugades
                document.getElementById("ppactual").textContent = puntsPactual
                document.getElementById("totalPartidas").textContent = totalPartidas
                document.getElementById("partidesGuanyades").textContent = partidasGuanyades
                imatgepenjat.src = "imgs/penjat_" + imgNumJugades + ".jpg"
                //Posem els guions a la paraula del mitg
                let paraulaaux = ""
                for (i = 0; i < paraulaSecreta.length; i++) {
                    paraulaaux += "- "
                    paraulaSecretaArrayDisplay[i] = "-"
                }
                for(j=0;j<paraulaSecretaArrayDisplay.length;j++){
                    paraulaSecretaArrayDisplay[j] = "-"
                }
                paraulah2.textContent = paraulaaux
                activarLletres()
            }
        }
    }
    document.getElementById("divh2paraula").style.backgroundColor = "white"
}

//Funcio per a canviar la visibilitat de la paraula secreta
function canviarVisible() {
    let x = document.getElementById("introdueix_paraula");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
//Funcio per a treure el valor de la lletra preumda i desactivarlo
function getLletra(valor) {
    valorDeLaLletra = valor.textContent.toLowerCase()
    comprovacions()
    desactivarLletra(valor.id)
}
//Funcio que per a modificar l'array i imprimir-lo i comprovar si has guanyat o no
function comprovacions() {
    let auxiliarP2 = "";
    if (paraulaSecretaArray.includes(valorDeLaLletra)) {
        for (index = 0; index < paraulaSecretaArray.length; index++) {
            if (paraulaSecretaArray[index] == valorDeLaLletra) {
                paraulaSecretaArrayDisplay[index] = valorDeLaLletra
                puntsPactual += 1 * winStreak
                winStreak += 1
            }
        }
        let auxiliarP = "";
        for (j = 0; j < paraulaSecretaArrayDisplay.length; j++) {
            auxiliarP += paraulaSecretaArrayDisplay[j] + " "
            auxiliarP2 += paraulaSecretaArrayDisplay[j]
        }
        paraulah2.textContent = auxiliarP.toLocaleUpperCase()
        document.getElementById("ppactual").textContent = puntsPactual
    } else {
        nJugades = nJugades - 1;
        puntsPactual -= 1
        winStreak = 1
        document.getElementById("njugadas").textContent = nJugades
        if (puntsPactual >= 0) {
            document.getElementById("ppactual").textContent = puntsPactual
        }
        if (imgNumJugades <=10) {
            imgNumJugades += 1
            imatgepenjat.src = "imgs/penjat_" + imgNumJugades + ".jpg"
        }
    }
    if (auxiliarP2 === paraulaSecreta) {
        document.getElementById("divh2paraula").style.backgroundColor = "green"
        document.getElementById("introdueix_paraula").disabled = false;
        document.getElementById("btn-comencem").disabled = false;
        document.getElementById("eye").disabled = false;
        nJugades = 10;
        totalPartidas += 1
        partidasGuanyades += 1
        document.getElementById("totalPartidas").textContent = totalPartidas
        document.getElementById("partidesGuanyades").textContent = partidasGuanyades
        if (puntsPactual > maximPunts) {
            maximPunts = puntsPactual
        }
        let dataActual = new Date()
        document.getElementById("partidaMesAlta").textContent = "Dia " + dataActual.getDate() + " Mes " + (dataActual.getMonth() + 1) + " Punts " + maximPunts
        desactivarLletres()
    }
    if (nJugades <= 0) {
        document.getElementById("divh2paraula").style.backgroundColor = "red"
        document.getElementById("introdueix_paraula").disabled = false;
        document.getElementById("btn-comencem").disabled = false;
        document.getElementById("eye").disabled = false;
        nJugades = 10;
        totalPartidas += 1
        document.getElementById("totalPartidas").textContent = totalPartidas
        document.getElementById("partidesGuanyades").textContent = partidasGuanyades
        if (puntsPactual > maximPunts) {
            maximPunts = puntsPactual
        }
        let dataActual = new Date()
        document.getElementById("partidaMesAlta").textContent = "Dia " + dataActual.getDate() + " Mes " + (dataActual.getMonth() + 1) + " Punts " + maximPunts
        desactivarLletres()
    }
}
function desactivarLletres(){
    for(i=1;i<=26;i++){
        document.getElementById("lletra"+i).disabled=true;
        document.getElementById("lletra"+i).style.color="red";
        document.getElementById("lletra"+i).style.borderColor="red";
        document.getElementById("lletra"+i).style.backgroundColor="yellow";
    }
}
function activarLletres(){
    for(i=1;i<=26;i++){
        document.getElementById("lletra"+i).disabled=false;
        document.getElementById("lletra"+i).style.color="black";
        document.getElementById("lletra"+i).style.borderColor="grey";
        document.getElementById("lletra"+i).style.backgroundColor="yellow";
    }
}
function desactivarLletra(lletra){
    document.getElementById(lletra).disabled=true;
    document.getElementById(lletra).style.color="red";
    document.getElementById(lletra).style.borderColor="red";
    document.getElementById(lletra).style.backgroundColor="yellow";
}