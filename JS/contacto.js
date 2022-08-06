let volver_juego = document.querySelector(".volver");
let form_contacto = document.getElementById("formContacto");
let nombre = document.getElementById("nombre");
let error_nombre = document.querySelector(".mensaje-nombre");
let email = document.getElementById("mail");
let error_email = document.querySelector(".mensaje-email");

console.log(volver_juego);

function juego(){
    volver_juego.addEventListener("click", function(){
        window.location.href = "wordle_juego.html";
    });
}
juego();

function validaciones_form(){
    form_contacto.addEventListener("submit", function(event){

        event.preventDefault();

        let errorFormulario = false;

        if(nombre.value.length < 3){
            errorFormulario = true;
            error_nombre.innerHTML = "Debe contener al menos 3 caracteres";
            error_nombre.classList.add("mensaje_error");
        }
        else{
            error_nombre.innerHTML = "";
            error_nombre.classList.remove("mensaje_error");
        }

        let regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if(!regex.test(email.value)){
            errorFormulario = true;
            error_email.innerHTML = "El formato del email es incorrecto";
            error_email.classList.add("mensaje_error");
        }else{
            error_email.innerHTML = "";
            error_email.classList.remove("mensaje_error");
        }




    })
}
validaciones_form();



