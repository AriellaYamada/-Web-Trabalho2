// Módulos nativos
const fs = require("fs")
const https = require("https")
const mime = require("mime")

// Módulos não nativos
const express = require("express")
const NodeCouchDb = require("node-couchdb")
const bodyParser = require("body-parser")
const session = require("express-session")
const multer = require("multer")

const couch = new NodeCouchDb()

class Pet
{
    constructor(name, breed, age, pic)
	{
        this.name = name
        this.breed = breed
        this.age = age
        this.pic = pic
    }
}
class User
{
	constructor(id, pass, name, address, pic, tel, email, is_admin)
	{
        this._id = id
        this.pass = pass

        this.name = name
        this.address = address
        this.pic = pic
        this.tel = tel
        this.email = email
        this.is_admin = is_admin

        this.pets = {}
    }
}
class Product
{
	constructor(id, name, pic, description, price, type, qtt)
	{
		this._id = id
		this.name = name
		this.pic = pic
		this.description = description
		this.price = price
		this.type = type
		this.qtt = qtt
	}
}
class Service
{
	constructor(id, name, description, price)
	{
		this._id = id
		this.name = name
		this.description = description
		this.price = price
	}
}
class Schedule
{
	constructor(day, hour, customer, pet, service, creditCard, csc, expDate, cardFlag)
	{
		this._id = day + hour
		this.day = day
		this.hour = hour
		this.customer = customer
		this.pet = pet
		this.service = service
		this.creditCard = creditCard
		this.csc = csc
		this.expDate = expDate
		this.cardFlag = cardFlag
	}
}

class Sale
{
	constructor (customer, products, day, creditCard, csc, expDate, total, status)
	{
		this.customer = customer
		this.products = products
		this.day = day
		this.creditCard = creditCard
		this.csc = csc
		this.expDate = expDate
		this.total = total
		this.status = status
	}
}

/* Cria um novo usuário no banco de dados.
 Recebe uma instância da classe User que representa o usuário a ser criado */
function createUser(user)
{
	couch.insert("users", user).then(({data, headers, status}) =>
	{
		console.log("Usuário com id %s inserido com sucesso.", data.id);
		return("success")
	},
	(err) =>
	{
		console.log(err)
		return(err)
	})
}

/* Cria um novo pet de id pet_id para o usuário de id owner_id.
Se tudo der certo, chama ok_callback passando o usuário atualizado (como ele ficou no banco, incluindo a _rev atualizada).
Caso contrário chama err_callback passando um código identificador do erro ocorrido.
*/
function createPet(owner_id, pet_id, pet, ok_callback, err_callback)
{
	couch.get("users", owner_id).then(({data, headers, status}) =>
	{
		let user = data
		if (user.pets[pet_id])
		{
			console.log("Pet de id %s do usuário %s já existe. Não foi alterado.", pet_id, name)
			return
		}

		user.pets[pet_id] = pet
		couch.update("users", user).then(({data, headers, status}) =>
		{
			console.log("Pet %s adicionado ao usuário %s com sucesso", pet_id, owner_id)
			user._rev = data.rev
			if (ok_callback) ok_callback(user)
		},
		err =>
		{
			console.log(err)
			console.log("Erro ao tentar adicionar pet ao usuário %s.", owner_id)
			if (err_callback) err_callback(err.code)
		})
	},
	err =>
	{
		console.log(err)
		console.log("Erro ao tentar adicionar pet ao usuário %s.", owner_id)
		if (err_callback) err_callback(err.code)
	}).catch(() => err_callback("PETEXISTS"))
}

function createProduct(product)
{
	couch.insert("products", product).then(({data, headers, status}) =>
	{
		console.log("Produto com id %s inserido com sucesso.", data.id);
		return("success")
	},
	(err) =>
	{
		return(err)
		console.log(err)
	})
}

