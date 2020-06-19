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

module.exports = Rent;