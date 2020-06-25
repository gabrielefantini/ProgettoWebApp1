class Rent{
    constructor(id, userId, carId, startDate, endDate, coast){
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.coast = coast;
    }
}

module.exports = Rent;