function createService(service)
{
	couch.insert("services", service).then(({data, headers, status}) =>
	{
		console.log("Serviço com id %s inserido com sucesso.", data.id);
		return("success")
	},
	(err) =>
	{
		return(err)
		console.log(err)
	})
}

function createSchedule(schedule)
{
	couch.insert("schedules", schedule).then(({data, headers, status}) =>
	{
		console.log("Agendamento com id %s inserido com sucesso.", data.id)
	},
	(err) => console.log(err))
}

/* Verifica se o par (id, pass) bate com algum usuário do banco.
 Se sim, chama ok_callback. Caso contrário, err_callback.
 ok_callback recebe um objeto que representa o usuário autenticado
 err_callback recebe uma string com um código identificador do erro
 */
function authenticateUser(id, pass, ok_callback, err_callback)
{
	couch.get("users", id).then(
	function({data, headers, status})
	{
		let user = data
		if (user.pass == pass)
		{
			ok_callback(user)
		}
		else
		{
			err_callback("WRONGPASS")		// Caso senha incorreta
		}
	},
	function(err)
	{
		if (err.code == "EDOCMISSING")
			err_callback("NOSUCHUSER")		// Caso usuário inexistente
		else
			err_callback("UNKNOWN")			// Caso qualquer outro erro
	})

}

/* Inicialização da database users do CouchDB.
Se a database já existir, nada é alterado.*/

couch.createDatabase("users").then(
	function()
	{
		console.log("Database 'users' não encontrada. Será criada e inicializada.")

		let userExample1 = new User("usuario1", "1234", "Rodrigo Weigert", "Rua Tiradentes, 123", "images/profiles/profilepic.jpg", "(17) 1234-5678", "rodrigo.weigert@usp.br", false)
		let userExample2 = new User("admin", "admin", "Administrador", null, "images/profiles/default.png", "(16) 8765-4321", "admin@petstop.com.br", true)
		let petExample1 = new Pet("Kabosu", "Shiba Inu", 1, "images/pets/doge.jpg")
		let petExample2 =  new Pet("Toby", "Bulldog", 2, "images/pets/borkdrive.jpg")

		userExample1.pets["kabosu"] = petExample1
		userExample1.pets["toby"] = petExample2

        createUser(userExample1)
		createUser(userExample2)
	},
	function(err)
	{
		if (err.code == "EDBEXISTS")
			console.log("Database 'users' já existe, não será alterada.")
		else
			console.log(err)
	}
)

/* Inicialização da database services do CouchDB.
Se a database já existir, nada é alterado.*/

couch.createDatabase("services").then(
	function()
	{
		console.log("Database 'services' não encontrada. Será criada e inicializada.")

		let serviceExample1 = new Service("100", "Reforço V10", "Vacinação", 99.90)
		let serviceExample2 = new Service("101", "Banho e Tosa", "Banho e tosa higiênica", 70.00)
		let serviceExample3 = new Service("102", "Banho", "Banho", 50.00)

		createService(serviceExample1)
		createService(serviceExample2)
		createService(serviceExample3)

	},
	function(err)
	{
		if (err.code == "EDBEXISTS")
			console.log("Database 'service' já existe, não será alterada.")
		else
			console.log(err)
	}
)

/* Inicialização da database products do CouchDB.
Se a database já existir, nada é alterado.*/

couch.createDatabase("products").then(
	function()
	{
		console.log("Database 'products' não encontrada. Será criada e inicializada.")

		let productExample1 = new Product("200", "Ração Premier Golden Special Cães Adultos Frango e Carne", "images/products/produto1.jpg", "Ração Premium especial para cães adultos de porte médio", 104.90, "racao", 10)
		let productExample2 = new Product("201", "Ração Premier Golden Formula Cães Adultos Frango e Arroz", "images/products/produto2.jpg", "Ração Premium especial para cães adultos de porte peq.", 14.30, "racao", 10)
		let productExample3 = new Product("203", "Ração Premier Pet Formula Cães Adultos Raças Pequenas", "images/products/produto3.jpg", "Indicada para cães adultos de raça pequena", 28.90, "racao", 10)
		createProduct(productExample1)
		createProduct(productExample2)
		createProduct(productExample3)
	},
	function(err)
	{
		if (err.code == "EDBEXISTS")
			console.log("Database 'products' já existe, não será alterada.")
		else
			console.log(err)
	}
)

