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
        const sql = `SElECT COUNT (id) AS availability FROM car 
                    WHERE id NOT IN (SELECT carId FROM rent WHERE (startDate >= ? AND startDate <=?) OR (endDate >= ? AND endDate <= ?))
                    AND category = ?` //tutti quelli che iniziano nell'intervallo e tutti quelli che finiscono nell'intervallo
        db.all(sql, [start, end, start, end, category], (err, rows)=>{
            if(err){
                reject(err);
            } else {
                resolve(rows[0].availability); //deve ritornare per forza una riga!
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