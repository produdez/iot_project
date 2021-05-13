class Sensor {
    constructor(id,name) {
        this._id = id;
        this._name = name
        this._type = "unknown";
        this._status = false;
        this._creation_date = Date.now();
        this._plant_id = null;
    }
    //Getter
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get status() {
        return this._status;
    }
    get creation_date() {
        return this._creation_date;
    }
    get plant_id() {
        return this._plant_id;
    }
    //Setter
    set name(value) {
        this._name = value;
    }
    set type(value) {
        this._type = value;
    }
    set status(value) {
        this._status = value;
    }
    set creation_date(value) {
        this._creation_date = value;
    }
    set plant_id(value) {
        this._plant_id = value;
    }
}

module.exports = Sensor;