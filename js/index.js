function authenticate() {
    var username = document.getElementById("login_user").value;
    var password = document.getElementById("pass_user").value;
    if (username == "admin") {
        if (password == "admin") {
            sessionStorage.currentUser = "admin";
            window.location.href = "area_adm.html";
        }
        else {
            $("#login_failed").show();
            $("html, body").animate({ scrollTop: 0 }, "fast");
        }
    }
    else {
        sessionStorage.currentUser = username;
        window.location.href = "area_usuario.html";
    }
}
$(document).ready(function () {
    $("#login_button").click(authenticate);
    $("#pass_user").keypress(function (e) {
        if (e.keyCode == 13)
            $("#login_button").click();
    });
});