/* Inicialização da database schedules do CouchDB.
Se a database já existir, nada é alterado.*/	// Lista de usuários


couch.createDatabase("schedules").then(
	function()
	{
		console.log("Database 'schedules' não encontrada. Será criada e inicializada.")

		let scheduleExample1 = new Schedule("2017-07-14", "slot3", "usuario1" , "kabosu", "102", "1234567891011121", 123, "20-10", "visa")
		let scheduleExample2 = new Schedule("2017-07-14", "slot4", "usuario1", "toby", "101", "1234567891011121", 123, "20-10", "visa")
		let scheduleExample3 = new Schedule("2017-07-14", "slot5", "usuario1", "kabosu", "100", "1234567891011121", 123, "20-10", "visa")

		createSchedule(scheduleExample1)
		createSchedule(scheduleExample2)
		createSchedule(scheduleExample3)

	},
	function(err)
	{
		if (err.code == "EDBEXISTS")
			console.log("Database 'schedule' já existe, não será alterada.")
		else
			console.log(err)
	}
)	// Lista de usuários


const app = express()

// Para o servidor servir tudo o que está no diretório "public" automaticamente.
app.use(express.static("public"))

// Para parsear dados enviados por POST com tipo "application/x-www-form-urlencoded"
// Obs: esse tipo é usado por default quando o tipo não é especificado tanto na função abaixo quanto em requests AJAX do jQuery
app.use(bodyParser.urlencoded({extended: true}))

// Para parsear dados enviados por POST com tipo "application/json"
app.use(bodyParser.json())

// Para lidar com as sessões dos usuários
app.use(session({secret: "q q eu to fazeno com a minha vida?", resave: false, saveUninitialized: false}))

// Página inicial.
app.get('/', (req, res) =>
{
	if (req.session.user)
		res.redirect('/area_usuario')
	else
		res.sendFile(__dirname + "/index.html")
})

// Autenticação
app.post('/login', (req, res) =>
{
	authenticateUser(req.body.login, req.body.pass,
	function(user)
	{
		// Autenticação do usuário realizada com sucesso.
		req.session.user = user
		if (user.is_admin)
			res.redirect('/area_adm')
		else
			res.redirect('/area_usuario')
	},
	function(err)
	{
		// Falha na autenticação
		if (err == "NOSUCHUSER" || err == "WRONGPASS")
			res.redirect('/?falha_login')				// O falha_login na query string é detectado pelo index.js para exibir a mensagem de erro.
		else
			res.status(500).send("Um erro interno do servidor ocorreu.")
	})
})

app.get('/logout', (req, res) =>
{
	req.session.destroy()
	res.redirect('/')
})

// Páginas de usuário e admin.

app.get('/area_usuario', (req, res) =>
{
	if (!req.session.user)
		res.redirect('/')
	else if (req.session.user.is_admin)
		res.redirect('/area_adm')
	else
		res.sendFile(__dirname + "/area_usuario.html")
})

app.get('/area_adm', (req, res) =>
{
	if (!req.session.user)
		res.redirect('/')
	else if (!req.session.user.is_admin)
		res.redirect('/area_usuario')
	else
		res.sendFile(__dirname + "/area_adm.html")
})


// Para oferecimento de dados via AJAX (obtenção dos pets do usuário, por exemplo)
app.get('/userdata', (req, res) =>
{
	res.send(req.session.user)
})


