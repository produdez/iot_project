<<<<<<< Updated upstream
=======
const Threshold = require('./Threshold.js')
>>>>>>> Stashed changes

class Plant{
    constructor(id,name,owner_id) {
        this._id = id;
        this._name = name;
        this._type = "unknown";
<<<<<<< Updated upstream
        this._threshold = null;
        this._owner_id = owner_id;
    }
=======
        this._owner_id = owner_id;
        this._threshold = new Threshold();
    }
    
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    get threshold() {
        return this._threshold;
    }
=======
>>>>>>> Stashed changes
    get owner_id() {
        return this._owner_id;
    }
    //Setter 
    set name(value) {
        this._name = value;
    }
    set type(value) {
        this._type = value;
    }
<<<<<<< Updated upstream
    set threshold(value) {
        this._threshold = value;
    }
    set owner_id(value) {
        this._owner_id = value;
    }
}
=======
    set owner_id(value) {
        this._owner_id = value;
    }
    //
    setThreshold(active_val, temp_val, humid_val) {
        this._threshold.active(active_val);
        this._threshold.temp(temp_val);
        this._threshold.humid(humid_val);
    }
}

module.exports = Plant;
>>>>>>> Stashed changes
