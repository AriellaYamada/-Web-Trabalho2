interface Product
{
	name: string
	id: number
	pic: string
	description: string
	price: number
	type: string
}

let x = [
	{name: "Ração Premier Golden Special Cães Adultos Frango e Carne", id: 1, pic: "images/produto1.jpg", 
	 description: "Ração Premium especial para cães adultos de porte médio", price: 104.90, type: "racao"},
	{name: "Ração Premier Golden Formula Cães Adultos Frango e Arroz", id: 2, pic: "images/produto2.jpg",
	 description: "Ração Premium especial para cães adultos de porte peq.", price: 14.30, type: "racao"},
	{name: "Ração Premier Pet Formula Cães Adultos Raças Pequenas", id: 3, pic: "images/produto3.jpg", 
	 description: "Indicada para cães adultos de raça pequena", price: 28.90, type: "racao"},
	{name: "Ração Premier Golden Formula Cães Filhotes Frango e Arroz", id: 4, pic: "images/produto4.jpg", 
	 description: "Alimento premium especial indicada para cães filhotes", price: 15.30, type: "racao"},
	{name: "Antipulgas e Carrapatos MSD Bravecto para Cães de 4,5 a 10 kg", id: 5, pic: "images/produto5.jpg", 
	 description: "Um único comprimido é eficaz por 12 semanas", price: 178.90, type: "remedio"},
	{name: "Antipulgas e Carrapatos NexGard 28 mg para Cães de 4 a 10 Kg", id: 6, pic: "images/produto6.jpg", 
	 description: "Tablete com sabor suave de carne aceito pelos cães", price: 67.35, type: "remedio"},
	{name: "Antipulgas e Carrapatos Frontline Plus para Cães de 1 a 10 kg", id: 7, pic: "images/produto7.jpg", 
	 description: "Embalagem individual, validade: Junho/2017", price: 49.87, type: "remedio"},
	{name: "Brinquedo Osso Plaque Ataque Borracha com Cravo - Vermelho", id: 8, pic: "images/produto8.jpg", 
	 description: "Ideal para Raças Pequenas e Minis", price: 3.90, type: "brinquedo"},
	{name: "Brinquedo Furacão Pet Dental Bone Algodão com Nó - Azul", id: 9, pic: "images/produto9.jpg", 
	 description: "Resistente; Auxlia no combate ao tártaro", price: 12.90, type: "brinquedo"},

	{name: "Ração Premier Golden Special Cães Adultos Frango e Carne", id: 1, pic: "images/produto1.jpg", 
	 description: "Ração Premium especial para cães adultos de porte médio", price: 104.90, type: "racao"},
	{name: "Ração Premier Golden Formula Cães Adultos Frango e Arroz", id: 2, pic: "images/produto2.jpg",
	 description: "Ração Premium especial para cães adultos de porte peq.", price: 14.30, type: "racao"},
	{name: "Ração Premier Pet Formula Cães Adultos Raças Pequenas", id: 3, pic: "images/produto3.jpg", 
	 description: "Indicada para cães adultos de raça pequena", price: 28.90, type: "racao"},
	{name: "Ração Premier Golden Formula Cães Filhotes Frango e Arroz", id: 4, pic: "images/produto4.jpg", 
	 description: "Alimento premium especial indicada para cães filhotes", price: 15.30, type: "racao"},
	{name: "Antipulgas e Carrapatos MSD Bravecto para Cães de 4,5 a 10 kg", id: 5, pic: "images/produto5.jpg", 
	 description: "Um único comprimido é eficaz por 12 semanas", price: 178.90, type: "remedio"},
	{name: "Antipulgas e Carrapatos NexGard 28 mg para Cães de 4 a 10 Kg", id: 6, pic: "images/produto6.jpg", 
	 description: "Tablete com sabor suave de carne aceito pelos cães", price: 67.35, type: "remedio"},
	{name: "Antipulgas e Carrapatos Frontline Plus para Cães de 1 a 10 kg", id: 7, pic: "images/produto7.jpg", 
	 description: "Embalagem individual, validade: Junho/2017", price: 49.87, type: "remedio"},
	{name: "Brinquedo Osso Plaque Ataque Borracha com Cravo - Vermelho", id: 8, pic: "images/produto8.jpg", 
	 description: "Ideal para Raças Pequenas e Minis", price: 3.90, type: "brinquedo"},
	{name: "Brinquedo Furacão Pet Dental Bone Algodão com Nó - Azul", id: 9, pic: "images/produto9.jpg", 
	 description: "Resistente; Auxlia no combate ao tártaro", price: 12.90, type: "brinquedo"}
	];

	let products: Product[] = x;

/*function showProducts() : void
{

	let i: number = 0;

	for (i = 1; i <= 9; i++){
		$(".product" + i).each(function()
		{
			$("#product" + i + "image").attr("src", products[i-1].pic);
			$("#product" + i + "name").html(products[i-1].name);
			$("#product" + i + "desc").html(products[i-1].description);
			$("#product" + i + "price").html("R$" + products[i-1].price.toFixed(2).replace(".", ","));
		})
	}
}*/

function changePage(page: number) : void
{
	let i: number = 0;
	let p: number = (page-1) * 9;

	$(".active").attr("class", "");
	$("#page" + page).attr("class", "active");
 
	for (i = 1; i <= 9; i++){
		$(".product" + i).each(function()
		{
			try
			{
				$("#product" + i + "image").attr("src", products[i-1+p].pic);
				$("#product" + i + "name").html(products[i-1+p].name);
				$("#product" + i + "desc").html(products[i-1+p].description);
				$("#product" + i + "price").html("R$" + products[i-1+p].price.toFixed(2).replace(".", ","));
			}
			catch (e)
			{
				$("#product" + i + "image").attr("src", "");
				$("#product" + i + "name").html("");
				$("#product" + i + "desc").html("");
				$("#product" + i + "price").html("");
			}
		})
	}
}
