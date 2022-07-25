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
    BLANCO: 0
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
                case colores.BLANCO:
                    input.classList.add("blanco");
                    break;
            }
        }
    }
}

function tabular_input(){
    document.querySelectorAll("input").forEach((element)=>{
        element.addEventListener("keydown",function(event){
            console.log(event.keyCode);
            if(event.keyCode == 8){
                if(this.value.length == 0){
                    let dataIndex = this;
                    var index = parseFloat( dataIndex.getAttribute('data-index'));
                    document.querySelector('[data-index="' + (index - 1).toString() + '"]').focus();
                    document.querySelector('[data-index="' + (index - 1).toString() + '"]').value = "";
                }
                else{

                }
                /*let dataIndex = this;
                setTimeout(function(){
                    var index = parseFloat( dataIndex.getAttribute('data-index'));
                    document.querySelector('[data-index="' + (index - 1).toString() + '"]').focus();
                },100)*/
            }
            else if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 192){
                let dataIndex = this;
                setTimeout(function(){
                    var index = parseFloat( dataIndex.getAttribute('data-index'));
                    document.querySelector('[data-index="' + (index + 1).toString() + '"]').focus();
                },100)
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

//let lista_palabras = ["birra", "rombo", "tigre", "perro", "diego"];
let lista_palabras = [ "perro"];
let lista_palabras_invitadas = ["birra", "rombo", "tigre", "perro", "diego", "oveja", "perez", "coche"];

lista_palabras_invitadas = lista_palabras_invitadas.concat(lista_palabras);

let palabras_aleatorias = lista_palabras[Math.floor(Math.random() * lista_palabras.length)].toLocaleUpperCase();

console.log("El arreglo es: ");
console.log(lista_palabras);
console.log("Y un aleatorio es: ");
console.log(palabras_aleatorias);

function guardar_respuesta(indice){
    for (let indice_columna = 0; indice_columna < columna; indice_columna++) {
        let input = document.getElementById(`f${indice}c${indice_columna}`).value.toUpperCase();
        respuestas[indice].push(input);
    }
    revisar_resultado(respuestas[indice], indice)
}

let palabra_correcta = palabras_aleatorias.split("");

function revisar_resultado(respuesta, indice){

    respuesta.forEach(function(item, index){

        if(item === palabra_correcta[index]){
            respuesta[index] = "_";
            //palabra_correcta[index].indexOf(item);
            palabra_correcta[index] = palabra_correcta[index].substring(0, index) + " " + palabra_correcta[index].substring(index + 1);
            color_tablero[indice][index] = colores.VERDE;
        }
    });
    respuesta.forEach(function(item, index){
        if(item != "_"){
            console.log(item);

            if (palabra_correcta.includes(item)) {
                color_tablero[indice][index] = colores.AMARILLO;
            }
            else if (!palabra_correcta.includes(item)) {
                color_tablero[indice][index] = colores.GRIS;
            }
        }

    });
    pintar_tablero();
}

inicio();