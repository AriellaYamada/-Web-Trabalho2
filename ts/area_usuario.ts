///<reference path="Server.ts"/>

// Script com a lógica específica da página area_usuario.html

declare var $: any;
var server: Server = new Server()
var currentUser: string = localStorage.PetStopCurrentUser

function refreshUserData() : void
{
	$(".clientData").each(function()
	{
		let field_name: string = $(this).attr("id")
		$(this).html(server.users[currentUser][field_name])
	})
	$("#userPic").attr("src", server.users[currentUser].userPic)
}

function refreshUserPets() : void
{
	$("#petContainer").empty()
	let nopets: boolean = true
	let petId: string
	for (petId in server.users[currentUser].pets)
	{
		let pet: Pet = server.users[currentUser].pets[petId]
		/*
		<div class="col-md-3 new-collections-grid">
		<div class="new-collections-grid1 animated wow slideInUp" data-wow-delay=".5s">
		<div class="new-collections-grid1-image">
		<a href="single.html" class="product-image"><img src="img/doge.jpg" alt=" " class="img-responsive" /></a>
		<div class="new-collections-grid1-image-pos">
		<a href="single.html">Detalhes</a>
		</div>
		</div>
		<h4><a href="single.html">Kabosu</a></h4>
		<p>Shiba Inu</p>
		</div>
		*/
		nopets = false

		let d1 = $("<div class='col-md-3 new-collections-grid'></div>")
		let d2 = $("<div class='new-collections-grid1 animated wow slideInUp' data-wow-delay='.5s'></div>")
		let d3 = $("<div class='new-collections-grid1-image'></div>")
		let a = $("<a class='product-image'></a>")
		let img = $("<img class='img-responsive' alt='" + pet.name + "' src='" + pet.pic + "'></img>")
		let d4 = $("<div class='new-collections-grid1-image-pos'></div>")
		let a2 = $("<a href='single.html'>Detalhes</a>")
		let h4 = $("<h4><a href='single.html'>" + pet.name + "</a></h4>")
		let p = $("<p>" + pet.breed + "</p>")

		d1.append(d2)
		d2.append(d3)
		d3.append(a)
		a.append(img)
		d3.append(d4)
		d4.append(a2)
		d3.append(h4)
		d3.append(p)

		$("#petContainer").append(d1)
	}
	if (nopets)
	$("#petContainer").html("Sem pets cadastrados.")
}


$(document).ready(function()
{
	// Nome de usuário na saudação:
	$("#greetName").html(server.users[currentUser].userName)

	// Preenchendo pets e dados do usuário:
	refreshUserPets()
	refreshUserData()

	// Para quando o cliente altera sua foto:
	$("#clientPicUploader").on("change", function()
	{
		inputImageToBase64(this.files[0], result => {server.users[currentUser].userPic = result; refreshUserData()})
	})

	// Para salvar o estado do servidor mock ao sair da página:
	$(window).on("unload", () => server.saveState())

	//Atualizacao do calendario, pets e servicos
	$("#serviceRegForm").on("click", function ()
	{
		let today = new Date().toISOString().split("T")[0]
		$("#calendar").prop("min", today)
		let petId: string
		let opPet = $("<select id='pet'></select>")
		for (petId in server.users[currentUser].pets) {
			let pet: Pet = server.users[currentUser].pets[petId]
			opPet.append($("<option value=" + petId + ">" + pet.name + "</option>"))
		}
		$("#selectPet").html(opPet)
		let serviceId
		let opService = $("<select id='service'></select>")
		for(serviceId in server.services) {
			let service: Service = server.services[serviceId]
			opService.append($("<option value=" + serviceId + ">" + service.name + "</option>"))
		}
		$("#selectService").html(opService)
	})
	//Atualizacao dos horarios disponiveis
	$("#calendar").on("change", function ()
	{
		let date = $("#calendar").val()
		let i: string
		for (i in server.schedules) {
			if(server.schedules[i].day == date) {
				let schedule: Schedule = server.schedules[i]
				$("#time option[value=" + schedule.hour + "]").hide()
			}
		}
	})
	//Atualizar preco do servico
	$("#service").on("click", function ()
	{
		let price = server.services[this.value].price
		console.log(price)
		//$("#servicePrice").append(server.services[this.value].price.toString())
	})
	//Agendamento de serviceRegForm
	$("newScheduleForm").on("submit", function (ev)
	{
		console.log("teste1")
		//Validacao de campos
		if($("#creditCard").val().length == 16) {
			console.log("teste2")
			let i
			let cardNumber =  $("#creditCard").val()
			for(i in cardNumber) {
				console.log("teste3")
				if(isNaN(cardNumber[i]))
					$("#creditCardError").htmk("<strong>Digite um cartão válido</strong>")
			}
		} else {
			console.log("teste4")
			$("#creditCardError").htmk("<strong>Digite um cartão válido</strong>")
		}
		if($("#csc").val().length != 3 || !isNaN($("#csc").val())) {
			$("#cscError").htmk("<strong>Digite um número válido</strong>")
		}
		//Buscando dados dos campos
		console.log("teste5")
		let day: string = $("#calendar").val()
		let time: string = $("#time option:selected").val()
		let pet: string = $("#pet option:selected").val()
		let service: string = $("#service option:selected").val()
		let creditCard: string = $("#creditCard").val()
		let csc: number = $("#csc").val()
		let expDate: string = $("#expDate").val()
		let cardFlag: string = $("input[name=flag]:checked").val()

		//FALTA VERIFICAR ERROS
		let result: string = server.addSchedule(day, time, server.users[currentUser], pet, service, creditCard, csc, expDate, cardFlag)

		if (result != "ok")
		{
			$("#newScheduleError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut()
			return false
		}
		return true
	})
	// Cadastro de novo Pet:
	$("#newPetForm").on("submit", function (ev)
	{
		let age: number = +$("#newPetForm input[name=age]").val()
		let name: string = $("#newPetForm input[name=name]").val()
		let breed: string = $("#newPetForm input[name=breed]").val()

		if (isNaN(age) || age < 0)
		{
			$("#newPetError").html("<strong>Erro:</strong> Idade inválida.").show().delay(5000).fadeOut()
			return false
		}

		let result: string
		let id: number = server.users[currentUser].pets.length
		result = server.addPet(currentUser, name, breed, age, null)

		if (result != "ok")
		{
			$("#newPetError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut()
			return false
		}

		inputImageToBase64($("#newPetForm input[name=pic]")[0].files[0], pic =>
		{
			server.users[currentUser].pets[id].pic = pic
		})
		return true
	})


	// Para fazer alterações dos dados cadastrais do usuário:
	$(".editInfo").css("cursor", "pointer")						// cursor de link
	$(".editInfo").click(function()
	{
		let editButton = $(this)
		editButton.hide()

		let field = editButton.prev()								// sibling anterior (contém o dado atual do usuário)
		field.hide()

		let updateInputField = $("<input type=\"text\"></input>")	// cria novo elemento input
		updateInputField.val(field.html())							// inicializa o valor do element input com o valor do dado atual
		updateInputField.blur(function()
		{
			server.users[currentUser][field.attr("id")] = $(this).val()			// o id de field tem o mesmo nome que o atributo correspondente no servidor
			refreshUserData()
			field.show()
			$(this).remove()
			editButton.show()
		})
		updateInputField.keydown(function(e)
		{
			if (e.keyCode == 13)	// enter
				$(this).blur()
			if (e.keyCode == 27)	// esc
			{
				field.show()
				$(this).remove()
				editButton.show()
			}
		})
		field.after(updateInputField)
		updateInputField.focus()
	})
})
