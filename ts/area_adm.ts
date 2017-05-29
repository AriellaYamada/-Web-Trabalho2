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

function refreshUserList() : void
{
	$("#userList").empty()
	for (let user in server.users)
		$("#userList").append($("<tr><td>" + server.users[user].userId + "</td><td>" + server.users[user].userName + "</td><td><a href=\"\">Detalhes</a></td></tr>"))
}

$(document).ready(function()
{
	// Nome de usuário na saudação:
	$("#greetName").html(server.users[currentUser].userName)

	// Preenchendo dados do usuário:
	refreshUserData()	

	// Lista de usuários
	refreshUserList()

	// Para quando o administrador altera sua foto:
	$("#clientPicUploader").on("change", function()
	{
		inputImageToBase64(this.files[0], result => {server.users[currentUser].userPic = result; refreshUserData()})
	})

	// Para salvar o estado do servidor mock ao sair da página:
	$(window).on("unload", () => server.saveState())

	// Form de novo usuário
	$("#newUserForm input[name=usertype]").on("change", function() {
		$("#newUserForm input[name=address]").val("")
		$("#newUserForm #addressDiv").toggle()
	})

	$("#newUserForm").on("submit", function (ev)
	{
		let name: string = $("#newUserForm input[name=name]").val()
		let id: string = $("#newUserForm input[name=id]").val()
		let pass: string = $("#newUserForm input[name=password]").val()
		let tel: string = $("#newUserForm input[name=telephone]").val()
		let email: string = $("#newUserForm input[name=email]").val()
		let permissions: string = $("#newUserForm input[name=usertype]").val()
		let address: string = $("#newUserForm input[name=address]").val()


		let result: string
		result = server.addUser(name, id, address, null, tel, email, pass, permissions)

		if (result != "ok")
		{
			$("#newUserError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut()
			return false
		}

		inputImageToBase64($("#newUserForm input[name=pic]")[0].files[0], pic => 
		{
			server.users[id].userPic = pic
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
