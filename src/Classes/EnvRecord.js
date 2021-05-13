class EnvRecord{
    constructor(date,time,env_status_id){
        this._date = date;
        this._time = time;
        this._env_status_id = env_status_id;
    }
    //getter
    get date() { return this._date;}
    get time() { return this._time;}
    get env_status_id() { return this._env_status_id;}
    //since this is record, there's no need for setter
}

module.exports = EnvRecord;