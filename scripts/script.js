let paraulaSecreta;
let paraulaSecretaArray=[];
let paraulaSecretaArrayDisplay=[];
let paraulah2 = document.getElementById("paraula-display")
paraulah2.textContent = "COMENCEM"
let valorDeLaLletra;

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
                //Creem la Array amb la paraula amb el split si te espai i si no amb el Array.from
                if (paraulaSecreta.indexOf(" ") > -1) {
                    paraulaSecretaArray = paraulaSecreta.split(" ")
                } else {
                    paraulaSecretaArray = Array.from(paraulaSecreta)
                }
            }
        }
    }
    //Fem el disable dels buttons
    document.getElementById("introdueix_paraula").disabled = true;
    document.getElementById("btn-comencem").disabled = true;
    document.getElementById("eye").disabled = true;
    //Posem els guions a la paraula del mitg
    let paraulaaux = ""
    for(i=0;i<paraulaSecreta.length;i++){
        paraulaaux+="- "
        paraulaSecretaArrayDisplay[i]="-"

    }
    paraulah2.textContent = paraulaaux
}

//Funcio per a canviar la visibilitat de la paraula secreta
function canviarVisible() {
    var x = document.getElementById("introdueix_paraula");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
//Funcio per a treure el valor de la lletra preumda
function getLletra(valor){
    valorDeLaLletra = valor.textContent.toLowerCase()
    comprovacions()
}
//Funcio que per a modificar l'array i imprimir-lo
function comprovacions(){
    if(paraulaSecretaArray.includes(valorDeLaLletra)){
        paraulaSecretaArrayDisplay[paraulaSecretaArray.indexOf(valorDeLaLletra)] = valorDeLaLletra
        let auxiliarP="";
        for(j=0;j<paraulaSecretaArrayDisplay.length;j++){
            auxiliarP+=paraulaSecretaArrayDisplay[j]+" "
        }
        paraulah2.textContent = auxiliarP.toLocaleUpperCase()      
    }else{

    }
}