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


$(document).ready(function () {
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
                var cardPokemon = `
                <div class="card card-pokemon">
                    <div class="imagen">
                    <img src="${data.sprites.front_default}" width="250px" id="pokemon">
                    </div>
                    <div class="card-body info-p-pokemon">
                        <h5 class="card-title titulo-card">${data.name}</h5>
                        <p class="card-text">Movimientos:</p>
                        <ul>
                        <p class="card-text">Movimiento: ${mov1}</p>
                        <p class="card-text">Movimiento: ${mov2}</p>
                        </ul>
                        <p class="card-text">Altura: ${data.height} pies</p>
                        <p class="card-text">Peso: ${data.weight} libras</p>
                        <p class="card-text">Tipo: ${tipo}</p>
                        <p class="card-text">Puntos de Vida: ${data.stats[0].base_stat}</p>
                        <p class="card-text">Puntos de Ataque: ${data.stats[1].base_stat}</p>
                        <p class="card-text">Puntos de Defensa: ${data.stats[2].base_stat}</p>
                        <p class="card-text">Velocidad: ${data.stats[5].base_stat}</p>
                    </div>
                </div>
                `;
                $(".contenedor-card").html(cardPokemon);
                $(".card-pokemon").css("box-shadow", `10px 7px 10px ${colorTipo}`);
                $("#pokemon").css("filter", `drop-shadow(10px 7px 10px ${colorTipo})`);
                $(".card-pokemon").css("background-color", `${colorTipo}90`);
            }
        }).fail((jqXHR, textStatus, errorThrown) => {
            if (jqXHR.status == "404") {
                let nombreP = $("#txt_buscador").val();
                $("#modalError").attr("class", "modal fade show").attr("style", "display: block");
                $(".modal-body").html(`<img src="files/error.png"><p>El pokémon con el nombre <strong>${nombreP}</strong> no existe.</p>`);
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

var txtBuscador = document.querySelector("#txt_buscador");
txtBuscador.addEventListener("keypress", () => {

});


var modal = document.querySelector("#modalError");
var botonCerrarModal = document.querySelector("#btn-cerrarModal");
function cerrarModal() {
    modal.setAttribute("class", "modal fade");
    modal.style.display = "none";
}


