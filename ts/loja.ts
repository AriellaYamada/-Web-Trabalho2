
///<reference path="Server.ts"/>

declare var $: any;
var server: Server = new Server()

let cartProducts: Product[] = [];
let currentPage: number = 1;

function changePage(page: number) : void
{

	if (page == 0)
		currentPage = 1;
	else
		currentPage = page;
	
	if (page == 0){
		if (localStorage.currPage){
			currentPage = JSON.parse(localStorage.currPage);
		}
	}

	localStorage.currPage = JSON.stringify(currentPage);

	/*if (localStorage.currPage){
		currentPage = JSON.parse(localStorage.currPage);
	}
	else{
		currentPage = page;
	}*/


	$("a[href='#top']").click(function() {
  		$("html, body").animate({ scrollTop: 100 }, "slow");
  		return false;
	});

	let i: number = 0;
	let p: number = (currentPage-1) * 9;

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
}