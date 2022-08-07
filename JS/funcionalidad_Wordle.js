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
let nombre = localStorage.getItem("nombre");
let palabras_aleatorias;
let palabra_correcta;
let palabras_filtradas = [];
let con_tilde = false;
let id_conTilde = document.getElementById("conTilde");
let id_sinTilde = document.getElementById("sinTilde");
let contrareloj = document.getElementById("contrareloj");
let timer = 0;
let fin_juego = false;
let filas_completadas = 0;
let letras_correctas = 0;
let guardar_partida = document.getElementById("guardarPartida");
let modal = document.querySelector(".modal");
let span_cierre = document.querySelector(".cerrar-modal");
let nuevo_juego = document.getElementById("nuevaPartida");
let contacto = document.querySelector(".contacto");
let nuevo_jugador = document.getElementById("nuevoJugador");
let btn_listar = document.getElementById("btn-listarPartidas");
let tabla_lista = document.querySelector(".listaPartidas");
let lista;
let span_cerrar_tabla = document.getElementById("cerrando-tabla");
let fecha_formato = { month: '2-digit', day: '2-digit', year: 'numeric', };
let fecha_actual = new Date().toLocaleDateString('en-US', fecha_formato);


nuevo_jugador.addEventListener("click",function(){nuevoJugador()});

function nuevoJugador(){
    localStorage.removeItem("nombre");
    window.location.href = "index.html";
}


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
    if (filas_completadas < 6 && fin_juego == false) {
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

function tiempo_juego(){
    nuevo_juego.classList.add("nuevaPartida");
    setInterval(function(){
            if (fin_juego == false) {
                timer++;
                contrareloj.innerHTML = timer;
            }
            if (fin_juego == true && filas_completadas == 6 && letras_correctas != 5) {
                fin_juego = null;
                contrareloj.innerHTML = "Fin del juego";
                document.querySelector("fieldset.active").classList.remove("active");
                modal.style.display = "flex";
                modal.classList.remove("advertencia");
                modal.classList.remove("ganaste");
                modal.classList.add("perdiste");
                modal.querySelector("h2").innerHTML = "PERDISTE";
                modal.querySelector("p").innerHTML = "La paralabra ganadora era: " + palabras_aleatorias;
                nuevo_juego.classList.remove("nuevaPartida");
            }
    },1000);
}
tiempo_juego();



filtro_palabras();

function filtro_palabras(){
    palabras_filtradas = [];

    todas_las_palabras.forEach((element =>{
        if(con_tilde == true){
            if (element.includes("á") || element.includes("é") || element.includes("í") || element.includes("ó") || element.includes("ú")) {
                palabras_filtradas.push(element);
            }
        }
        else{
            if (!element.includes("á") && !element.includes("é") && !element.includes("í") && !element.includes("ó") && !element.includes("ú")) {
                palabras_filtradas.push(element);
            }
        }
    }));

    palabras_aleatorias = palabras_filtradas[Math.floor(Math.random() * palabras_filtradas.length)].toUpperCase();
    palabra_correcta = palabras_aleatorias.split("");

    console.log("Y un aleatorio es: ");
    console.log(palabras_aleatorias);
}

id_conTilde.addEventListener("click",(event) =>{modo_juego(event,'conTilde')});
id_sinTilde.addEventListener("click",(event) =>{modo_juego(event,'sinTilde')});

function modo_juego(event, tipo){
    if (!event.target.classList.contains("active")) {
        respuestas = [];
        color_tablero = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        timer = 0;
        document.querySelectorAll("input").forEach((element)=>{
            element.value = "";
            element.classList.remove("verde");
            element.classList.remove("amarillo");
            element.classList.remove("gris");
        });
        fin_juego = false;
        document.querySelector("#row0").classList.add("active");
        document.querySelector(".active [data-index='1']").focus();
        document.querySelector("#row0 [data-index='1']").focus();
        filas_completadas = 0;
        event.target.classList.add("active");

        if (tipo == "sinTilde") {
            con_tilde = false;
            id_conTilde.classList.remove("active");
            document.querySelector("h2 span").innerHTML = "SIN TILDE";
        }
        else if(tipo == "conTilde"){
            con_tilde = true;
            id_sinTilde.classList.remove("active");
            document.querySelector("h2 span").innerHTML = "CON TILDE";
        }
        filtro_palabras();
    }
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
        if (!todas_las_palabras.includes(palabra_completa.toLowerCase())){
            modal.style.display = "flex";
            modal.querySelector("h2").innerHTML = "ADVERTENCIA";
            modal.classList.remove("perdiste");
            modal.classList.remove("ganaste");
            modal.classList.add("advertencia");
            modal.querySelector("p").innerHTML = "La palabra no existe";
        }
        else{
            revisar_resultado(respuestas[indice], indice);
        }
    }
    else{
        modal.style.display = "flex";
        modal.querySelector("h2").innerHTML = "ADVERTENCIA";
        modal.classList.remove("perdiste");
        modal.classList.remove("ganaste");
        modal.classList.add("advertencia");
        modal.querySelector("p").innerHTML = "Debe completar toda la fila";
    }
}


console.log(palabra_correcta);

