///<reference path="Server.ts"/>

// Script com a lógica específica da página area_usuario.html

declare var $: any;
var server: Server = new Server()

function editInfo() : void
{
	
}

$(document).ready(function()
{
	$(window).unload( () => server.saveState())			// para salvar o estado do servidor mock ao sair da página
	$(".editInfo").click( () => 
	{
		console.log("Oi")
		//console.log($(this).siblings("span"))
		$(this).hide()
	})
});
