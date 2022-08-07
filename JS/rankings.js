document.getElementById("ordenarFecha").addEventListener("click", function(){
    ordenar_fecha();
});
document.getElementById("ordenarPuntaje").addEventListener("click", function(){
    ordenar_puntaje();
});

function ordenar_fecha(){
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
        console.log(ordenado);
    }
    console.log(rankings);
}
function ordenar_puntaje(){
    let rankings = JSON.parse(localStorage.getItem("ranking"));
    let ordenado = false;
    while (ordenado == false) {
        ordenado = true;
        rankings.forEach((element, index) => {
            console.log(index);
            if (typeof rankings[index + 1] != "undefined" && element.puntaje < rankings[index + 1].puntaje) {
                let array_sig = element;
                let array_ant = rankings[index + 1];
                rankings[index + 1] = array_sig;
                rankings[index] = array_ant;
                ordenado = false;
            }
        });
        console.log(ordenado);
    }
    console.log(rankings);
}
