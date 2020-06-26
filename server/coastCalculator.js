'use strict'
const carDao = require('./car_dao');
const rentDao = require('./rent_dao');
const moment = require('moment');

//TODO add error handling!!!!!!
async function calculatePrice(user, options){
        let coast = 0;
        if(user && options.startDate && options.endDate && options.category && options.dailyKm && options.driverAge && options.additionalDrivers && options.extraInsurance){
            try {
                //0---> Definisco la durata del noleggio in giorni così da non dover rifare i calcoli
                const startDate = moment(options.startDate , 'YYYY-MM-DD');
                const endDate = moment(options.endDate , 'YYYY-MM-DD');
                const days = moment.duration(endDate.diff(startDate)).asDays();
                //1---> trovo tutte le macchine disponibili per quella data
                const carsAvailable = await carDao.getAvailableCarsNumber(options.startDate, options.endDate, options.category);
                if(carsAvailable === 0){
                    return {availability: 0};
                }
                //3--->Calcolo il costo in base alla disponibilità e alle opzioni; ogni volta verifico la presenza dei campi necessari
                //3a--->costo base
                switch (options.category) {
                    case "A":
                        coast = days*80;
                        break;
                    case "B":
                        coast = days*70;
                        break;
                    case "C":
                        coast = days*60;
                        break;
                    case "D":
                        coast = days*50;
                        break;
                    case "E":
                        coast = days*40;
                        break;
                }

                //3b--->costo in base ai Km percorsi giornalmente
                if(options.dailyKm<50) 
                    coast = (coast/100) * 95;
                if(options.dailyKm>=150)
                    coast = (coast/100) * 105;               
                //3c--->costo in base all'età del guidatore
                const driverBirth = moment(options.driverAge, 'YYYY-MM-DD');
                const current = moment();
                const driverAge = parseInt(moment.duration(current.diff(driverBirth)).asYears());

                if(driverAge<25)
                    coast = (coast/100) * 105;
                if(driverAge>65)
                    coast = (coast/100) * 110;
                //3d--->costo in base alla presenza di guidatori extra
                if(options.additionalDrivers!=='0')
                    coast = (coast/100) * 115;
                //3e--->costo in base all'assicurazione extra
                if(options.extraInsurance === 'true')
                    coast = (coast/100) * 120;
                //4--->costo se meno di 10% dei veicoli rimasti della stessa categoria
                const cars = await carDao.getAllCarsNumberByCategory(options.category);
                if(carsAvailable <= ((cars/100)*10) )
                    coast = (coast/100) * 110;
                //5--->costo se cliente frequente 
                const rentsNumber = await rentDao.getRentNumberByUserId(user);
                if(rentsNumber>=3)
                    coast = (coast/100) * 90;
                //Infine restituisco il preventivo
                coast = parseInt(coast);
                const rentProposal = { startDate: options.startDate, endDate: options.endDate, coast: coast, availability: carsAvailable, category: options.category};
                return(rentProposal);
            } catch (error) {
                throw Error(error);
            }
        } else {
            const err = "Incomplete or wrong parameters";
            throw err;
        }
}

module.exports = calculatePrice;