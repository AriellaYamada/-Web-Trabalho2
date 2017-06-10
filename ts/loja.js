///<reference path="Server.ts"/>
var server = new Server();
function changePage(page) {
    let i = 0;
    let p = (page - 1) * 9;
    $(".active").attr("class", "");
    $("#page" + page).attr("class", "active");
    for (i = 1; i <= 9; i++) {
        $(".product" + i).each(function () {
            try {
                $("#product" + i + "image").attr("src", server.products[i - 1 + p].pic);
                $("#modal" + i + "image").attr("src", server.products[i - 1 + p].pic);
                $("#product" + i + "name").html(server.products[i - 1 + p].name);
                $("#modal" + i + "name").html(server.products[i - 1 + p].name);
                $("#product" + i + "desc").html(server.products[i - 1 + p].description);
                $("#modal" + i + "desc").html(server.products[i - 1 + p].description);
                $("#product" + i + "price").html("R$" + server.products[i - 1 + p].price.toFixed(2).replace(".", ","));
                $("#modal" + i + "price").html("R$" + server.products[i - 1 + p].price.toFixed(2).replace(".", ","));
            }
            catch (e) {
                $("#product" + i + "image").attr("src", "");
                $("#modal1image").attr("src", "");
                $("#product" + i + "name").html("");
                $("#modal1name").html("");
                $("#product" + i + "desc").html("");
                $("#modal1desc").html("");
                $("#product" + i + "price").html("");
                $("#modal1price").html("");
            }
        });
    }
}
//# sourceMappingURL=loja.js.map