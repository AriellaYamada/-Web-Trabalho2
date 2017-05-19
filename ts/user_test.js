///<reference path="Server.ts"/>
let u = new User("Rodrigo", "rodz", null, "rl.png", null, "rodrigo.weigert@usp.br", false);
u.pets.push(new Pet("Kabosu", "idkabosu", "shiba inu", 3));
localStorage.usrTest = JSON.stringify(u);
let u2 = JSON.parse(localStorage.usrTest);
console.log(u2);