// Para atualizar os dados do usuário quando ele altera seu cadastro. Os novos dados do usuário
// são recebidos em um objeto JSON que representa o usuário.
app.post('/updateuserdata', (req, res) =>
{
	let user = req.body
	couch.update("users", user).then(({data, headers, status}) =>
	{
		req.session.user = user				// atualiza todos os campos exceto _rev (o _rev recebido é o atual)
		req.session.user._rev = data.rev	// atualiza _rev para o novo valor, gerado após o update.
		console.log("Usuário %s atualizado.", user._id)
		res.send("ok")
	},
	err =>
	{
		console.log(err)
		console.log("Erro ao tentar atualizar usuário %s.", user._id)
		res.send("no")
	})
})

// Para receber o upload de imagens de perfil

const profilePic_storage = multer.diskStorage(
{
	destination: "public/images/profiles",
	filename: function(req, file, cb)
	{
		cb(null, Date.now() + "." + mime.extension(file.mimetype))
	}
})

app.post('/upload', multer({storage: profilePic_storage}).single("clientPicFile"), function (req, res)
{
	//console.log(req.file)
	req.session.user.pic = req.file.path.replace("public/", "")
	couch.update("users", req.session.user).then(({data, headers, status}) =>
	{
		req.session.user._rev = data.rev
		res.redirect('/area_usuario')
	},
	err =>
	{
		console.log("Erro ao tentar atualizar foto do usuário %s.", req.session.user._id)
		res.redirect('/area_usuario')
	})
})


// Para o admin criar novos usuários

app.post('/newuser', function(req, res)
{
	if (!req.session.user.is_admin)
	{
		res.status(403).send("Você não tem permissão para fazer isso.")
		return
	}

	let is_admin = false
	if (req.body.usertype == "admin")
		is_admin = true

	createUser(new User(req.body.id, req.body.pass, req.body.name, req.body.address, "images/profiles/default.png", req.body.telephone, req.body.email, is_admin))
	res.redirect('/area_adm')
})

//Para o usuario agendar serviços busca horarios disponiveis
app.get('/notavailablehours', (req, res) =>
{
	couch.get("schedules", "_all_docs?include_docs=true").then(({data, headers, status}) =>
	{
		let schedules = []
		for(let i = 0; i < data.rows.length; i++){
			if(data.rows[i].doc.day == req.query.date)
				schedules.push(data.rows[i].doc)
		}
		res.send(schedules)
	}, err =>
	{
		console.log(err)
	})
})

app.get('/getservices', (req, res) =>
{
	couch.get("services", "_all_docs?include_docs=true").then(({data, headers, status})=>
	{
		let services = []
		for (let i = 0; i < data.rows.length; i++)
			services.push(data.rows[i].doc)
		res.send(services)
	}, err =>
	{
		console.log(err)
	})
})

app.get('/serviceprice', (req, res) =>
{
	couch.get("services", req.query.serviceid).then(({data, headers, status}) =>
	{
		res.send(data)
	}, err =>
	{
		console.log(err)
	})
})

//Adiciona um serviço ao banco
app.post('/addservice', function(req, res)
{
	let service = new Service(req.body.id, req.body.name, req.body.description, req.body.price)
	createService(service)
	res.redirect('/area_adm')
})

//Adiciona produtos ao banco
app.post('/addproduct', function(req, res)
{
	let product = new Product(req.body.id, req.body.name, req.body.pic, req.body.description, req.body.price, req.body.type, req.body.quantity)
	createProduct(product)
	res.redirect('/area_adm')
})

//Adiciona o agendamento no banco
app.post('/addschedule', function(req, res)
{
	let schedule = new Schedule(req.body.day, req.body.time, req.session.user._id, req.body.pet, req.body.service, req.body.creditcard, req.body.csc, req.body.expdate, req.body.cardflag)
	createSchedule(schedule)
	res.redirect('/area_usuario')
})

