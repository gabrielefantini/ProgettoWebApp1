class Car{
    constructor(id, name, brand, category, avaibility){
        if(id)
            this.id = id;
        
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.avaibility = avaibility;
    }
}

module.exports = Car;