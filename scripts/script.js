//Declarem com a variables globals la paraula secreta, la array amb les lletres de la paraula i la array que es mostrara per pantalla
let paraulaSecreta;
let paraulaSecretaArray = [];
let paraulaSecretaArrayDisplay = [];
//Declarem les variables globals necessaries que utilitzrem més endavant
let paraulah2 = document.getElementById("paraula-display")
let puntsPactual = 0;
let totalPartidas = 0;
let partidasGuanyades = 0;
let winStreak = 1;
let maximPunts = 0;
let valorDeLaLletra;
let nJugades = 10;
let imatgepenjat = document.getElementById("imgPenjat");
let imgNumJugades = 0;
//Desactivem les lletres i "COMENCEM"
desactivarLletres()
paraulah2.textContent = "COMENCEM"
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
                //Si arriba aqui es que la entrada es correcte
                //Fem el disable dels buttons
                document.getElementById("introdueix_paraula").disabled = true;
                document.getElementById("btn-comencem").disabled = true;
                document.getElementById("eye").disabled = true;
                //Netejem les arrays per començar
                for(h=0;h<paraulaSecretaArray.length;h++){
                    paraulaSecretaArray.pop()
                }
                for(j=0;j<paraulaSecretaArrayDisplay.length;j++){
                    paraulaSecretaArrayDisplay.pop()
                }
                //Creem la Array amb la paraula amb el replace si te espai i si no amb el Array.from
                if (paraulaSecreta.indexOf(" ") > -1) {
                    paraulaSecretaArray = paraulaSecreta.replaceAll(" ","")
                    console.log(paraulaSecretaArray)
                } else {
                    paraulaSecretaArray = Array.from(paraulaSecreta)
                }
                //Posem els valors inicials a les variables i el text corresponent al HTML
                nJugades = 10;
                puntsPactual = 0
                winStreak = 1;
                imgNumJugades = 0
                document.getElementById("njugadas").textContent = nJugades
                document.getElementById("ppactual").textContent = puntsPactual
                document.getElementById("totalPartidas").textContent = totalPartidas
                document.getElementById("partidesGuanyades").textContent = partidasGuanyades
                imatgepenjat.src = "imgs/penjat_" + imgNumJugades + ".jpg"
                //Posem els guions - a la paraula del mitg
                let paraulaaux = ""
                for (i = 0; i < paraulaSecretaArray.length; i++) {
                    paraulaaux += "- "
                    paraulaSecretaArrayDisplay[i] = "-"
                }
                paraulah2.textContent = paraulaaux
                //Activem les lletres
                activarLletres()
            }
        }
    }
    //Canviem el color del text principal
    document.getElementById("divh2paraula").style.backgroundColor = "white"
}

