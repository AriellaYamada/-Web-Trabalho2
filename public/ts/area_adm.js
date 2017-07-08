///<reference path="Server.ts"/>
function randomPassword() {
    let v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
    let length = 6;
    let ret = "";
    for (let i = 0; i < length; i++) {
        let idx = Math.floor(Math.random() * v.length);
        ret += v.charAt(idx);
    }
    return ret;
}
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
function refreshSchedules() {
    let listservices = [];
    $.ajax({ url: "/getservices", type: "GET", success: function (services) {
            for (let s in services) {
                listservices.push(services[s]);
            }
        } });
    $.ajax({ url: "/getallschedules", type: "GET", success: function (schedules) {
            let lineSchedule = $("<tbody></tbody>");
            for (let s in schedules) {
                let line = $("<tr></tr>");
                let schedule = schedules[s];
                line.append($("<td>" + s + "</td>"));
                for (let ls in listservices) {
                    let service = listservices[ls];
                    if (service._id == schedule.service)
                        line.append($("<td>" + service.name + "</td>"));
                }
                let time = schedule.hour;
                if (time == "slot1")
                    line.append($("<td>" + schedule.day + " 8h00 </td>"));
                else if (time == "slot2")
                    line.append($("<td>" + schedule.day + " 9h00 </td>"));
                else if (time == "slot3")
                    line.append($("<td>" + schedule.day + " 10h00 </td>"));
                else if (time == "slot4")
                    line.append($("<td>" + schedule.day + " 11h00 </td>"));
                else if (time == "slot5")
                    line.append($("<td>" + schedule.day + " 12h00 </td>"));
                else if (time == "slot6")
                    line.append($("<td>" + schedule.day + " 13h00 </td>"));
                else if (time == "slot7")
                    line.append($("<td>" + schedule.day + " 14h00 </td>"));
                else if (time == "slot8")
                    line.append($("<td>" + schedule.day + " 15h00 </td>"));
                else if (time == "slot9")
                    line.append($("<td>" + schedule.day + " 16h00 </td>"));
                else if (time == "slot10")
                    line.append($("<td>" + schedule.day + " 17h00 </td>"));
                else if (time == "slot11")
                    line.append($("<td>" + schedule.day + " 18h00 </td>"));
                line.append($("<td>" + schedule.pet + "</td>"));
                line.append($("<td>" + schedule.cardFlag + " - Terminado em: " + schedule.creditCard.substring(12, 16) + "</td>"));
                lineSchedule.append(line);
            }
            $("#tableSchedules").append(lineSchedule);
        } });
}
function refreshServiceData() {
    $.ajax({ url: "/getservices", type: "GET", success: function (services) {
            let lineService = $("<tbody id='lineService'></tbody>");
            for (let s in services) {
                let line = $("<tr></tr>");
                let service = services[s];
                line.append($("<td>" + service._id + "</td>"));
                line.append($("<td>" + service.name + "</td>"));
                line.append($("<td>" + service.description + "</td>"));
                line.append($("<td> R$" + service.price.toFixed(2) + "</td>"));
                //lineService.append($("<td><a href="">Detalhes<a></td>"))
                lineService.append(line);
            }
            $("#tableServices").append(lineService);
        } });
}
function refreshProductData() {
    $.ajax({ url: "/getproducts", type: "GET", success: function (products) {
            let lineService = $("<tbody id='lineService'></tbody>");
            for (let p in products) {
                let line = $("<tr></tr>");
                let product = products[p];
                line.append($("<td>" + product._id + "</td>"));
                line.append($("<td>" + product.name + "</td>"));
                line.append($("<td><img src='" + product.pic + "' alt class='img-responsive' /></td>"));
                line.append($("<td>" + product.description + "</td>"));
                line.append($("<td> R$" + product.price.toFixed(2) + "</td>"));
                line.append($("<td>" + product.type + "</td>"));
                line.append($("<td>" + product.qtt + "</td>"));
                lineService.append(line);
            }
            $("#tableProducts").append(lineService);
        } });
}
function refreshUserList() {
    $.ajax({ url: "/getallusers", type: "GET", success: function (users) {
            let i = 0;
            let lineUser = $("<tbody></tbody>");
            for (let u in users) {
                let line = $("<tr></tr>");
                let user = users[u];
                line.append("<td>" + i + "</td>");
                line.append("<td>" + user._id + "</td>");
                line.append("<td>" + user.name + "</td>");
                if (user.is_admin)
                    line.append("<td> Sim </td>");
                else
                    line.append("<td> Não </td>");
                i++;
                lineUser.append(line);
            }
            $("#tableUsers").append(lineUser);
        } });
}
$(document).ready(function () {
    // Preenchendo dados do usuário:
    $.ajax({ url: "/userdata", success: refreshAdminData });
    $("#genPassButton").on("click", function (event) {
        event.preventDefault();
        $("#newUserForm input[name=pass]").val(randomPassword());
    });
    refreshSchedules();
    refreshServiceData();
    refreshProductData();
    refreshUserList();
    let userslist = [];
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
    //Atualiza informações de agendamento
    $("#serviceRegForm").click(function () {
        let today = new Date().toISOString().split("T")[0];
        $("#calendar").prop("min", today);
        $.ajax({ url: "/userdata", success: function (user) {
                let petId;
                for (petId in user.pets) {
                    let pet = user.pets[petId];
                    $("#selectPet").append($("<option value=" + petId + ">" + pet.name + "</option>"));
                }
            } });
        $.ajax({ url: "/getservices", type: "GET", success: function (services) {
                for (let s in services) {
                    let service = services[s];
                    $("#selectService").append($("<option value=" + service._id + ">" + service.name + "</option>"));
                }
            } });
        $.ajax({ url: "/getallusers", type: "GET", success: function (users) {
                for (let u in users) {
                    let user = users[u];
                    if (!user.is_admin) {
                        $("#selectCustomer").append($("<option value=" + user._id + ">" + user.name + "</option>"));
                        userslist.push(user);
                    }
                }
            } });
    });
    //Atualiza a lista de pets de acordo com o cliente escolhido
    $("#selectCustomer").on("click", function () {
        let customer = $("#selectCustomer option:selected").val();
        console.log(userslist);
        for (let u in userslist) {
            if (userslist[u]._id == customer) {
                for (let pet in userslist[u].pets) {
                    $("#selectPet").append($("<option value=" + pet + ">" + userslist[u].pets[pet].name + "</option>"));
                }
            }
        }
    });
    //Atualiza horarios disponiveis
    $("#calendar").on("change", function () {
        let date = $("#calendar").val();
        $.ajax({ url: "/notavailablehours", type: "GET", data: { "date": date }, success: function (schedules) {
                for (let i in schedules) {
                    $("#time option[value=" + schedules[i].hour + "]").hide();
                }
            } });
    });
    //Atualiza preço do serviço selecionado
    $("#selectService").on("click", function () {
        let serviceId = $("#selectService option:selected").val();
        $.ajax({ url: "/serviceprice", type: "GET", data: { "serviceid": serviceId }, success: function (service) {
                $("#servicePrice").html("<h5>R$" + service.price + "</h5>");
            } });
    });
    //Agendamento de serviceRegForm
    $("#newScheduleForm").on("submit", function (ev) {
        //Conteudo do formulario
        let creditCard = $("#creditCard").val();
        let csc = $("#csc").val();
        //Validacao de campos
        let regexp = /^\d{16}$/;
        if (!regexp.test(creditCard)) {
            $("#creditCardError").html("<strong>Erro:</strong> Cartão inválido.").show().delay(5000).fadeOut();
            return false;
        }
        regexp = /^\d{3}$/;
        if (!regexp.test(csc)) {
            $("#cscError").html("<strong>Erro:</strong> Código de segurança inválido.").show().delay(5000).fadeOut();
            return false;
        }
        return true;
    });
});
//# sourceMappingURL=area_adm.js.map