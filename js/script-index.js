const tipoPorColor = {
    'normal': '#808080',
    'fighting': '#FFA07A',
    'flying': '##00BFFF',
    'poison': '#2E8B57',
    'ground': '#8B4513',
    'rock': '#DCDCDC',
    'bug': '#FF6347',
    'ghost': '#7B68EE',
    'steel': '#E6E6FA',
    'fire': '#DC143C',
    'water': '#00FFFF',
    'grass': '#556B2F',
    'electric': '#FFD700',
    'psychic': '#FF69B4',
    'ice': '#B0E0E6',
    'dragon': '#B8860B',
    'dark': '#000000',
    'fairy': '#D8BFD8'
};

function hexToRGBA(hex, alpha) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

var idPokemon = 0

$(document).ready(function () {
    precargarPokemones();
    ocultarCardPokemon();
    $(document).on("click", ".card-pokemon", function () {
        let idPokemon = $(this).attr("idpokemon")
        let txtBuscador = document.querySelector("#txt_buscador");
        txtBuscador.value = idPokemon
        $("#buscar").click()
    });

    $("#txt_buscador").on("keypress", (event) => {
        if (event.keyCode == 13) {
            $("#buscar").click()
        }
    })

    

    $("#buscar").on("click", () => {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + ($("#txt_buscador").val()).toLowerCase(),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                let tipo = data.types[0].type.name;
                let colorTipo = tipoPorColor[tipo];
                let mov1 = (data.abilities[0].ability.name).toUpperCase();
                let mov2 = data.abilities.length > 1 ? (data.abilities[1].ability.name).toUpperCase() : "No existe";
                let rgbaColor = hexToRGBA(colorTipo, 1);

                ocultarInicio()

                let vida = data.stats[0].base_stat
                let ataque = data.stats[1].base_stat
                let defensa = data.stats[2].base_stat
                let velocidad = data.stats[5].base_stat

                $(".idPokemon").text(`#${data.id}`).css("color", rgbaColor)
                idPokemon = data.id
                $(".nombrePokemon").text(data.name)
                $("#alturaPokemon").text(data.height)
                $("#pesoPokemon").text(`${data.weight}kg`)
                $("#tipoPokemon").text(tipo)
                $("#imgPokemon").attr("src", data.sprites.other.home.front_default)

                $("#contenedorProgressHp").attr("aria-valuenow", vida)
                $("#progressHp").attr("style", `width: ${vida}%`).css("background-color", rgbaColor)
                $("#progressNumHp").text(vida)

                $("#contenedorProgressAtaque").attr("aria-valuenow", ataque)
                $("#progressAtaque").attr("style", `width: ${ataque}%`).css("background-color", rgbaColor)
                $("#progressNumAtaque").text(ataque)

                $("#contenedorProgressDefensa").attr("aria-valuenow", defensa)
                $("#progressDefensa").attr("style", `width: ${defensa}%`).css("background-color", rgbaColor)
                $("#progressNumDefensa").text(defensa)

                $("#contenedorProgressVelocidad").attr("aria-valuenow", velocidad)
                $("#progressVelocidad").attr("style", `width: ${velocidad}%`).css("background-color", rgbaColor)
                $("#progressNumVelocidad").text(velocidad)
            }
        }).fail((jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status == "404") {
                let nombreP = $("#txt_buscador").val();
                $("#modalError").attr("class", "modal fade show").attr("style", "display: block");
                $(".modal-body").html(`<img src="files/error.png"><p>El pokémon con el nombre o id <strong>${nombreP}</strong> no existe.</p>`);
                $("body").attr("style", "overflow-y: hidden");
            }
        });
    });
    $("#txt_buscador").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/?limit=1000",
                dataType: "json",
                success: function (data) {
                    var pokemonNames = data.results.map(function (pokemon) {
                        return pokemon.name;
                    });
                    var filteredNames = $.ui.autocomplete.filter(pokemonNames, request.term);
                    response(filteredNames.slice(0, 5));
                }
            });
        },
        minLength: 1,
        appendTo: ".autocompletar"
    }).autocomplete("widget").addClass("autocompletar");

   
});

// var txtBuscador = document.querySelector("#txt_buscador");
// txtBuscador.addEventListener("keypress", () => {

// });

var modal = document.querySelector("#modalError");
var botonCerrarModal = document.querySelector("#btn-cerrarModal");
var body = document.querySelector("body");
function cerrarModal() {
    modal.setAttribute("class", "modal fade");
    modal.style.display = "none";
    body.style.overflowY = "visible";
}

var rangoPokemones = 0;
function precargarPokemones() {
    $.ajax({
        // ?limit=24&offset=${rangoPokemones}
        // ?offset=${rangoPokemones}&limit=24
        url: `https://pokeapi.co/api/v2/pokemon/?offset=${rangoPokemones}&limit=24`,
        dataType: "json",
        success: function (data) {
            // console.log(data)
            // mostrarPrecarga(data);
            const pokemonList = data.results;
            rangoPokemones += pokemonList.length
            for (const pokemon of pokemonList) {
                obtenerPokemon(pokemon.url);
            }
        },
    })
}

function obtenerPokemon(url) {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            mostrarPrecarga(data);
        }
    });
}

function mostrarPrecarga(data) {
    let tipo = data.types[0].type.name;
    let colorTipo = tipoPorColor[tipo];
    let rgbaColor = hexToRGBA(colorTipo, 1);
    let tarjeta = `
            <div class="card-pokemon" style="background-color: ${rgbaColor}" idpokemon="${data.id}">
                <img src="${data.sprites.other.home.front_default}" alt="Imagen de ${data.name}">
            </div>
            `
    // console.log(data)
    $(".contenedor-pokemones").append(tarjeta)
}

function ocultarInicio() {
    $(".contenedor-cardP").show()

    $(".contenedor-pokemones").hide()
    $(".contenedor-verMas").hide()
    let campoBusqueda = document.querySelector("#txt_buscador")
    campoBusqueda.value = ""
}

function ocultarCardPokemon() {
    $(".contenedor-cardP").hide()

    $(".contenedor-pokemones").show()
    $(".contenedor-verMas").show()
    let campoBusqueda = document.querySelector("#txt_buscador")
    campoBusqueda.value = ""
}

$(".btn-inicio").on("click", () => {
    ocultarCardPokemon()
})


$(".btn-verMas").on("click", () => {
    precargarPokemones()
})

$("#flecha-izquierda").on("click", () => {
    let campoBusqueda = document.querySelector("#txt_buscador")
    campoBusqueda.value = idPokemon - 1
    $("#buscar").click()
})

$("#flecha-derecha").on("click", () => {
    let campoBusqueda = document.querySelector("#txt_buscador")
    campoBusqueda.value = idPokemon + 1
    $("#buscar").click()
})