//Adiciona o agendamento no banco feito pelo admin
app.post('/adminaddschedule', function(req, res)
{
	let schedule = new Schedule(req.body.day, req.body.time, req.body.customer, req.body.pet, req.body.service, req.body.creditcard, req.body.csc, req.body.expdate, req.body.cardflag)
	createSchedule(schedule)
	res.redirect('/area_usuario')
})

//Busca todos os agendamentos do usuario
app.get('/getuserschedules', (req, res) =>
{
	couch.get("schedules", "_all_docs?include_docs=true").then(({data, headers, status}) =>
	{
		let schedules = []
		for(let i = 0; i < data.rows.length; i++) {
			if(data.rows[i].doc.customer == req.session.user._id)
				schedules.push(data.rows[i].doc)
		}
		res.send(schedules)
	}, err =>
	{
		console.log(err)
	})
})

//Busca todos os agendamentos do usuario
app.get('/getuserschedules', (req, res) =>
{
	couch.get("schedules", "_all_docs?include_docs=true").then(({data, headers, status}) =>
	{
		let schedules = []
		for(let i = 0; i < data.rows.length; i++) {
			if(data.rows[i].doc.customer == req.session.user._id)
				schedules.push(data.rows[i].doc)
		}
		res.send(schedules)
	}, err =>
	{
		console.log(err)
	})
})
//Busca todos os agendamentos do banco
app.get('/getallschedules', (req, res) =>
{
	couch.get("schedules", "_all_docs?include_docs=true").then(({data, headers, status}) =>
	{
		let schedules = []
		for(let i = 0; i < data.rows.length; i++) {
			schedules.push(data.rows[i].doc)
		}
		res.send(schedules)
	}, err =>
	{
		console.log(err)
	})
})

app.get('/getproducts', (req, res) =>
{
	couch.get("products", "_all_docs?include_docs=true").then(({data, headers, status}) =>
	{
		let products = []
		for (let i = 0; i < data.rows.length; i++) {
			products.push(data.rows[i].doc)
		}
		res.send(products)
	}, err =>
	{
		console.log(err)
	})
})

app.get('/getallusers', (req, res) =>
{
	couch.get("users", "_all_docs?include_docs=true").then(({data, headers, status}) =>
	{
		let users = []
		for (let i = 0; i < data.rows.length; i++) {
			users.push(data.rows[i].doc)
		}
		res.send(users)
	}, err =>
	{
		console.log(err)
	})
})

// Para o usuário cadastrar novos pets

const petPic_storage = multer.diskStorage(
{
	destination: "public/images/pets",
	filename: function(req, file, cb)
	{
		cb(null, Date.now() + "." + mime.extension(file.mimetype))
	}
})

app.post('/newpet', multer({storage: petPic_storage}).single("pic"), (req, res) =>
{
	//console.log(req.file)
	//console.log(req.body)

	createPet(req.session.user._id, req.body.id, new Pet(req.body.name, req.body.breed, req.body.age, req.file.path.replace("public/", "")),
	function(user)
	{
		req.session.user = user;

		// nesse caso o método abaixo precisa ser chamado para salvar as alterações na sessão
		// em outros casos (tipo no upload de profile pic do usuário) isso não acontece
		// não sei por que nesse caso é assim

		req.session.save(err => res.redirect('/area_usuario'))
	},
	function(err)
	{
		res.redirect('/area_usuario')
	})
})

/* Inicialização dos servidores https e http. */

const https_server = https.createServer({key: fs.readFileSync("ssl/key.pem"), cert: fs.readFileSync("ssl/cert.pem")}, app).listen(8081, function()
{
	let host = https_server.address().address
	let port = https_server.address().port
	console.log("Servidor HTTPS iniciado em https://%s:%s.", host, port)
})


const http_server = app.listen(8080, function()
{
	let host = http_server.address().address
	let port = http_server.address().port
	console.log("Servidor HTTP iniciado em http://%s:%s", host, port)
})
