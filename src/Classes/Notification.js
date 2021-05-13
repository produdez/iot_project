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
    
}