let abrir_modal = document.querySelectorAll("[data-open]");
let modal_visible = "esta-visible";
let cerrar_modal = document.querySelectorAll("[data-close]");
let form = document.getElementById("modal1");
let currentLocation;

currentLocation = window.location.href;
currentLocation = currentLocation.replace('index.html',"wordle_juego.html");

form.addEventListener("submit",(event,element)=>{
    form.querySelector(".error").classList.remove("active");
    event.preventDefault();
    let error = false;
    if(form.querySelector("input").value.length == 0){
        error = true;
    }
    if (error == false){
        localStorage.setItem("usuario",form.querySelector("input").value);
        window.location.href = "wordle_juego.html";
    }
    else{
        form.querySelector(".error").classList.add("active");
    }

});

function click_abrir_modal(){
    for(let modal of abrir_modal) {
        modal.addEventListener("click", function() {
        let modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(modal_visible);
        });
    }
}
click_abrir_modal();

function click_cerrar_modal(){
    for(let modal of cerrar_modal) {
        modal.addEventListener("click", function() {
        let modalId = this.dataset.close;
        document.getElementById(modalId).classList.remove(modal_visible);
        });
    }
}
click_cerrar_modal();


function click_pantalla_cerrar_modal(){
    document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.esta-visible")) {
            document.querySelector(".modal.esta-visible").classList.remove(modal_visible);
        }
    });
}
click_pantalla_cerrar_modal();





