$(document).ready(function () {
    $("#buscar").on("click", function () {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + $("#txt_buscador").val(),
            contentType: "application/json",
            success: function (data) {
                console.log(data.sprites.other.home.front_default)
                $(".imagen").html(`<img src="${data.sprites.other.home.front_default}">`)
                
            }
        })
    })
})