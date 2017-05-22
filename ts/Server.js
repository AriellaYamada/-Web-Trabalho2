class Pet {
    constructor(name, race, id, age, picSrc) {
        this.name = name;
        this.id = id;
        this.race = race;
        this.age = age;
        this.picSrc = picSrc;
    }
}
class ServerData {
}
class Server {
    constructor() {
        if (localStorage.PetStopServerData) {
            //console.log("Carregando server salvo")
            this.data = JSON.parse(localStorage.PetStopServerData);
        }
        else {
            //console.log("Inicializando novo server")
            this.data = new ServerData();
            this.data.clientId = "usuario1";
            this.data.clientName = "Rodrigo Weigert";
            this.data.clientAddress = "Rua Tiradentes, 123";
            this.data.clientPicSrc = "img/profilepic.jpg";
            this.data.clientTel = "(17) 1234-5678";
            this.data.clientEmail = "rodrigo.weigert@usp.br";
            this.data.clientPets = [];
            this.data.clientPets.push(new Pet("Kabosu", "Shiba Inu", "kabosu", 1, "img/doge.jpg"));
            this.data.clientPets.push(new Pet("Toby", "Bulldog", "tobias", 2, "img/borkdrive.png"));
        }
    }
    saveState() {
        console.log("Saving server state...");
        localStorage.PetStopServerData = JSON.stringify(this.data);
    }
}
//# sourceMappingURL=Server.js.map