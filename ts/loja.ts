///<reference path="Server.ts"/>

declare var $: any;
var server: Server = new Server()
var currentUser: string = localStorage.PetStopCurrentUser

var cartProducts: Product[] = [];
var currentPage: number = 1;
var nPages: number = 0;
var pageFlag: number = 0;
var filterFlag: number = 0;

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
			window.location.href = "loja.html"
		} else
		{
			$("#login_failed").show()
			$("html, body").animate({scrollTop: 0}, "fast")
		}
	} else {
		$("#login_failed").show()
		$("#loginError").html("Usuários administradores não podem realizar pedidos.")
	}

}

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

	sessionStorage.PetStopCartData = JSON.stringify(this.cartProducts)
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
$(document).ready(function()
{
	if (!(currentUser == undefined)) {
		$("#login").html('<ul><li>Olá, ' + server.users[currentUser].userName + '</li><li><i class="glyphicon glyphicon-log-in" aria-hidden="true"></i><a href="loja.html" id="logout">Logout</a></li></ul>')
	}

	$("#login_button").click(authenticate)
	$("#pass_user").keypress(function(e)				// para o "enter" funcionar para fazer login
	{
		if (e.keyCode == 13)
			$("#login_button").click()
	})
	$("#logout").click(function(ev)
	{
		localStorage.removeItem("PetStopCurrentUser")
	})
})
