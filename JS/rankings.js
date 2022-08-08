let tabla_rankings = document.querySelector(".listarRanking");
let span_cerrar_tabla = document.getElementById("cerrando-tabla");

document.getElementById("ordenarFecha").addEventListener("click", function(){
    ordenar_fecha();
});
document.getElementById("ordenarPuntaje").addEventListener("click", function(){
    ordenar_puntaje();
});

function ordenar_fecha(){
    document.querySelector(".datosRanking").innerHTML = "";
    tabla_rankings.classList.add("active");
    let rankings = JSON.parse(localStorage.getItem("ranking"));
    let ordenado = false;
    while (ordenado == false) {
        ordenado = true;
        rankings.forEach((element, index) => {
            if (typeof rankings[index + 1] != "undefined") {
                let fecha_actual = new Date(element.fecha_partida);
                let fecha_siguiente = new Date(rankings[index + 1].fecha_partida);
                if (fecha_actual < fecha_siguiente) {
                    let array_sig = element;
                    let array_ant = rankings[index + 1];
                    rankings[index + 1] = array_sig;
                    rankings[index] = array_ant;
                    ordenado = false;
                }
            }
        });
    }
    rankings.forEach((element, index) => {
        document.querySelector(".datosRanking").insertAdjacentHTML("beforeend", "<tr><td>"+element.jugador+"</td>" +
        "<td>"+element.tiempo+"</td>"+
        "<td>"+element.juego+"</td>"+
        "<td>"+element.fecha_partida+"</td>"+
        "<td>"+element.puntaje+"</td></tr>");
    });
}

function ordenar_puntaje(){
    document.querySelector(".datosRanking").innerHTML = "";
    tabla_rankings.classList.add("active");
    let rankings = JSON.parse(localStorage.getItem("ranking"));
    let ordenado = false;
    while (ordenado == false) {
        ordenado = true;
        rankings.forEach((element, index) => {
            if (typeof rankings[index + 1] != "undefined" && element.puntaje < rankings[index + 1].puntaje) {
                let array_sig = element;
                let array_ant = rankings[index + 1];
                rankings[index + 1] = array_sig;
                rankings[index] = array_ant;
                ordenado = false;
            }
        });
    }
    rankings.forEach((element, index) => {
        document.querySelector(".datosRanking").insertAdjacentHTML("beforeend", "<tr><td>"+element.jugador+"</td>" +
        "<td>"+element.tiempo+"</td>"+
        "<td>"+element.juego+"</td>"+
        "<td>"+element.fecha_partida+"</td>"+
        "<td>"+element.puntaje+"</td></tr>");
    });
}

function cerrar_tabla(){
    span_cerrar_tabla.onclick = function(){
        tabla_rankings.classList.remove("active");
    }
}
cerrar_tabla();