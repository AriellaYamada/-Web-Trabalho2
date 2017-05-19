class Pet
{
	_name: string
	_id: string
	_race: string
	_age: number

	constructor(name: string, id: string, race: string, age: number)
	{
		this._name = name
		this._id = id
		this._race = race
		this._age = age
	}
}

class User
{
	name: string
	id: string
	address: string
	picSrc: string
	tel: string
	email: string
	pets : Pet[]
	isAdmin: boolean

	constructor(id: string, name?: string, address?: string, picSrc?: string, tel?: string, email?: string, isAdmin?: boolean)
	{
		this.name = name
		this.id = id
		this.address = address
		this.picSrc = picSrc
		this.tel = tel
		this.email = email
		this.pets = []
		this.isAdmin = isAdmin
	}
}

class Server
{
	users: User[]
	constructor()
	{
		if (localStorage.PetStopServer)		// se tiver um server salvo no localStorage, carrega seus usuários
			this.users = JSON.parse(localStorage.PetStopServer).users
		else
			this.users = []
	}

	loginUser(username: string) : void
	{
		sessionStorage.PetStopCurrentUser = username
		let usr: User = this.users.find(u => u.id == username)
		if (!usr)		// se instância do usuário atual não existir, cria-a
			this.users.push(new User(username))
	}
}

function saveServerState(server: Server) : void		// salva o estado do servidor no localStorage
{
	localStorage.PetStopServer = JSON.stringify(server)
}
