class Notification{
    constructor(user_id, plant_id, noti_type, message) {
        this._user_id = user_id;
        this._plant_id = plant_id;
        this._noti_type = noti_type;
        this._message = message;
    }
    //getter
    get user_id() { return this._user_id;}
    get plant_id() { return this._plant_id;}
    get noti_type() { return this._noti_type;}
    get message() { return this._message;}
    //setter
<<<<<<< Updated upstream
    
}
=======
    set user_id(value) { this._user_id = value;}
    set plant_id(value) { this._plant_id = value;}
    set noti_type(value) { this._noti_type = value;}
    set message(value) { this._message = value;}
}

module.exports = Notification;
>>>>>>> Stashed changes
