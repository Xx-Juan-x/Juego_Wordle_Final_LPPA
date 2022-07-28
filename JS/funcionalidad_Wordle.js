/*let matriz_wordle = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29]
]

for(let i = 0; i < matriz_wordle.length; i++){
    for (let j = 0; j < matriz_wordle[i].length; j++) {
        document.getElementById("f"+i +"c"+j).value = matriz_wordle[i][j];
    }
}*/

let color_tablero = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

let respuestas = [
    [],
    [],
    [],
    [],
    [],
    []
]


let colores = {
    VERDE: 1,
    AMARILLO: 2,
    GRIS: 3,
}

let fila = 6;
let columna = 5;

function pintar_tablero(){
    for (let indice_fila = 0; indice_fila < fila; indice_fila++) {
        for (let indice_columna = 0; indice_columna < columna; indice_columna++) {
            let input = document.getElementById(`f${indice_fila}c${indice_columna}`);
            switch (color_tablero[indice_fila][indice_columna]){
                case colores.VERDE:
                    input.classList.add("verde");
                    break;
                case colores.AMARILLO:
                    input.classList.add("amarillo");
                    break;
                case colores.GRIS:
                    input.classList.add("gris");
                    break;
            }
        }
    }
    habilitar_deshabilitar_row();
}

function habilitar_deshabilitar_row(){
    filas_completadas++;
    if (filas_completadas < 6) {
        let numero_row = document.querySelector("fieldset.active").getAttribute("data-row");
        document.getElementById("row" + numero_row).classList.remove("active");
        numero_row++;
        document.getElementById("row" + numero_row).classList.add("active");

        document.getElementById("row" + numero_row).querySelector("input[data-index='1']").focus();
        palabra_correcta = palabras_aleatorias.split("");
        tabular_input();
    }
    else{
        fin_juego = true;
    }
}

function tabular_input(){
    document.querySelectorAll(".active input").forEach((element)=>{
        element.addEventListener("keydown",function(event){
            //console.log(event.keyCode);
            if(event.keyCode == 8){
                if(this.value.length == 0){
                    let dataIndex = this;
                    var index = parseFloat(dataIndex.getAttribute('data-index'));
                    if (index != 1) {
                        document.querySelector('.active [data-index="' + (index - 1).toString() + '"]').focus();
                        document.querySelector('.active [data-index="' + (index - 1).toString() + '"]').value = "";
                    }
                }
            }
            else if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 192){
                let dataIndex = this;
                setTimeout(function(){
                    let index = parseFloat(dataIndex.getAttribute('data-index'));
                    if (index != 5) {
                        document.querySelector('.active [data-index="' + (index + 1).toString() + '"]').focus();
                    }
                },50)
            }
            else{
                event.preventDefault();
            }
        });
    })
}
tabular_input();


function inicio() {
    for (let indice = 0; indice < fila; indice++) {
        let fieldset = document.getElementById(`row${indice}`);
        fieldset.onkeydown = function(event){
            if (event.key === `Enter`){
                guardar_respuesta(indice);
            }
        }
    }
}
let palabras_aleatorias;
let palabra_correcta;
let lista_palabras = [];
let con_tilde = false;
let id_conTilde = document.getElementById("conTilde");
let id_sinTilde = document.getElementById("sinTilde");
let contrareloj = document.getElementById("contrareloj");
let timer = 300;
let fin_juego = false;
let filas_completadas = 0;

setInterval(function(){
    if (timer > 1) {
        if (fin_juego == false) {
            timer--;
            contrareloj.innerHTML = timer;
        }
        if (fin_juego == true && filas_completadas == 6) {
            setTimeout(function(){
                contrareloj.innerHTML = "Fin del juego";
                document.querySelector("fieldset.active").classList.remove("active");
                alert("Perdiste");
            },500);
        }
    }
    else{
        if(fin_juego == false){
            fin_juego = true;
            contrareloj.innerHTML = "Fin del juego";
            document.querySelector("fieldset.active").classList.remove("active");
            alert("Perdiste");
        }
    }
},1000);

