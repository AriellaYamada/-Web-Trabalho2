class Pet {
    constructor(name, id, race, age) {
        this._name = name;
        this._id = id;
        this._race = race;
        this._age = age;
    }
}
class User {
    constructor(id, name, address, picSrc, tel, email, isAdmin) {
        this.name = name;
        this.id = id;
        this.address = address;
        this.picSrc = picSrc;
        this.tel = tel;
        this.email = email;
        this.pets = [];
        this.isAdmin = isAdmin;
    }
}
class Server {
    constructor() {
        if (localStorage.PetStopServer)
            this.users = JSON.parse(localStorage.PetStopServer).users;
        else
            this.users = [];
    }
    loginUser(username) {
        sessionStorage.PetStopCurrentUser = username;
        let usr = this.users.find(u => u.id == username);
        if (!usr)
            this.users.push(new User(username));
    }
}
function saveServerState(server) {
    console.log("Saving server state...");
    localStorage.PetStopServer = JSON.stringify(server);
}
