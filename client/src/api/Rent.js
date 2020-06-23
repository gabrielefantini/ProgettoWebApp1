class Rent{
    constructor(id, carId, userId, startDate, endDate, coast){
        if(id)
            this.id = id;
        
        this.carId = carId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.coast = coast;
    }

}
class RentProposal{
    constructor(carId, userId, startDate, endDate, coast, carName, carBrand, carAvaibility){
        this.carId = carId;
        this.userId = userId;
        this.carName = carName;
        this.carBrand = carBrand;
        this.carAvaibility = carAvaibility;
        this.startDate = startDate;
        this.endDate = endDate;
        this.coast = coast;
    }

}
export {Rent, RentProposal};