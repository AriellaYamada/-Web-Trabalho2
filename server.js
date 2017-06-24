const express = require("express")
const fs = require("fs")
const https = require("https")
const NodeCouchDb = require("node-couchdb")
const bodyParser = require("body-parser")
const session = require("express-session")

const couch = new NodeCouchDb()


/* Cria um novo usuário no banco de dados */
function createUser(id, pass, is_admin)
{
	couch.insert("users",
	{
		_id: id,
		pass: pass,
		is_admin: is_admin
	}).then(
	({data, headers, status}) => {console.log("Usuário com id %s inserido com sucesso.", data.id)},
	(err) => {console.log(err)})
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
		createUser("usuario1", "1234", false)
		createUser("admin", "admin", true)
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

// Para o servidor servir tudo o que está no diretório "public" automaticamente.
app.use(express.static("public"))

// Para parsear dados enviados por POST
app.use(bodyParser.urlencoded({extended: true}))

// Para lidar com as sessões dos usuários
app.use(session({secret: "q q eu to fazeno com a minha vida?", resave: false, saveUninitialized: false}))

// Página inicial.
app.get('/', (req, res) => 
{
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

app.get('/logout', (req, res) =>
{
	req.session.destroy()
	res.redirect('/')
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

