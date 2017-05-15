///<reference path="Pet.ts"/>

class User
{
	_name: string
	_id: string
	_address: string
	_picSrc: string
	_tel: string
	_email: string
	pets : Pet[]

	constructor(name: string, id: string, address: string, picSrc: string, tel: string, email: string)
	{
		this._name = name
		this._id = id
		this._address = address
		this._picSrc = picSrc
		this._tel = tel
		this._email = email
		this.pets = []
	}
}
