
class Plant{
    constructor(id,name,owner_id) {
        this._id = id;
        this._name = name;
        this._type = "unknown";
        this._threshold = null;
        this._owner_id = owner_id;
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
    get threshold() {
        return this._threshold;
    }
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
    set threshold(value) {
        this._threshold = value;
    }
    set owner_id(value) {
        this._owner_id = value;
    }
}