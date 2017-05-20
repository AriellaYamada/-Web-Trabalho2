class Pet
{
	name: string
	id: string
	race: string
	age: number
	picSrc: string

	constructor(name: string, race: string, id: string, age: number, picSrc: string)
	{
		this.name = name
		this.id = id
		this.race = race
		this.age = age
		this.picSrc = picSrc
	}
}

class ServerData
{
	clientId: string
	clientName: string
	clientAddress: string
	clientPicSrc: string
	clientTel: string
	clientEmail: string
	clientPets: Pet[]
}

class Server
{
	//users: User[]
	data: ServerData

	constructor()
	{
		if (localStorage.PetStopServerData)			// se tiver um server salvo no localStorage, carrega seus dados
		{
			//console.log("Carregando server salvo")
			this.data = JSON.parse(localStorage.PetStopServerData)
		}
		else	// inicializará server com alguns dados (usuários, pets) de exemplo
		{
			//console.log("Inicializando novo server")
			this.data = new ServerData()
			this.data.clientId = "usuario1"
			this.data.clientName = "Rodrigo Weigert"
			this.data.clientAddress = "Rua Tiradentes, 123"
			this.data.clientPicSrc = "img/profilepic.jpg"
			this.data.clientTel = "(17) 1234-5678"
			this.data.clientEmail = "rodrigo.weigert@usp.br"
			this.data.clientPets = []

			this.data.clientPets.push(new Pet("Kabosu", "Shiba Inu", "kabosu", 1, "img/doge.jpg"))
			this.data.clientPets.push(new Pet("Toby", "Bulldog", "tobias", 2, "img/borkdrive.png"))
		}
	}

	saveState() : void
	{
		console.log("Saving server state...")
		localStorage.PetStopServerData = JSON.stringify(this.data)
	}
}
