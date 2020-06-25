class Rent{
    constructor(id, userId, carId, startDate, endDate, coast){
        this.id = id;
        this.carId=carId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.coast = coast;
    }

}
class RentProposal{
    constructor(coast, availability){
        this.availability = availability;
        this.coast = coast;
    }

}
export {Rent, RentProposal};