class EnvStatus{
    constructor(id, temp, humid, lighting) {
        this._id = id;
        this._temp = temp;
<<<<<<< Updated upstream
        this.humid = humid;
        this.lighting = lighting;
    }
    //getter
    

=======
        this._humid = humid;
        this._lighting = lighting;
    }
    //getter
    get id() { return this._id; }
    get temp() { return this._temp;}
    get humid() { return this._humid;}
    get lighting() {return this._lighting;}
    //setter
    set temp(value) { this._temp = value;}
    set humid(value) { this._humid = value;}
    set lighting(value) { this._lighting = value;}
>>>>>>> Stashed changes
}

module.exports = EnvStatus;