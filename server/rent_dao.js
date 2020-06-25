'use strict';

const Rent = require('./rent');
const db = require('./db');

const createRent = (row) => {
    return new Rent(row.id, row.userId, row.carId, row.startDate, row.endDate, row.coast);
}

/**
 * Get all rent by userId
 */

exports.getRentByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM rent WHERE userId = ?`;
        db.all(sql, [userId], (err, rows) => {
            if(err){
                reject(err);
            } else {
                let rents = rows.map((row) => createRent(row));
                resolve(rents);
            }
        });
    });
}

exports.getRentNumberByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT (id) AS rents FROM rent WHERE userId = ?`;
        db.all(sql, [userId], (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(rows[0].rents);
            }
        });
    });
}
