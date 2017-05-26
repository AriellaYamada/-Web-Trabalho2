///<reference path="Server.ts"/>

// Script com a lógica específica da página index.html

declare var $: any;

// Pseudo login
function authenticate() : void
{
	let username : string = (<HTMLInputElement>document.getElementById("login_user")).value;
	let password : string = (<HTMLInputElement>document.getElementById("pass_user")).value;
	if (username == "admin")		// apenas o password do admin é testado
	{
		if (password == "admin")
		{
			window.location.href = "area_adm.html";
		}
		else
		{
			$("#login_failed").show();
			$("html, body").animate({scrollTop: 0}, "fast");
		}
	}
	else
	{
		window.location.href = "area_usuario.html"
	}
}

$(document).ready(function()
{
	$("#login_button").click(authenticate);				// associando a função acima ao botão de login
	$("#pass_user").keypress(function(e)				// para o "enter" funcionar para fazer login
	{
		if (e.keyCode == 13)
			$("#login_button").click();
	});
});
