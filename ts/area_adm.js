///<reference path="Server.ts"/>
var server = new Server();
var currentUser = localStorage.PetStopCurrentUser;
function refreshUserData() {
    $(".clientData").each(function () {
        let field_name = $(this).attr("id");
        $(this).html(server.users[currentUser][field_name]);
    });
    $("#userPic").attr("src", server.users[currentUser].userPic);
}
function refreshUserList() {
    $("#userList").empty();
    for (let user in server.users)
        $("#userList").append($("<tr><td>" + server.users[user].userId + "</td><td>" + server.users[user].userName + "</td><td><a href=\"\">Detalhes</a></td></tr>"));
}
$(document).ready(function () {
    // Nome de usuário na saudação:
    $("#greetName").html(server.users[currentUser].userName);
    // Preenchendo dados do usuário:
    refreshUserData();
    // Lista de usuários
    refreshUserList();
    // Para quando o administrador altera sua foto:
    $("#clientPicUploader").on("change", function () {
        inputImageToBase64(this.files[0], result => { server.users[currentUser].userPic = result; refreshUserData(); });
    });
    // Para salvar o estado do servidor mock ao sair da página:
    $(window).on("unload", () => server.saveState());
    // Form de novo usuário
    $("#newUserForm input[name=usertype]").on("change", function () {
        $("#newUserForm input[name=address]").val("");
        $("#newUserForm #addressDiv").toggle();
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
            server.users[currentUser][field.attr("id")] = $(this).val(); // o id de field tem o mesmo nome que o atributo correspondente no servidor
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
//# sourceMappingURL=area_adm.js.map