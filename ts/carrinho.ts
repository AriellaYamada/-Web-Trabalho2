///<reference path="Server.ts"/>

// Script com a lógica específica da página area_usuario.html
declare var $: any;
var server: Server = new Server()
var currentUser: string = localStorage.PetStopCurrentUser
var cartProducts : Product[]

// Pseudo login
function authenticate() : void
{
	let username : string = (<HTMLInputElement>document.getElementById("login_user")).value;
	let password : string = (<HTMLInputElement>document.getElementById("pass_user")).value;

	if (!server.isAdmin(username))
	{
		if (server.login(username, password))
		{
			localStorage.PetStopCurrentUser = username
			window.location.href = "carrinho.html"
		} else
		{
			$("#login_failed").show()
			$("html, body").animate({scrollTop: 0}, "fast")
		}
	} else
		$("#loginError").html("Usuários administradores não podem realizar pedidos.")
}

function refreshProducts()
{

	let i: number = 0;
	let aux: number[] = new Array<number>(server.products.length+1);
	let flags: number[] = new Array<number>(server.products.length+1);
	let sum: number = 0;

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
	'</thead>')

	for (i = 0; i < cartProducts.length; i++){
		let productId = -1
		let j
		for(j in server.products) {
			if(server.products[j].name == cartProducts[i].name) {
				productId = j
				break
			}
		}
		aux[productId] += 1;
	}

	for (i = 0; i < cartProducts.length; i++){
		let productId = -1
		let j
		for(j in server.products) {
			if(server.products[j].name == cartProducts[i].name) {
				productId = j
				break
			}
		}
		if (aux[productId] >= 1 && flags[productId] == 0){
			$("#products_table").append('<tr class="rem1" id="cartProd' + i + '">' +
			'<td class="invert">' + aux[productId] + '</td>' +
			'<td class="invert-image"><a href="single.html"><img src="' + cartProducts[i].pic + '"alt=" " class="img-responsive" /></a></td>' +
			'<td class="invert">' + cartProducts[i].name +'</td>' +
			'<td class="invert">R$' + ((cartProducts[i].price)*(aux[productId])).toFixed(2).replace(".", ",") + '</td>' +
			'<td class="invert">' +
			'<div class="rem">' +
			'<a class="close1" onclick="removeProductFromCart(' + productId + ',' + i + ')"> </a>' +
			'</div>' +
			'</tr>)')
			flags[productId] = 1;
		}
	}

	cartProducts.forEach(product => {
		sum += product.price;
	});

	$("#products_table").append('<tr>' +
	'<th>Total</th>' +
	'<th colspan="2"></th>' +
	'<th id="total_price">R$ ' + sum.toFixed(2).replace(".", ",") + '</th>' +
	'<th></th>' +
	'</tr>');
}

function removeProductFromCart(id: number, pos: number)
{
	let i: number = 0;
	let toRemove: Product[] = [];
	let sum: number = 0;
	let n: number = 0;

	$("#cartProd" + pos).remove();

	for (i = 0; i < cartProducts.length; i++){
		let j
		let productId = -1
		for(j in server.products) {
			if(server.products[j] == cartProducts[i])
			productId = j
			break
		}
		if (productId === id){
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


$(document).ready(function()
{
	cartProducts = JSON.parse(sessionStorage.PetStopCartData)
	if (currentUser == undefined) {
		$("#login_failed").show()
	} else {
		$("#login").html('<ul><li>Olá, ' + server.users[currentUser].userName + '</li><li><i class="glyphicon glyphicon-log-in" aria-hidden="true"></i><a href="index.html">Logout</a></li></ul>')
	}

	$("#login_button").click(authenticate)
	$("#pass_user").keypress(function(e)				// para o "enter" funcionar para fazer login
	{
		if (e.keyCode == 13)
			$("#login_button").click()
	})

	refreshProducts()
})
