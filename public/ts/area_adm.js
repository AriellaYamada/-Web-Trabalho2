///<reference path="Server.ts"/>
function refreshAdminData(user) {
    $("#greetName").html(user.name);
    $(".clientData").each(function () {
        let field_name = $(this).attr("data-db");
        $(this).html(user[field_name]);
    });
    $("#userPic").attr("src", user.pic);
}
function updateAdmin(user) {
    $.ajax({ url: "/updateuserdata", type: "POST", contentType: "application/json", data: JSON.stringify(user), success: function (received) {
            if (received == "ok")
                refreshAdminData(user);
            else
                alert("Houve um erro ao alterar os dados.");
        } });
}
/*
function refreshSchedules() : void
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

        let user : User = server.users[schedule.customer]
        line.append($("<td>" + user.pets[schedule.pet].name + "</td>"))
        line.append($("<td>" + schedule.cardFlag + " - Terminado em: " + schedule.creditCard.substring(11,15)+ "</td>"))
        lineSchedule.append(line)
    }
    $("#tableSchedules").append(lineSchedule)
}

function refreshServiceData() : void
{
    let s
    let lineService = $("<tbody id='lineService'></tbody>")
    for (s in server.services) {
            let line = $("<tr></tr>")
            let service : Service = server.services[s]
            line.append($("<td>" + s + "</td>"))
            line.append($("<td>" + service.name + "</td>"))
            line.append($("<td>" + service.description + "</td>"))
            line.append($("<td> R$" + service.price + "</td>"))
            //lineService.append($("<td><a href="">Detalhes<a></td>"))
            lineService.append(line)
    }
    $("#tableServices").append(lineService)
}

function refreshProductData() : void
{
    let p
    let lineService = $("<tbody id='lineService'></tbody>")
    for (p in server.products) {
            let line = $("<tr></tr>")
            let product : Product = server.products[p]
            line.append($("<td>" + p + "</td>"))
            line.append($("<td>" + product.name + "</td>"))
            line.append($("<td><img src='" + product.pic + "' alt class='img-responsive' /></td>"))
            line.append($("<td>" + product.description + "</td>"))
            line.append($("<td> R$" + product.price + "</td>"))
            line.append($("<td>" + product.type + "</td>"))
            line.append($("<td>" + product.qtt + "</td>"))
            lineService.append(line)
    }
    $("#tableProducts").append(lineService)

}


function refreshUserList() : void
{
    let u
    let i : number = 0
    let lineUser = $("<tbody></tbody>")
    for (u in server.users) {
        let line = $("<tr></tr>")
        let user : User = server.users[u]
        line.append("<td>" + i + "</td>")
        line.append("<td>" + u + "</td>")
        line.append("<td>" + user.userName + "</td>")
        if (server.isAdmin(u))
            line.append("<td> Sim </td>")
         else
            line.append("<td> Não </td>")
        i++
        lineUser.append(line)
    }
    $("#tableUsers").append(lineUser)
    //$("#userList").empty()
    //for (let user in server.users)
    //$("#userList").append($("<tr><td>" + server.users[user].userId + "</td><td>" + server.users[user].userName + "</td><td><a href=\"\">Detalhes</a></td></tr>"))
}
*/
$(document).ready(function () {
    // Preenchendo dados do usuário:
    $.ajax({ url: "/userdata", success: refreshAdminData });
    /*
    // Lista de usuários
    refreshUserList()

    //Lista de Agendamentos
    refreshSchedules()

    //Lista de servicos
    refreshServiceData()

    //Lista de Produtos
    refreshProductData()

    $("#logout").css("cursor", "pointer")
    $("#logout").click(function(ev)
    {
        localStorage.removeItem("PetStopCurrentUser")
        window.location.href = "index.html"
    })

    //Atualizacao do calendario, pets e servicos
    $("#serviceRegForm").on("click", function ()
    {
        let today = new Date().toISOString().split("T")[0]
        $("#calendar").prop("min", today)
        let userId: string
        let opUser = $("<select id='user'></select>")
        for(userId in server.users) {
            if(!server.isAdmin(userId)) {
                let user: User = server.users[userId]
                opUser.append($("<option value=" + userId + ">" + user.userName + "</option>"))
            }
        }
        $("#selectCustomer").html(opUser)
        let serviceId
        let opService = $("<select id='service'></select>")
        for(serviceId in server.services) {
            let service: Service = server.services[serviceId]
            opService.append($("<option value=" + serviceId + ">" + service.name + "</option>"))
        }
        $("#selectService").html(opService)
    })
    //Atualizar pets
    $("#selectCustomer").on("click", function ()
    {
        let userId = $("#selectCustomer option:selected").val()
        let petId: string
        let opPet = $("<select id='pet'></select>")
        for (petId in server.users[userId].pets) {
            let pet: Pet = server.users[userId].pets[petId]
            opPet.append($("<option value=" + petId + ">" + pet.name + "</option>"))
        }
        $("#selectPet").html(opPet)
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
        let userId : string = $("#selectCustomer option:selected").val()
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
        let result: string = server.addSchedule(day, time, userId, pet, service, creditCard, Number(csc), expDate, cardFlag)

        if (result != "ok")
        {
            $("#newScheduleError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut()
            return false
        }
        return true
    })
    //Busca de servicos
    $("#serviceSearch").on("click", function ()
{
    let search : string = $("#searchText").val()
    let field : string = $("#searchField option:selected").val()
    console.log(field)
    if(field == "name") {
        let s
        let lineService = $("#lineService")
        for (s in server.services) {
            let service : Service = server.services[s]
            if(service.name == search) {
                console.log("teste")
                let line = $("<tr></tr>")
                line.append($("<td>" + s + "</td>"))
                line.append($("<td>" + service.name + "</td>"))
                line.append($("<td>" + service.description + "</td>"))
                line.append($("<td> R$" + service.price + "</td>"))
                lineService.append(line)
            }
        }
        $("#lineService").html(lineService)
    }
})
    //Cadastro de Servicos
    $("#newServiceForm").on("submit", function(ev)
    {
        let name: string = $("#sname").val()
        let description: string = $("#sdescription").val()
        let price: number = $("#sprice").val()

        let result: string  = server.addService(name, description, price)
        if(result != "ok") {
            $("#newServiceError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut()
            return false
        }
    })
    //Cadastro de Produtos
    $("#newProductForm").on("submit", function (ev)
    {
        let name: string = $("#pname").val()

        let description: string = $("#pdescription").val()
        let pprice: number = $("pprice").val()
        let pqtt: number = $("pquantity").val()
        let ptype: string = $("ptype").val()
        let result: string = server.addProduct(name, null, description, pprice, ptype, pqtt)
        if(result != "ok") {
            $("#newProductError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut()
            return false
        }
        inputImageToBase64($("#newProductForm input[name=ppic]")[0].files[0], pic =>
        {
        server.products[server.products.length].pic = pic
    })
    return true

})
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

    let regexp = /^\(\d{2}\)\d{8,9}$/
    if(!regexp.test(tel)) {
        $("#telError").html("<strong>Erro:</strong> Telefone inválido.").show().delay(5000).fadeOut()
        return false
    }
    regexp = /\@\w\.com/
    if(!regexp.test(email)) {
        $("#emailError").html("<strong>Erro:</strong> E-mail inválido.").show().delay(5000).fadeOut()
        return false
    }
    let result: string
    result = server.addUser(name, id, address, null, tel, email, pass, permissions)

    if (result != "ok")
    {
        $("#newUserError").html("<strong>Erro:</strong> " + result).show().delay(5000).fadeOut()
        return false
    }

    inputImageToBase64($("#newProductForm input[name=ppic]")[0].files[0], pic =>
    {
        server.products[id].pic = pic
    })
    return true
})

*/
    // Para fazer alterações dos dados cadastrais do usuário:
    $(".editInfo").css("cursor", "pointer"); // cursor de link
    $(".editInfo").click(function () {
        let editButton = $(this);
        editButton.hide();
        $.ajax({ url: "/userdata", success: function (user) {
                let field = editButton.prev(); // sibling anterior (contém o dado atual do usuário)
                field.hide();
                let updateInputField = $("<input type=\"text\"></input>"); // cria novo elemento input
                updateInputField.val(field.html()); // inicializa o valor do element input com o valor do dado atual
                updateInputField.blur(function () {
                    user[field.attr("data-db")] = $(this).val(); // o data-db do field tem o mesmo nome que o atributo correspondente no servidor
                    updateAdmin(user);
                    field.show();
                    $(this).remove();
                    editButton.show();
                });
                updateInputField.keydown(function (e) {
                    if (e.keyCode == 13)
                        $(this).blur();
                    if (e.keyCode == 27) {
                        field.show();
                        $(this).remove();
                        editButton.show();
                    }
                });
                field.after(updateInputField);
                updateInputField.focus();
            } });
    });
});
//# sourceMappingURL=area_adm.js.map