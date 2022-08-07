let volver_juego = document.querySelector(".volver");
let form_contacto = document.getElementById("formContacto");
let nombre = document.getElementById("nombre");
let error_nombre = document.querySelector(".mensaje-nombre");
let email = document.getElementById("mail");
let error_email = document.querySelector(".mensaje-email");
let mensaje = document.getElementById("mensaje");
let error_mensaje = document.querySelector(".mensaje-error");

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
            errorFormulario = false;
            error_nombre.innerHTML = "";
            error_nombre.classList.remove("mensaje_error");
        }

        let regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if(!regex.test(email.value)){
            errorFormulario = true;
            error_email.innerHTML = "El formato del email es incorrecto";
            error_email.classList.add("mensaje_error");
        }
        else{
            errorFormulario = false;
            error_email.innerHTML = "";
            error_email.classList.remove("mensaje_error");
        }

        if (mensaje.value.length < 5) {
            errorFormulario = true;
            error_mensaje.innerHTML = "El mensaje es demasiado corto";
            error_mensaje.classList.add("mensaje_error");
        }
        else{
            errorFormulario = false;
            error_mensaje.innerHTML = "";
            error_mensaje.classList.remove("mensaje_error");
        }

        if (errorFormulario == false) {
            window.open(`mailto:amarillojuanignacio8@gmail.com?subject=Consulta de ${nombre.value}&body=${mensaje.value}`);
            form_contacto.reset();
        }
    })
}
validaciones_form();



