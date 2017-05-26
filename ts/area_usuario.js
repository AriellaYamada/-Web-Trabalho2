///<reference path="Server.ts"/>
var server = new Server();
function refreshUserData() {
    $(".clientData").each(function () {
        let field_name = $(this).attr("id");
        $(this).html(server.data[field_name]);
    });
    $("#clientPic").attr("src", server.data.clientPic);
}
function refreshUserPets() {
    $("#petContainer").empty();
    for (let i = 0; i < server.data.clientPets.length; i++) {
        let pet = server.data.clientPets[i];
        /*
        <div class="col-md-3 new-collections-grid">
            <div class="new-collections-grid1 animated wow slideInUp" data-wow-delay=".5s">
                <div class="new-collections-grid1-image">
                    <a href="single.html" class="product-image"><img src="img/doge.jpg" alt=" " class="img-responsive" /></a>
                    <div class="new-collections-grid1-image-pos">
                        <a href="single.html">Detalhes</a>
                    </div>
                </div>
                <h4><a href="single.html">Kabosu</a></h4>
                <p>Shiba Inu</p>
            </div>
        */
        let d1 = $("<div class='col-md-3 new-collections-grid'></div>");
        let d2 = $("<div class='new-collections-grid1 animated wow slideInUp' data-wow-delay='.5s'></div>");
        let d3 = $("<div class='new-collections-grid1-image'></div>");
        let a = $("<a class='product-image'></a>");
        let img = $("<img class='img-responsive' alt='" + pet.name + "' src='" + pet.pic + "'></img>");
        let d4 = $("<div class='new-collections-grid1-image-pos'></div>");
        let a2 = $("<a href='single.html'>Detalhes</a>");
        let h4 = $("<h4><a href='single.html'>" + pet.name + "</a></h4>");
        let p = $("<p>" + pet.breed + "</p>");
        d1.append(d2);
        d2.append(d3);
        d3.append(a);
        a.append(img);
        d3.append(d4);
        d4.append(a2);
        d3.append(h4);
        d3.append(p);
        $("#petContainer").append(d1);
    }
    if (server.data.clientPets.length == 0)
        $("#petContainer").html("Sem pets cadastrados.");
}
$(document).ready(function () {
    // Nome de usuário na saudação:
    $("#user").html(server.data.clientId);
    // Preenchendo pets e dados do usuário:
    refreshUserPets();
    refreshUserData();
    // Para quando o cliente altera sua foto:
    $("#clientPicUploader").on("change", function () {
        inputImageToBase64(this.files[0], result => { server.data.clientPic = result; refreshUserData(); });
    });
    // Para salvar o estado do servidor mock ao sair da página:
    $(window).on("unload", () => server.saveState());
    // Cadastro de novo Pet:
    $("#petForm").on("submit", function (ev) {
        let age = +$("#petForm input[name=age]").val();
        let name = $("#petForm input[name=name]").val();
        let id = $("#petForm input[name=id]").val();
        let breed = $("#petForm input[name=breed]").val();
        if (isNaN(age) || age < 0) {
            $("#invalid_age").show();
            return false;
        }
        $("#invalid_age").hide();
        inputImageToBase64($("#petForm input[name=pic]")[0].files[0], pic => {
            server.addClientPet(name, breed, id, age, pic);
        });
        return true;
    });
    // Para fazer alterações dos dados cadastrais do usuário:
    $(".editInfo").css("cursor", "pointer"); // cursor de link
    $(".editInfo").click(function () {
        let editButton = $(this);
        editButton.hide();
        let field = editButton.prev(); // sibling anterior (contém o dado atual do usuário)
        field.hide();
        let updateInputField = $("<input type=\"text\"></input>"); // cria novo elemento input	
        updateInputField.val(field.html()); // inicializa o valor do element input com o valor do dado atual
        updateInputField.blur(function () {
            server.data[field.attr("id")] = $(this).val(); // o id de field tem o mesmo nome que o atributo correspondente no servidor
            refreshUserData();
            field.show();
            $(this).remove();
            editButton.show();
        });
        updateInputField.keydown(function (e) {
            if (e.keyCode == 13)
                $(this).blur();
            if (e.keyCode == 27) {
                field.show();
                $(this).remove();
                editButton.show();
            }
        });
        field.after(updateInputField);
        updateInputField.focus();
    });
});
//# sourceMappingURL=area_usuario.js.map