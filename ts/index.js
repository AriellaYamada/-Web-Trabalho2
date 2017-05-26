///<reference path="Server.ts"/>
// Pseudo login
function authenticate() {
    let username = document.getElementById("login_user").value;
    let password = document.getElementById("pass_user").value;
    if (username == "admin") {
        if (password == "admin") {
            window.location.href = "area_adm.html";
        }
        else {
            $("#login_failed").show();
            $("html, body").animate({ scrollTop: 0 }, "fast");
        }
    }
    else {
        window.location.href = "area_usuario.html";
    }
}
$(document).ready(function () {
    $("#login_button").click(authenticate); // associando a função acima ao botão de login
    $("#pass_user").keypress(function (e) {
        if (e.keyCode == 13)
            $("#login_button").click();
    });
});
//# sourceMappingURL=index.js.map