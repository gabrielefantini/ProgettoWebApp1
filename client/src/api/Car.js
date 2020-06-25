class Car{
    constructor(id, name, brand, category, availability){
        if(id)
            this.id = id;
        
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.availability = availability;
    }

    /**
     * Construct a Car from a plain object
     * @param {{}} json 
     * @return {Car} the newly created Car object
     */
    static from(json) {
        const t =  Object.assign(new Car(), json);
        return t;
    }
}

export default Car;