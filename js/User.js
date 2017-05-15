///<reference path="Pet.ts"/>
var User = (function () {
    function User(name, id, address, picSrc, tel, email) {
        this._name = name;
        this._id = id;
        this._address = address;
        this._picSrc = picSrc;
        this._tel = tel;
        this._email = email;
        this.pets = [];
    }
    return User;
}());
