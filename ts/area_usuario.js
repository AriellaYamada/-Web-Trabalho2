///<reference path="Server.ts"/>
var server = new Server();
function editInfo() {
}
$(document).ready(function () {
    $(window).unload(() => server.saveState()); // para salvar o estado do servidor mock ao sair da página
    $(".editInfo").click(() => {
        console.log("Oi");
        //console.log($(this).siblings("span"))
        $(this).hide();
    });
});
