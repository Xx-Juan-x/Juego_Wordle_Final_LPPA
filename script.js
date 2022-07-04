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

let palabra_correcta = "birra"

function guardar_respuesta(indice){
    for (let indice_columna = 0; indice_columna < columna; indice_columna++) {
        let input = document.getElementById(`f${indice}c${indice_columna}`).value;
        respuestas[indice].push(input);
    }
    revisar_resultado(respuestas[indice], indice)
}

let palabra_slipt_correcta = palabra_correcta.split("");

function revisar_resultado(respuesta, indice){
    respuesta.forEach(function(item, index){
        if(item === palabra_slipt_correcta[index]){
            color_tablero[indice][index] = colores.VERDE;
        }
        else if (palabra_slipt_correcta.includes(item)) {
            color_tablero[indice][index] = colores.AMARILLO;
        }
        else if (!palabra_slipt_correcta.includes(item)) {
            color_tablero[indice][index] = colores.GRIS;
        }
    });
    pintar_tablero();
}

inicio();