class ActivityRecord{
    constructor(user_id, action_type,date,time) {
        this._user_id = user_id;
        this._action_type = action_type;
        this._date = date;
        this._time = time;
    }
    //getter
    get user_id() { return this._user_id;}
    get action_type() { return this._action_type;}
    get date() { return this._date;}
    get time() { return this._time;}
    //setter 
    set user_id(value) { this._user_id = value;}
    set action_type(value) { this._action_type = value;}
    set date(value) { this._date = value;}
    set time(value) { this._time = value;}
}

module.exports = ActivityRecord;