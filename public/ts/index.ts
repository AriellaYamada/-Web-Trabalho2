declare var $: any;
$(document).ready(function()
{
	let url = window.location.href
	if (url.indexOf("falha_login") != -1)
		$("#login_failed").show()
})
