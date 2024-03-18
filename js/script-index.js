$(document).ready(function () {
    $("#buscar").on("click", () => {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + $("#txt_buscador").val(),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                // $(".imagen").html(`<img src="${data.sprites.other.home.front_default}" width="250px">`)
                // $(".info-p-pokemon").html(`<p class="card-text">Experiencia básica: ${data.base_experience}</p><p class="card-text">Altura: ${data.height}</p><p class="card-text">Peso: ${data.weight}</p>`)

                // $(".card-title").text(`${data.name}`)
                // $(".base-experience").text(`Experiencia básica: ${data.base_experience}`)
                // $(".height").text(`Altura: ${data.height}`)
                // $(".weight").text(`Peso: ${data.base_experience}`)
                // $(".base-experience").append(` ${data.base_experience}`)
                // $(".info-p-pokemon").append(`<p class="card-text">Altura: ${data.height}<p/>`);
                // $(".info-p-pokemon").append(`<p class="card-text">Peso: ${data.weight}<p/>`);
                // $(".info-p-pokemon").html(`<p class="card-text">Experiencia básica: ${data.base_experience}</p>
                // <p class="card-text">Altura: ${data.height}<p/>
                // <p class="card-text">Peso: ${data.weight}<p/>`)

                var cardPokemon = `
                <div class="card card-pokemon">
                    <div class="imagen">
                        <img src="${data.sprites.other.home.front_default}" width="250px">
                    </div>
                        <!-- <img class="card-img-top" alt="Pokemon"> -->
                    <div class="card-body info-p-pokemon">
                        <h5 class="card-title titulo-card">${data.name}</h5>
                        <p class="card-text">Experiencia básica: ${data.base_experience}</p>
                        <p class="card-text">Altura: ${data.height}</p>
                        <p class="card-text">Peso: ${data.weight}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Tipo: ${data.types[0].type.name}</li>
                        <li class="list-group-item">hp: ${data.stats[0].base_stat}</li>
                        <li class="list-group-item">ataque: ${data.stats[1].base_stat}</li>
                        <li class="list-group-item">defensa: ${data.stats[2].base_stat}</li>
                        <li class="list-group-item">velocidad: ${data.stats[5].base_stat}</li>
                    </ul>
                    <!-- <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div> -->
                </div>
                `;

                var cardPokemon2 = `
                <div class="card mb-3 " style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img class="img-fluid rounded-start" src="${data.sprites.other.home.front_default}">
                    </div>
                        <!-- <img class="card-img-top" alt="Pokemon"> -->
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title titulo-card">${data.name}</h5>
                        <p class="card-text">Experiencia básica: ${data.base_experience}</p>
                        <p class="card-text">Altura: ${data.height}</p>
                        <p class="card-text">Peso: ${data.weight}</p>
                        <p class="list-group-item">Tipo: ${data.types[0].type.name}</p>
                        <p class="list-group-item">hp: ${data.stats[0].base_stat}</p>
                        <p class="list-group-item">ataque: ${data.stats[1].base_stat}</p>
                        <p class="list-group-item">defensa: ${data.stats[2].base_stat}</p>
                        <p class="list-group-item">velocidad: ${data.stats[5].base_stat}</p>
                        </div>
                    </div>
                    
                </div>
                </div>
                `;
                $(".contenedor-card").html(cardPokemon2)

            }
        })
    })
})

var txtBuscador = document.querySelector("#txt_buscador");
txtBuscador.addEventListener("keypress", () => {

});

function buscarPokemon() {

}

