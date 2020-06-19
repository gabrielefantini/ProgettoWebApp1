'use strict';

const Car = require('./car');
const db = require('./db');

const createCar = (row) => {
    return new Car(row.id, row.name, row.brand, row.category, row.avaibility);
}

/**
 * Get all public cars
 */

exports.getPublicCars = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM car`;
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