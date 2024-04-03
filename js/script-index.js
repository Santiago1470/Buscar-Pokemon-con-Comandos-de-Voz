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

$(document).ready(function () {
    precargarPokemones();
    ocultarCardPokemon();
    $(document).on("click", ".card-pokemon", function() {
        let idPokemon = $(this).attr("idpokemon")
        let txtBuscador = document.querySelector("#txt_buscador");
        txtBuscador.value = idPokemon
        $("#buscar").click()
    });

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
                // var cardPokemon = `
                // <div class="card card-pokemon">
                //     <div class="imagen">
                //     <img src="${data.sprites.other.home.front_default}" width="250px" id="pokemon">
                //     </div>
                //     <div class="card-body info-p-pokemon">
                //         <h5 class="card-title titulo-card">${data.name}</h5>
                //         <p class="card-text">Movimientos:</p>
                //         <ul>
                //         <p class="card-text">Movimiento: ${mov1}</p>
                //         <p class="card-text">Movimiento: ${mov2}</p>
                //         </ul>
                //         <p class="card-text">Altura: ${data.height} pies</p>
                //         <p class="card-text">Peso: ${data.weight} libras</p>
                //         <p class="card-text">Tipo: ${tipo}</p>
                //         <p class="card-text">Puntos de Vida: ${data.stats[0].base_stat}</p>
                //         <p class="card-text">Puntos de Ataque: ${data.stats[1].base_stat}</p>
                //         <p class="card-text">Puntos de Defensa: ${data.stats[2].base_stat}</p>
                //         <p class="card-text">Velocidad: ${data.stats[5].base_stat}</p>
                //     </div>
                // </div>
                // `;

                // $(".contenedor-card").html(cardPokemon);
                // $(".card-pokemon").css("background-color", rgbaColor);
                // $(".card-pokemon").css("box-shadow", `10px 7px 10px ${colorTipo}`);
                // $("#pokemon").css("filter", `drop-shadow(10px 7px 10px ${colorTipo})`);

                ocultarInicio()

                let vida = data.stats[0].base_stat
                let ataque = data.stats[1].base_stat
                let defensa = data.stats[2].base_stat
                let velocidad = data.stats[5].base_stat

                $(".idPokemon").text(`#${data.id}`).css("color", rgbaColor)
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
                $(".modal-body").html(`<img src="files/error.png"><p>El pokémon con el nombre <strong>${nombreP}</strong> no existe.</p>`);
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


function precargarPokemones() {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/?limit=24",
        dataType: "json",
        success: function (data) {
            // console.log(data)
            // mostrarPrecarga(data);
            const pokemonList = data.results;
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
    let buscadorCardPokemon = `
    <input class="form-control me-2" type="text" name="" id="txt_buscador" placeholder="Buscar Pokémon">
    <input id="buscar" class="btn btn-outline-info" type="button" value="Buscar">
    `
    let buscadorVozCardPokemon = `
    <p id="activar" class="btn-buscarVoz2">Buscar por voz</p>
    `

    // $("#contenedor-activarCard").append(buscadorVozCardPokemon)
    // $("#contenedor-buscadorCard").html(buscadorCardPokemon)

    // $("#activar").show()
    // $("#contenedor-buscador").show()
    $(".contenedor-cardP").show()


    // $("#contenedor-buscadorInicio").html("")
    // $(".contenedor-inicio").hide()
    $(".contenedor-pokemones").hide()
}

function ocultarCardPokemon() {
    let buscadorInicio = `
        <input id="activar" class="btn-buscarVoz" type="button" value="Buscar por voz">
        <input class="buscador" type="text" id="txt_buscador" placeholder="Buscar Pokémon">
        <input id="buscar" class="btn-buscar" type="button" value="Buscar">
    `
    // visibility: hidden;
    // $("#activar").hide()
    // $("#contenedor-buscador").hide()
    $(".contenedor-cardP").hide()
    // $("#activar").remove()
    // $("#contenedor-buscadorCard").html("")

    // $("#contenedor-buscadorInicio").html(buscadorInicio)
    // $(".contenedor-inicio").show()
    $(".contenedor-pokemones").show()
}

$(".btn-inicio").on("click", () => {
    ocultarCardPokemon()
})

