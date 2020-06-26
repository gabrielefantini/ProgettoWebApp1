'use strict';

const Car = require('./car');
const db = require('./db');

const createCar = (row) => {
    return new Car(row.id, row.name, row.brand, row.category);
}



exports.getPublicCars = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM car GROUP BY name`;
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
            } else {
                let cars = rows.map((row) => createCar(row));
                resolve(cars);
            }
        });
    });
}

exports.getAvailableCarsNumber = (start, end, category) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT (id) AS availability FROM car 
                    WHERE id NOT IN (SELECT carId FROM rent WHERE
                                                                (? <= startDate AND startDate <= ?) OR
                                                                (? <= endDate AND endDate <= ?) OR
                                                                (startDate <= ? AND ? <= endDate)
                                    )
                    AND category = ?` //tutti quelli che iniziano nell'intervallo, tutti quelli che finiscono nell'intervallo, tutti quelli che comprendono l'intervallo
        db.all(sql, [start, end, start, end, start, end, category], (err, rows)=>{
            if(err){
                reject(err);
            } else {
                resolve(rows[0].availability); //deve ritornare per forza una riga!
            }
        });
    });
}

exports.getOneAvailableCar = (start, end, category) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM car 
                    WHERE id NOT IN (SELECT carId FROM rent WHERE 
                                                                (? <= startDate AND startDate <= ?) OR
                                                                (? <= endDate AND endDate <= ?) OR
                                                                (startDate <= ? AND ? <= endDate)
                                    )
                    AND category = ?`  //tutti quelli che iniziano nell'intervallo, tutti quelli che finiscono nell'intervallo, tutti quelli che comprendono l'intervallo
        db.all(sql, [start, end, start, end, start, end, category], (err, rows)=>{
            if (err) 
                reject(err);
            else if (rows.length === 0){
                console.log("not found");
                resolve(undefined);
            }
            else{
                const car = createCar(rows[0]);
                console.log(car);
                resolve(car);
            }
        });
    });
}

exports.getAllCarsNumberByCategory = (category) => {
    return new Promise((resolve, reject)=>{
        const sql = `SELECT COUNT (id) AS availability FROM car
                    WHERE category=?`;
        db.all(sql, [category], (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(rows[0].availability);
            }
        });
    });
}