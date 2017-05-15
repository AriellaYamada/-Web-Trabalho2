///<reference path="User.ts"/>
let u: User = new User("Rodrigo", "rodz", null, "rl.png", null, "rodrigo.weigert@usp.br")
u.pets.push(new Pet("Kabosu", "idkabosu", "shiba inu", 3))
localStorage.usrTest = JSON.stringify(u)
let u2: User = JSON.parse(localStorage.usrTest)
console.log(u2)