function revisar_resultado(respuesta, indice){
    console.log(palabra_correcta);

    respuesta.forEach(function(item, index){
        if(item === palabra_correcta[index]){
            palabra_correcta[index] = palabra_correcta[index].substring(0, index) + " " + palabra_correcta[index].substring(index + 1);
            color_tablero[indice][index] = colores.VERDE;
        }
    });

    letras_correctas = 0;

    respuesta.forEach(function(item, index){
        if(color_tablero[indice][index] != "1"){
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
        document.querySelector("fieldset.active").classList.remove("active");
        setTimeout(function(){
            modal.style.display = "flex";
            modal.classList.remove("advertencia");
            modal.classList.remove("perdiste");
            modal.classList.add("ganaste");
            modal.querySelector("h2").innerHTML = "GANASTE";
            modal.querySelector("p").innerHTML = "¡Felicitaciones! la palabra es: " + palabras_aleatorias;
            nuevo_juego.classList.remove("nuevaPartida");
            let modo_juego = (con_tilde ? "conTilde" : "sinTilde");
            let puntaje = 5000;
            puntaje = puntaje - (timer * 5);
            puntaje = puntaje - (filas_completadas * 500);
            puntaje = (puntaje < 0? 0 : puntaje);
            let ganador = {
                jugador: nombre, tiempo: timer, juego: modo_juego, intentos_realizados: filas_completadas, fecha_partida: fecha_actual, puntaje: puntaje
            }
            let rankings = JSON.parse(localStorage.getItem("ranking")) || [];
            rankings.push(ganador);
            let json =  JSON.stringify(rankings);
            localStorage.setItem("ranking", json);
        },500)
    }
    pintar_tablero();
}
inicio();

function nueva_partida(){
    nuevo_juego.addEventListener("click", function(event){
        if (fin_juego == true || fin_juego == null) {
            window.location.reload();
        }
    });
}
nueva_partida();

function guardar_partidas(){
    guardar_partida.addEventListener("click", function(event){
        let modo_juego = (con_tilde ? "conTilde" : "sinTilde");
        event.preventDefault();
        let partida = {
            jugador: nombre,
            tiempo: timer,
            juego: modo_juego,
            tablero: color_tablero,
            respuestas: respuestas,
            intentos_realizados: filas_completadas,
            palabra_ganadora: palabras_aleatorias
        }
        let partidaGuardada = JSON.parse(localStorage.getItem("partida")) || [];
        let jugador_existente = false;
        partidaGuardada.forEach(function(element, index){
            if (element.jugador == nombre) {
                jugador_existente = true;
                partidaGuardada[index] = partida;
            }
        });
        if (jugador_existente == false) {
            partidaGuardada.push(partida);
        }
        let json =  JSON.stringify(partidaGuardada)
        localStorage.setItem("partida", json);
    });
}
guardar_partidas();

btn_listar.addEventListener("click", function(){
    lista_partidas();
});

function lista_partidas(){
    document.querySelector(".datosPartida").innerHTML = "";
    var partidas = JSON.parse(localStorage.getItem("partida"));
    tabla_lista.classList.add("listar");
    console.log(partidas);
    partidas.forEach((element, index) => {
        document.querySelector(".datosPartida").insertAdjacentHTML("beforeend", "<tr><td>"+element.jugador+"</td>" +
        "<td>"+element.tiempo+"</td>"+
        "<td>"+element.juego+"</td>"+
        "<td>"+element.intentos_realizados+"</td>"+
        "<td><button onClick='cargarPartida("+index+")'>Cargar</button></td></tr>");
    });
}


function cargarPartida(index){
    var partidas = JSON.parse(localStorage.getItem("partida"))
    console.log(partidas[index]);
    timer = partidas[index].tiempo;
    if(partidas[index].juego == "sinTilde"){
        con_tilde = false;
        id_conTilde.classList.remove("active");
        document.querySelector("h2 span").innerHTML = "SIN TILDE";
    }
    else if(partidas[index].juego == "conTilde"){
        con_tilde = true;
        id_sinTilde.classList.remove("active");
        document.querySelector("h2 span").innerHTML = "CON TILDE";
    }
    filas_completadas = partidas[index].intentos_realizados - 1;
    respuestas = partidas[index].respuestas;
    color_tablero = partidas[index].tablero;
    nombre = partidas[index].jugador;
    document.querySelector("fieldset.active").classList.remove("active");
    document.getElementById("row" + (partidas[index].intentos_realizados - 1)).classList.add("active");
    pintar_tablero();
    partidas[index].respuestas.forEach((element,index)=>{
        document.querySelectorAll("#row"+index+" input").forEach((input,index_input)=>{
            input.value = "";
            if(typeof element[index_input] != "undefined"){
                input.value = element[index_input];
            }
        });
    });
    tabla_lista.classList.remove("listar");
}

function cerrar_modal(){
    //Cerrar tocando en la X
    span_cierre.onclick = function(){
        modal.style.display = "none";
        document.querySelectorAll(".active input").forEach(function(element){
            if (element.value.length != 0) {
                element.focus();
            }
        })
    }

    //Cerrar tocando fuera del modal
    window.onclick = function(event){
        if (event.target == modal) {
            modal.style.display = "none";
            document.querySelectorAll(".active input").forEach(function(element){
                if (element.value.length != 0) {
                    element.focus();
                }
            })
        }
    }
}
cerrar_modal();

function cerrar_tabla(){
    span_cerrar_tabla.onclick = function(){
        tabla_lista.classList.remove("listar");
    }
}
cerrar_tabla();

function contactos(){
    contacto.addEventListener("click", function(){
        window.location.href = "contacto.html";
    });
}
contactos();