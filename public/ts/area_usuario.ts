///<reference path="Server.ts"/>

// Script com a lógica específica da página area_usuario.html

declare var $: any;

/* Atualiza os dados do usuário apresentados na página
 conforme os dados contidos na instância de usuário recebida por parâmetro.*/
function refreshUserData(user: any) : void
{
	$("#greetName").html(user.name)

	$(".clientData").each(function()
	{
		let field_name: string = $(this).attr("data-db")
		$(this).html(user[field_name])
	})
	$("#userPic").attr("src", user.pic)

	$("#petContainer").empty()
	let nopets: boolean = true
	let petId: string
	for (petId in user.pets)
	{
		let pet: Pet = user.pets[petId]

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

// Faz com que os dados do usuário no servidor sejam igualados aos dados presentes no
// parâmetro user. Em seguida, atualiza a página com os novos dados.
function updateUser(user)
{
	$.ajax({url: "/updateuserdata", type: "POST", contentType: "application/json", data: JSON.stringify(user), success: function(received)
	{
		if (received == "ok")
			refreshUserData(user)
		else
			alert("Houve um erro ao alterar os dados.")
	}})
}

/*
function refreshUserSchedules () : void
{
	let s
	let lineSchedule = $("<tbody></tbody>")
	for(s in server.schedules) {
		let line = $("<tr></tr>")
		let schedule: Schedule = server.schedules[s]
		line.append($("<td>" + s + "</td>"))
		line.append($("<td>" + server.services[schedule.service].name + "</td>"))
		let time = schedule.hour
		if(time == "slot1")
		line.append($("<td>" + schedule.day + " 8h00 </td>"))
		else if(time == "slot2")
		line.append($("<td>" + schedule.day + " 9h00 </td>"))
		else if(time == "slot3")
		line.append($("<td>" + schedule.day + " 10h00 </td>"))
		else if(time == "slot4")
		line.append($("<td>" + schedule.day + " 11h00 </td>"))
		else if(time == "slot5")
		line.append($("<td>" + schedule.day + " 12h00 </td>"))
		else if(time == "slot6")
		line.append($("<td>" + schedule.day + " 13h00 </td>"))
		else if(time == "slot7")
		line.append($("<td>" + schedule.day + " 14h00 </td>"))
		else if(time == "slot8")
		line.append($("<td>" + schedule.day + " 15h00 </td>"))
		else if(time == "slot9")
		line.append($("<td>" + schedule.day + " 16h00 </td>"))
		else if(time == "slot10")
		line.append($("<td>" + schedule.day + " 17h00 </td>"))
		else if(time == "slot11")
		line.append($("<td>" + schedule.day + " 18h00 </td>"))

		let user : User = server.users[currentUser]
		line.append($("<td>" + user.pets[schedule.pet].name + "</td>"))
		line.append($("<td>" + schedule.cardFlag + " - Terminado em: " + schedule.creditCard.substring(11,15)+ "</td>"))
		lineSchedule.append(line)
	}
	$("#tableSchedules").append(lineSchedule)
}
function refreshSales() : void
{
	let s
	let lineSale = $("<tbody id='lineSales'></tbody>")
	for (s in server.sales) {
		let sale : Sale = server.sales[s]
		if(sale.customer == currentUser) {
			let line = $("<tr></tr>")
			line.append($("<td>" + s + "</td>"))
			let p
			let linep
			for(p in sale.products) {
				let product : Product = sale.products[p]
				linep += "<p>" + product.name + "</p>"
			}
			line.append($("<td>" + linep + "</td>"))
			line.append($("<td>" + sale.day + "</td>"))
			line.append($("<td> R$" + sale.total + "</td>"))
			line.append($("<td>" + sale.status + "</td>"))
			lineSale.append(line)
		 }
	}
	$("#tableSales").append(lineSale)
}
*/

$(document).ready(function()
{
	// Obtem do servidor os dados do usuário, usa-os para preencher as informações da página
	$.ajax({url: "/userdata", success: refreshUserData})

/*
	//Preenchendo dados dos agendamentos do usuario
	refreshUserSchedules()

	refreshSales()

	// Preenchendo pets e dados do usuário:
	refreshUserPets()

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
	$("#selectService").on("click", function ()
	{
		let serviceId = $("#selectService option:selected").val()
		let price = server.services[serviceId].price
		$("#servicePrice").html("<h5>R$" + price + "</h5>")
	})

	//Agendamento de serviceRegForm
	$("#newScheduleForm").on("submit", function (ev)
	{

		//Conteudo do formulario
		let day: string = $("#calendar").val()
		let time: string = $("#time option:selected").val()
		let pet: string = $("#pet option:selected").val()
		let service: string = $("#service option:selected").val()
		let creditCard: string = $("#creditCard").val()
		let csc: string = $("#csc").val()
		let expDate: string = $("#expDate").val()
		let cardFlag: string = $("input[name=flag]:checked").val()

		//Validacao de campos
		let regexp = /^\d{16}$/
		if(!regexp.test(creditCard)) {
			$("#creditCardError").html("<strong>Erro:</strong> Cartão inválido.").show().delay(5000).fadeOut()
			return false
		}
		regexp = /^\d{3}$/
		if(!regexp.test(csc)) {
			$("#cscError").html("<strong>Erro:</strong> Código de segurança inválido.").show().delay(5000).fadeOut()
			return false
		}
		regexp = /^[1-12]\/\d{2}$/
		if(!regexp.test(expDate)) {
			$("#expDateError").html("<strong>Erro:</strong> Data inválida.").show().delay(5000).fadeOut()
			return false
		}
		let result: string = server.addSchedule(day, time, currentUser, pet, service, creditCard, Number(csc), expDate, cardFlag)

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

	*/

	// Para fazer alterações dos dados cadastrais do usuário:
	$(".editInfo").css("cursor", "pointer")						// cursor de link
	$(".editInfo").click(function()
	{
		let editButton = $(this)
		editButton.hide()

		$.ajax({url: "/userdata", success: function(user)
		{
			let field = editButton.prev()								// sibling anterior (contém o dado atual do usuário)
			field.hide()

			let updateInputField = $("<input type=\"text\"></input>")	// cria novo elemento input
			updateInputField.val(field.html())							// inicializa o valor do element input com o valor do dado atual
			updateInputField.blur(function()
			{
				user[field.attr("data-db")] = $(this).val()				// o data-db do field tem o mesmo nome que o atributo correspondente no servidor
				updateUser(user)
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
		}})
	})

	//Atualiza informações de agendamento
	$("#serviceRegForm").click(function()
	{
		let today = new Date().toISOString().split("T")[0]
		$("#calendar").prop("min", today)
		$.ajax({url: "/userdata", success : function(user)
		{
			let petId : string
			let opPet = $("<select id='pet'></select>")
			for (petId in user.pets) {
				let pet: Pet = user.pets[petId]
				opPet.append($("<option value=" + petId + ">" + pet.name + "</option>"))
			}
			$("#selectPet").html(opPet)
		}})
		$.ajax({url: "/getservices", type: "GET", success: function(services)
		{
			let opService = $("<select id='service'></select>")
			for(let s in services) {
				let service = services[s]
				opService.append($("<option value=" + service._id + ">" + service.name + "</option>"))
			}
			$("#selectService").html(opService)
		}})

	})

	//Atualiza horarios disponiveis
	$("#calendar").on("change", function()
	{
		let date = $("#calendar").val()
		let s
		let lineSchedule = $("<tbody></tbody>")
		$.ajax({url: "notavailablehours", type: "GET", data: {"date": date}, success: function(schedules)
		{
			for(let i in schedules) {
				$("#time option[value=" + schedules[i].hour + "]").hide()
			}
		}})
	})


	//Atualiza preço do serviço selecionado
	$("#selectService").on("click", function ()
	{
		let serviceId = $("#selectService option:selected").val()
		$.ajax({url: "/serviceprice", type: "GET", data: {"serviceid": serviceId}, success: function(service)
		{
			$("#servicePrice").html("<h5>R$" + service.price + "</h5>")
		}})
	})

	//Agendamento de serviceRegForm
	$("#newScheduleForm").on("submit", function (ev)
	{

		//Conteudo do formulario
		let day: string = $("#calendar").val()
		let time: string = $("#time option:selected").val()
		let pet: string = $("#pet option:selected").val()
		let service: string = $("#service option:selected").val()
		let creditCard: string = $("#creditCard").val()
		let csc: string = $("#csc").val()
		let expDate: string = $("#expDate").val()
		let cardFlag: string = $("input[name=flag]:checked").val()

		//Validacao de campos
		let regexp = /^\d{16}$/
		if(!regexp.test(creditCard)) {
			$("#creditCardError").html("<strong>Erro:</strong> Cartão inválido.").show().delay(5000).fadeOut()
			return false
		}
		regexp = /^\d{3}$/
		if(!regexp.test(csc)) {
			$("#cscError").html("<strong>Erro:</strong> Código de segurança inválido.").show().delay(5000).fadeOut()
			return false
		}
		/*regexp = /^[1-12]\/\d{2}$/
		if(!regexp.test(expDate)) {
			$("#expDateError").html("<strong>Erro:</strong> Data inválida.").show().delay(5000).fadeOut()
			return false
		}*/

		$.ajax({url: "/addschedule", type: "POST", data: {"day": day, "time": time, "pet": pet, "service": service,
		"creditcard": creditCard, "csc": csc, "expdate": expDate, "cardflag": cardFlag}, contentType: 'application/json', success: function(received)
		{
			if(received == "ok")
				return true
			else {
				$("#newScheduleError").html("<strong>Erro:</strong> " + received).show().delay(5000).fadeOut()
				return false
			}
		}})
	})
})
