var artyom = new Artyom();

window.addEventListener('load', function () {
    artyom.dontObey();
});

var activarComandos = document.querySelector("#activar");
var activado = false;
activarComandos.addEventListener('click', function () {
    if (!activado) {
        //artyom.say("Comandos de voz activados");
        artyom.obey();
        //activarComandos.textContent = "Desactivar comandos de voz";
        activado = true;
        comandoVoz = false;
    }
});
var comandoVoz = false;
artyom.addCommands({
    indexes: ["comando", "Buscar por voz"/*, "activar comandos de voz", "desactivar comandos de voz", "buscar"*/],
    action: function (i) {
        if (i == 0) {
            console.log("recibido");

        } else if (i == 1) {
            let txtBuscador = document.querySelector("#txt_buscador");
            let buscar = textoPorVoz.split(" ");
            txtBuscador.value = buscar[buscar.length - 1].toLowerCase();
            document.querySelector("#buscar").click();
            artyom.dontObey()
            comandoVoz = false;
        }
    }
});

artyom.initialize({
    lang: "es-ES",
    debug: true,
    listen: true,
    continuous: true,
    speed: 1,
    mode: "normal",
    obeyKeyword: "Buscar por voz"
    // obeyKeyword: "activar comandos de voz"
});

var textoPorVoz = "";
artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
    if (isFinal) {
        console.log("Texto final reconocido: " + recognized);
        textoPorVoz = recognized;
        let buscar = textoPorVoz.trim().split(" ");
        if(buscar[0] == "Buscar"){
            comandoVoz = true;
        }
        if (!comandoVoz) {
            let txtBuscador = document.querySelector("#txt_buscador");
            txtBuscador.value = textoPorVoz.trim();
            document.querySelector("#buscar").click();
            artyom.dontObey();
        }
        activado = false;
    } else {
        console.log(recognized);
    }
});