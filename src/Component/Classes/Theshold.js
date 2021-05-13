class Threshold{
    constructor(id) {
        this._id = id;
        this._active = false;
        this._temp = null;
        this._humid = null;
    }
    //getter
    get id() { return this._id;}
    get active() { return this._active;}
    get temp() { return this._temp;}
    get humid() { return this._humid;}
    //setter
    set active(value) { this._active = value;}
    set temp(value) { this._temp = value;}
    set humid(value) { this._humid = value;}
}

module.exports = Threshold;