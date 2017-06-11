
///<reference path="Server.ts"/>

declare var $: any;
var server: Server = new Server()
var currentUser: string = localStorage.PetStopCurrentUser

let cartProducts: Product[] = [];
let currentPage: number = 1;
let nPages: number = 0;
let pageFlag: number = 0;
let filterFlag: number = 0;

// Pseudo login
function authenticate() : void
{
	let username : string = (<HTMLInputElement>document.getElementById("login_user")).value;
	let password : string = (<HTMLInputElement>document.getElementById("pass_user")).value;

	if (server.login(username, password))
	{
		localStorage.PetStopCurrentUser = username
		if (server.isAdmin(username))
			window.location.href = "area_adm.html"
		else
			window.location.href = "loja.html"
	}
	else
	{
		$("#login_failed").show()
		$("html, body").animate({scrollTop: 0}, "fast")
	}
}

$(document).ready(function()
{
	$("#login_button").click(authenticate)				// associando a função acima ao botão de login
	$("#pass_user").keypress(function(e)				// para o "enter" funcionar para fazer login
	{
		if (e.keyCode == 13)
			$("#login_button").click()
	})

	// Nome de usuário na saudação:
	$("#greetName").html(server.users[currentUser].userName)
})

function changePage(page: number) : void
{
	currentPage = page;

	let i: number = 0;
	let p: number = (currentPage-1) * 9;

	nPages = Math.ceil(server.products.length / 9);

	for (i = 2; i <= nPages; i++){
		$("#page" + i).remove();
	}

	for (i = 2; i <= nPages; i++){
		$("#pagination").append('<li id="page' + i + '"><a href="#top" onclick="changePage('+ i + ')">2</a></li>');
	}
	pageFlag = 1;


	$("a[href='#top']").click(function() {
  		$("html, body").animate({ scrollTop: 100 }, "slow");
  		return false;
	});

	$(".active").attr("class", "");
	$("#page" + currentPage).attr("class", "active");

	for (i = 1; i <= 9; i++){
		$(".product" + i).each(function()
		{
			try
			{
				$("#product" + i + "image").attr("src", server.products[i-1+p].pic);
				$("#modal" + i + "image").attr("src", server.products[i-1+p].pic);
				$("#product" + i + "name").html(server.products[i-1+p].name);
				$("#modal" + i + "name").html(server.products[i-1+p].name);
				$("#product" + i + "desc").html(server.products[i-1+p].description);
				$("#modal" + i + "desc").html(server.products[i-1+p].description);
				$("#product" + i + "price").html("R$" + server.products[i-1+p].price.toFixed(2).replace(".", ","));
				$("#modal" + i + "price").html("R$" + server.products[i-1+p].price.toFixed(2).replace(".", ","));
			}
			catch (e)
			{
				$("#product" + i + "image").attr("src", "");
				$("#modal1image").attr("src", "");
				$("#product" + i + "name").html("");
				$("#modal1name").html("");
				$("#product" + i + "desc").html("");
				$("#modal1desc").html("");
				$("#product" + i + "price").html("");
				$("#modal1price").html("");
			}
		})
	}

	for (i = 1; i <= 9; i++)
		$("#alert" + i).hide();
}

function cart(pos: number)
{
	let p: number = (currentPage-1) * 9;
	let sum: number = 0;
	let n: number = 0;

	cartProducts.push(server.products[pos-1+p]);

	cartProducts.forEach(product => {
		sum += product.price;
		n++;
	});

	$("#cart_price").html("R$" + sum.toFixed(2).replace(".", ","));
	$("#cart_qtd").html(n.toString() + " itens");

	$("#alert" + pos).alert();
	$("#alert" + pos).fadeTo(2000, 500).slideUp(500, function(){
    	$("#alert" + pos).slideUp(500);
    });

}

function addProductToCart()
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
		let productId = server.products.indexOf(cartProducts[i])
		aux[productId] += 1;
	}

	for (i = 0; i < cartProducts.length; i++){
		let productId = server.products.indexOf(cartProducts[i])
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
		let productId = server.products.indexOf(cartProducts[i])
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

function sort(value: string)
{
	let sortedProducts: Product[] = [];
	let i: number = 0;

	if (value === "price"){
		sortedProducts = server.products.sort(function(a, b) {
			return a.price - b.price;
		});
	}
	else if (value === "price_desc"){
		sortedProducts = server.products.sort(function(a, b) {
			return b.price - a.price;
		});
	}
	else if (value === "name"){
		sortedProducts = server.products.sort(function(a, b) {
			if (a.name < b.name)
				return -1;
			else if (a.name > b.name)
				return 1;
			else
				return 0;
		});
	}

	/*sortedProducts.forEach(product =>{
		alert(product.name + " " + product.price);
	})*/

	let p: number = (currentPage-1) * 9;

	for (i = 1; i <= 9; i++){
		$(".product" + i).each(function()
		{
			try
			{
				$("#product" + i + "image").attr("src", sortedProducts[i-1+p].pic);
				$("#modal" + i + "image").attr("src", sortedProducts[i-1+p].pic);
				$("#product" + i + "name").html(sortedProducts[i-1+p].name);
				$("#modal" + i + "name").html(sortedProducts[i-1+p].name);
				$("#product" + i + "desc").html(sortedProducts[i-1+p].description);
				$("#modal" + i + "desc").html(sortedProducts[i-1+p].description);
				$("#product" + i + "price").html("R$" + sortedProducts[i-1+p].price.toFixed(2).replace(".", ","));
				$("#modal" + i + "price").html("R$" + sortedProducts[i-1+p].price.toFixed(2).replace(".", ","));
			}
			catch (e)
			{
				$("#product" + i + "image").attr("src", "");
				$("#modal1image").attr("src", "");
				$("#product" + i + "name").html("");
				$("#modal1name").html("");
				$("#product" + i + "desc").html("");
				$("#modal1desc").html("");
				$("#product" + i + "price").html("");
				$("#modal1price").html("");
			}
		})
	}
}