//Funcio per a canviar la visibilitat de la paraula secreta amb l'icona de l'ull
function canviarVisible() {
    let x = document.getElementById("introdueix_paraula");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
//Funcio per a treure el valor de la lletra preumda i desactivarla
function getLletra(valor) {
    valorDeLaLletra = valor.textContent.toLowerCase()
    //Un cop tret el valor fem totes les comprovacions logiques amb les arrays cridant a comprovacions()
    comprovacions()
    //Desacivem la lletra premuda
    desactivarLletra(valor.id)
}
//Funcio que per a modificar l'array i imprimir-lo i comprovar si has guanyat o no
function comprovacions() {
    //Variable que farem servir mes endavant
    let auxiliarP2 = "";
    //Si la lletra premuda es acertada la afegim a la array de display sumem els punts, augmentem la racha de victories, i actualitzem tots el valors corresponents al HTML
    if (paraulaSecretaArray.includes(valorDeLaLletra)) {
        //Revisem totes les lletres en cas de lletres duplicades
        for (index = 0; index < paraulaSecretaArray.length; index++) {
            //Si la lletra coincideix la posem a la array de Display
            if (paraulaSecretaArray[index] == valorDeLaLletra) {
                paraulaSecretaArrayDisplay[index] = valorDeLaLletra
                puntsPactual += 1 * winStreak
                winStreak += 1
            }
        }
        //Formatejem el string que posarem al HTML a partir de la array de display
        let auxiliarP = "";
        for (j = 0; j < paraulaSecretaArrayDisplay.length; j++) {
            auxiliarP += paraulaSecretaArrayDisplay[j] + " "
            auxiliarP2 += paraulaSecretaArrayDisplay[j]
        }
        //Actualitzem el HTML
        paraulah2.textContent = auxiliarP.toLocaleUpperCase()
        document.getElementById("ppactual").textContent = puntsPactual 
    } else {
        //Si la lletra premuda no es acertada restem els punts la jugada i resetejem el winstreak, actualitzem els valors corresponents al HTML
        nJugades = nJugades - 1;
        winStreak = 1
        document.getElementById("njugadas").textContent = nJugades
        //Per a prevenir punts negatius
        if (puntsPactual > 0) {
            puntsPactual -= 1
            document.getElementById("ppactual").textContent = puntsPactual
        }
        //Per a canviar la imatge indicadora del penjat
        if (imgNumJugades <=10) {
            imgNumJugades += 1
            imatgepenjat.src = "imgs/penjat_" + imgNumJugades + ".jpg"
        }
    }
    //IF que comprova si hem guanyat quan auxiliarP2 === paraulaSecreta
    if (auxiliarP2 === paraulaSecreta) {
        //Canviem el color del h2 de display i desactivem els botons
        document.getElementById("divh2paraula").style.backgroundColor = "green"
        document.getElementById("introdueix_paraula").disabled = false;
        document.getElementById("btn-comencem").disabled = false;
        document.getElementById("eye").disabled = false;
        //Reinicialitzem nJugades per evitar conflictes i actualitzem el recompte de partides i ho posem tot al HTML
        nJugades = 10;
        totalPartidas += 1
        partidasGuanyades += 1
        document.getElementById("totalPartidas").textContent = totalPartidas
        document.getElementById("partidesGuanyades").textContent = partidasGuanyades
        //Comprovem la maxima puntuació i formatejem el text amb el Dia Mes i Punts Mes grans
        if (puntsPactual > maximPunts) {
            maximPunts = puntsPactual
        }
        let dataActual = new Date()
        document.getElementById("partidaMesAlta").textContent = "Dia " + dataActual.getDate() + " Mes " + (dataActual.getMonth() + 1) + " Punts " + maximPunts
        //Desacivem les lletres
        desactivarLletres()
    }
    //IF que comprova si hem perdut o sigui nJugades <= 0
    if (nJugades <= 0) {
        //Canviem el color del h2 de display i desactivem els botons
        document.getElementById("divh2paraula").style.backgroundColor = "red"
        document.getElementById("introdueix_paraula").disabled = false;
        document.getElementById("btn-comencem").disabled = false;
        document.getElementById("eye").disabled = false;
        //Reinicialitzem nJugades per evitar conflictes i actualitzem el recompte de partides i ho posem tot al HTML
        nJugades = 10;
        totalPartidas += 1
        document.getElementById("totalPartidas").textContent = totalPartidas
        document.getElementById("partidesGuanyades").textContent = partidasGuanyades
        //Comprovem la maxima puntuació i formatejem el text amb el Dia Mes i Punts Mes grans
        if (puntsPactual > maximPunts) {
            maximPunts = puntsPactual
        }
        let dataActual = new Date()
        document.getElementById("partidaMesAlta").textContent = "Dia " + dataActual.getDate() + " Mes " + (dataActual.getMonth() + 1) + " Punts " + maximPunts
        //Desacivem les lletres
        desactivarLletres()
    }
}
//Funcio per a desactivar totes les leltres
function desactivarLletres(){
    for(i=1;i<=26;i++){
        document.getElementById("lletra"+i).disabled=true;
        document.getElementById("lletra"+i).style.color="red";
        document.getElementById("lletra"+i).style.borderColor="red";
        document.getElementById("lletra"+i).style.backgroundColor="yellow";
    }
}
//Funcio per a activar totes les lletres
function activarLletres(){
    for(i=1;i<=26;i++){
        document.getElementById("lletra"+i).disabled=false;
        document.getElementById("lletra"+i).style.color="black";
        document.getElementById("lletra"+i).style.borderColor="grey";
        document.getElementById("lletra"+i).style.backgroundColor="yellow";
    }
}
//Funcio per a desactivar una sola lletra donada el seu ID
function desactivarLletra(lletra){
    document.getElementById(lletra).disabled=true;
    document.getElementById(lletra).style.color="red";
    document.getElementById(lletra).style.borderColor="red";
    document.getElementById(lletra).style.backgroundColor="yellow";
}