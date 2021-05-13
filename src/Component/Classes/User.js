class User{
    constructor(id, name, email) {
        this._id = id;
        this._name = name;
        this._email = email;
    }
    //getter
    get id() { return this._id;}
    get name() { return this._name;}
    get email() { return this._email;}
    //setter 
    set name(value) { this._name = value;}
    set email(value) { this._email = value;}
}

module.exports = User;