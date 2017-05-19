///<reference path="Server.ts"/>
var server = new Server();
function authenticate() {
    let username = document.getElementById("login_user").value;
    let password = document.getElementById("pass_user").value;
    if (username == "admin") {
        if (password == "admin") {
            server.loginUser("admin");
            //sessionStorage.PetStopCurrentUser = "admin";
            window.location.href = "area_adm.html";
        }
        else {
            $("#login_failed").show();
            $("html, body").animate({ scrollTop: 0 }, "fast");
        }
    }
    else {
        //sessionStorage.PetStopCurrentUser = username
        server.loginUser(username);
        window.location.href = "area_usuario.html";
    }
}
$(document).ready(function () {
    $(window).unload(() => saveServerState(server));
    $("#login_button").click(authenticate);
    $("#pass_user").keypress(function (e) {
        if (e.keyCode == 13)
            $("#login_button").click();
    });
});