function modo_juego(){
    id_conTilde.addEventListener("click", function(event){
        if (!event.target.classList.contains("active")) {
            timer = 300;
            con_tilde = true;
            fetch_palabras();
            document.querySelectorAll("input").forEach((element)=>{
                element.value = "";
                element.classList.remove("verde");
                element.classList.remove("amarillo");
                element.classList.remove("gris");
            });
            document.querySelector(".active [data-index='1']").focus();
            document.querySelector("h2 span").innerHTML = "CON TILDE";
            document.querySelector("fieldset.active").classList.remove("active");
            document.querySelector("#row0").classList.add("active");
            document.querySelector("#row0 [data-index='1']").focus();
            filas_completadas = 0;
            event.target.classList.add("active");
            id_sinTilde.classList.remove("active");
            console.log(event);
        }
    });

    id_sinTilde.addEventListener("click", function(event){
        if (!event.target.classList.contains("active")){
            timer = 300;
            con_tilde = false;
            fetch_palabras();
            document.querySelectorAll("input").forEach((element)=>{
                element.value = "";
                element.classList.remove("verde");
                element.classList.remove("amarillo");
                element.classList.remove("gris");
            });
            document.querySelector(".active [data-index='1']").focus();
            document.querySelector("h2 span").innerHTML = "SIN TILDE";
            document.querySelector("fieldset.active").classList.remove("active");
            document.querySelector("#row0").classList.add("active");
            document.querySelector("#row0 [data-index='1']").focus();
            filas_completadas = 0;
            event.target.classList.add("active");
            id_conTilde.classList.remove("active");
        }
    });
}
modo_juego();

fetch_palabras();

function fetch_palabras(){
    lista_palabras = [];
    fetch("palabras_juego.json")
    .then(response => {
        return response.json();
    })
    .then((data)=>{

        data.forEach((element)=>{

            if(con_tilde == true){
                if (element.includes("á") || element.includes("é") || element.includes("í") || element.includes("ó") || element.includes("ú")) {
                    lista_palabras.push(element);
                }
            }
            else{
                if (!element.includes("á") && !element.includes("é") && !element.includes("í") && !element.includes("ó") && !element.includes("ú")) {
                    lista_palabras.push(element);
                }
            }
        });

        console.log(lista_palabras);

        palabras_aleatorias = lista_palabras[Math.floor(Math.random() * lista_palabras.length)].toUpperCase();
        palabra_correcta = palabras_aleatorias.split("");
        /*console.log("El arreglo es: ");
        console.log(lista_palabras);*/
        console.log("Y un aleatorio es: ");
        console.log(palabras_aleatorias);
    })
}


function guardar_respuesta(indice){
    respuestas[indice] = [];
    for (let indice_columna = 0; indice_columna < columna; indice_columna++) {
        let input = document.getElementById(`f${indice}c${indice_columna}`).value.toUpperCase();
        respuestas[indice].push(input);
    }

    let row_vacio = false;
    respuestas[indice].forEach(function(element){
        if (element == "") {
            row_vacio = true;
        }
    });
    if (row_vacio == false){
        let palabra_completa = respuestas[indice].join("");
        if (!lista_palabras.includes(palabra_completa.toLowerCase())){
            alert("La palabra no existe");
        }
        else{
            revisar_resultado(respuestas[indice], indice);
        }
    }
    else{
        alert("Debe completar toda la fila");
    }
}


console.log(palabra_correcta);

function revisar_resultado(respuesta, indice){
    console.log(palabra_correcta);

    respuesta.forEach(function(item, index){
        if(item === palabra_correcta[index]){
            respuesta[index] = "_";
            palabra_correcta[index] = palabra_correcta[index].substring(0, index) + " " + palabra_correcta[index].substring(index + 1);
            color_tablero[indice][index] = colores.VERDE;
        }
    });

    let letras_correctas = 0;

    respuesta.forEach(function(item, index){
        if(item != "_"){

            if (palabra_correcta.includes(item)) {
                color_tablero[indice][index] = colores.AMARILLO;
            }
            else if (!palabra_correcta.includes(item)) {
                color_tablero[indice][index] = colores.GRIS;
            }
        }
        else{
            letras_correctas++;
        }
    });
    if (letras_correctas == 5) {
        fin_juego = true;
        setTimeout(function(){
            alert("Ganaste!");
        },500)
    }
    pintar_tablero();
}
inicio();