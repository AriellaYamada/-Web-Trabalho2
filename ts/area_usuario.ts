///<reference path="Server.ts"/>

// Script com a lógica específica da página area_usuario.html

declare var $: any;
var server: Server = new Server()

function refreshUserData() : void
{
	$(".clientData").each(function()
	{
		let field_name: string = $(this).attr("id")
		$(this).html(server.data[field_name])
	})
}


$(document).ready(function()
{
	$(window).unload( () => server.saveState())			// para salvar o estado do servidor mock ao sair da página
	refreshUserData()
	$(".editInfo").css("cursor", "pointer")				// cursor de link
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
			server.data[field.attr("id")] = $(this).val()			// o id de field tem o mesmo nome que o atributo correspondente no servidor
			refreshUserData()
			field.show()
			$(this).remove()
			editButton.show()
		})
		updateInputField.keypress(function(e)
		{
			if (e.keyCode == 13)
				$(this).blur()
		})
		field.after(updateInputField)
		updateInputField.focus()
	})
})
