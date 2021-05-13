class EnvRecord{
<<<<<<< Updated upstream
    constructor(date,time,env_status_id){
=======
    constructor(date, time, env_status_id) {
>>>>>>> Stashed changes
        this._date = date;
        this._time = time;
        this._env_status_id = env_status_id;
    }
    //getter
    get date() { return this._date;}
    get time() { return this._time;}
<<<<<<< Updated upstream
    get env_status_id() { return this._env_status_id;}
    //since this is record, there's no need for setter
=======
    get env_status_id() {return this._env_status_id;}
    //Since this is a record, there should be no need for setter
>>>>>>> Stashed changes
}

module.exports = EnvRecord;