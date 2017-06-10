
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

function addProductToCart()
{

	let i: number = 0;
	let aux: number[] = new Array<number>(server.products.length);
	let flags: number[] = new Array<number>(server.products.length);

	for (i = 0; i < aux.length; i++)
		aux[i] = 0;

	for (i = 0; i < flags.length; i++)
		flags[i] = 0;

	$("#products_table").empty();
	$("#products_table").append('<thead>' +
									'<tr>' +
										'<th>Qtd.</th>' +
										'<th>Product</th>' +
										'<th>Product Name</th>' +
										'<th>Price</th>' +
										'<th>Remove</th>' +
									'</tr>' +
								'</thead>')

	for (i = 0; i < cartProducts.length; i++){
		aux[cartProducts[i].id] += 1;
	}

	for (i = 0; i < cartProducts.length; i++){
		/*if (aux[cartProducts[i].id] >= 1){
			$("#products_table").append('<tr class="rem1">' +
					'<td class="invert">1</td>' +
					'<td class="invert-image"><a href="single.html"><img src="' + cartProducts[i].pic + '"alt=" " class="img-responsive" /></a></td>' +
					'<td class="invert">' + cartProducts[i].name +'</td>' +
					'<td class="invert">R$' + cartProducts[i].price.toFixed(2).replace(".", ",") + '</td>' +
					'<td class="invert">' +
						'<div class="rem">' +
							'<div class="close1"> </div>' +
						'</div>' +
				'</tr>)')
		}*/
		if (aux[cartProducts[i].id] >= 1 && flags[cartProducts[i].id] == 0){
			$("#products_table").append('<tr class="rem1">' +
					'<td class="invert">' + aux[cartProducts[i].id] + '</td>' +
					'<td class="invert-image"><a href="single.html"><img src="' + cartProducts[i].pic + '"alt=" " class="img-responsive" /></a></td>' +
					'<td class="invert">' + cartProducts[i].name +'</td>' +
					'<td class="invert">R$' + ((cartProducts[i].price)*(aux[cartProducts[i].id])).toFixed(2).replace(".", ",") + '</td>' +
					'<td class="invert">' +
						'<div class="rem">' +
							'<div class="close1"> </div>' +
						'</div>' +
				'</tr>)')
			flags[cartProducts[i].id] = 1;
		}
	}
}