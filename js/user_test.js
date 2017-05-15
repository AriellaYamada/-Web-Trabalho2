///<reference path="User.ts"/>
var u = new User("Rodrigo", "rodz", null, "rl.png", null, "rodrigo.weigert@usp.br");
u.pets.push(new Pet("Kabosu", "idkabosu", "shiba inu", 3));
localStorage.usrTest = JSON.stringify(u);
var u2 = JSON.parse(localStorage.usrTest);
console.log(u2);
