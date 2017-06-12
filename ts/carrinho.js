///<reference path="Server.ts"/>
var server = new Server();
var currentUser = localStorage.PetStopCurrentUser;
var cartProducts;
let total = 0;
// Pseudo login
function authenticate() {
    let username = document.getElementById("login_user").value;
    let password = document.getElementById("pass_user").value;
    if (!server.isAdmin(username)) {
        if (server.login(username, password)) {
            localStorage.PetStopCurrentUser = username;
            window.location.href = "carrinho.html";
        }
        else {
            $("#login_failed").show();
            $("html, body").animate({ scrollTop: 0 }, "fast");
        }
    }
    else
        $("#loginError").html("Usuários administradores não podem realizar pedidos.");
}
function refreshProducts() {
    let i = 0;
    let aux = new Array(server.products.length + 1);
    let flags = new Array(server.products.length + 1);
    let sum = 0;
    for (i = 0; i < aux.length; i++)
        aux[i] = 0;
    for (i = 0; i < flags.length; i++)
        flags[i] = 0;
    $("#products_table").empty();
    $("#products_table").append('<thead>' +
        '<tr>' +
        '<th>Qtd.</th>' +
        '<th>Produto</th>' +
        '<th>Nome do Produto</th>' +
        '<th>Preço</th>' +
        '<th>Remover</th>' +
        '</tr>' +
        '</thead>');
    for (i = 0; i < cartProducts.length; i++) {
        let productId = -1;
        let j;
        for (j in server.products) {
            if (server.products[j].name == cartProducts[i].name) {
                productId = j;
                break;
            }
        }
        aux[productId] += 1;
    }
    for (i = 0; i < cartProducts.length; i++) {
        let productId = -1;
        let j;
        for (j in server.products) {
            if (server.products[j].name == cartProducts[i].name) {
                productId = j;
                break;
            }
        }
        if (aux[productId] >= 1 && flags[productId] == 0) {
            $("#products_table").append('<tr class="rem1" id="cartProd' + i + '">' +
                '<td class="invert">' + aux[productId] + '</td>' +
                '<td class="invert-image"><a href="single.html"><img src="' + cartProducts[i].pic + '"alt=" " class="img-responsive" /></a></td>' +
                '<td class="invert">' + cartProducts[i].name + '</td>' +
                '<td class="invert">R$' + ((cartProducts[i].price) * (aux[productId])).toFixed(2).replace(".", ",") + '</td>' +
                '<td class="invert">' +
                '<div class="rem">' +
                '<a class="close1" onclick="removeProductFromCart(' + productId + ',' + i + ')"> </a>' +
                '</div>' +
                '</tr>)');
            flags[productId] = 1;
        }
    }
    cartProducts.forEach(product => {
        sum += product.price;
    });
    total = sum;
    $("#products_table").append('<tr>' +
        '<th>Total</th>' +
        '<th colspan="2"></th>' +
        '<th id="total_price">R$ ' + sum.toFixed(2).replace(".", ",") + '</th>' +
        '<th></th>' +
        '</tr>');
}
function removeProductFromCart(id, pos) {
    let i = 0;
    let toRemove = [];
    let sum = 0;
    let n = 0;
    $("#cartProd" + pos).remove();
    for (i = 0; i < cartProducts.length; i++) {
        let j;
        let productId = -1;
        for (j in server.products) {
            if (server.products[j] == cartProducts[i])
                productId = j;
            break;
        }
        if (productId === id) {
            toRemove.push(cartProducts[i]);
        }
    }
    cartProducts = cartProducts.filter(item => toRemove.indexOf(item));
    cartProducts.forEach(product => {
        sum += product.price;
        n++;
    });
    $("#cart_price").html("R$" + sum.toFixed(2).replace(".", ","));
    $("#cart_qtd").html(n.toString() + " itens");
    $("#total_price").html("R$" + sum.toFixed(2).replace(".", ","));
}
$(document).ready(function () {
    cartProducts = JSON.parse(sessionStorage.PetStopCartData);
    if (currentUser == undefined) {
        $("#login_failed").show();
    }
    else {
        $("#login").html('<ul><li>Olá, ' + server.users[currentUser].userName + '</li><li><i class="glyphicon glyphicon-log-in" aria-hidden="true"></i><a href="index.html">Logout</a></li></ul>');
    }
    $("#login_button").click(authenticate);
    $("#pass_user").keypress(function (e) {
        if (e.keyCode == 13)
            $("#login_button").click();
    });
    refreshProducts();
    $("#checkoutPayment").on("click", function (ev) {
        let day = new Date().toISOString().split("T")[0];
        let creditCard = $("#creditCard").val();
        let csc = $("#csc").val();
        let expDate = $("#expDate").val();
        let cardFlag = $("input[name=flag]:checked").val();
        //Validacao de campos
        let regexp = /^\d{16}$/;
        if (!regexp.test(creditCard)) {
            $("#creditCardError").html("<strong>Erro:</strong> Cartão inválido.").show().delay(5000).fadeOut();
            return false;
        }
        regexp = /^\d{3}$/;
        if (!regexp.test(csc)) {
            $("#cscError").html("<strong>Erro:</strong> Código de segurança inválido.").show().delay(5000).fadeOut();
            return false;
        }
        regexp = /^[1-12]\/\d{2}$/;
        if (!regexp.test(expDate)) {
            $("#expDateError").html("<strong>Erro:</strong> Data inválida.").show().delay(5000).fadeOut();
            return false;
        }
        let result = server.addSale(currentUser, cartProducts, day, creditCard, csc, expDate, total, "solicitado");
        if (result != "ok") {
            $("#newScheduleError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut();
            return false;
        }
        sessionStorage.clear();
        return true;
    });
});
//# sourceMappingURL=carrinho.js.map