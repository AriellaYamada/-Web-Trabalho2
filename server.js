const express = require("express")
const fs = require("fs")
const https = require("https")
const NodeCouchDb = require("node-couchdb")
const bodyParser = require("body-parser")

const couch = new NodeCouchDb()


/* Cria um novo usuário no banco de dados */
function createUser(id, pass)
{
	couch.insert("users",
	{
		_id: id,
		pass: pass
	}).then(
	({data, headers, status}) => {console.log("Usuário com id %s inserido com sucesso.", data.id)},
	(err) => {console.log(err)})
}

/* Verifica se o par (id, pass) bate com algum usuário do banco.
 Se sim, chama ok_callback. Caso contrário, err_callback */
function authenticateUser(id, pass, ok_callback, err_callback)
{
	couch.get("users", id).then(
	function({data, headers, status})
	{
		let user = data
		if (user.pass == pass)
		{
			ok_callback()
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
		createUser("usuario1", "1234")
		createUser("admin", "admin")
	},
	function(err)
	{
		if (err.code == "EDBEXISTS")
			console.log("Database 'users' já existe, não será alterada.")
		else
			console.log(err.body)
	}
)

const app = express()

// Para uso de https
const https_options = 
{
	key: fs.readFileSync("ssl/key.pem"),
	cert: fs.readFileSync("ssl/cert.pem")
}

// Para o servidor servir tudo o que está no diretório "public" automaticamente.
app.use(express.static("public"))

// Para parsear dados enviados por POST
app.use(bodyParser.urlencoded({extended: true}))

// Página inicial.
app.get('/', (req, res) => 
{
	res.sendFile(__dirname + "/index.html")
})

// Autenticação
app.post('/login', (req, res) =>
{
	authenticateUser(req.body.login, req.body.pass, () => res.send("Autenticação de " + req.body.login + " feita com sucesso."), 
	function(err)
	{
		if (err == "NOSUCHUSER" || err == "WRONGPASS")
			res.send("Usuário e/ou senha incorretos.")
		else
			res.send("Um erro inesperado ocorreu.")
	})
})


/* Inicialização dos servidores https e http. */

const https_server = https.createServer(https_options, app).listen(8081, function()
{
	let host = https_server.address().address
	let port = https_server.address().port
	console.log("HTTPS server started at https://%s:%s.", host, port)
})


const http_server = app.listen(8080, function()
{
	let host = http_server.address().address
	let port = http_server.address().port
	console.log("HTTP server started at http://%s:%s", host, port)
})

