'use strict';

const Rent = require('./rent');
const db = require('./db');

const createRent = (row) => {
    return new Rent(row.id, row.userId, row.carId, row.startDate, row.endDate, row.coast);
}


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

exports.createRent = (userId, carId, startDate, endDate, coast) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO rent (userId, carId, startDate, endDate, coast)
                            VALUES (?,?,?,?,?)`;
        db.all(sql, [userId, carId, startDate, endDate, coast], (err, row) => {
            if(err){
                reject(err);
            } else {
                console.log(row);
                resolve(row);
            }
        })
    });
}

exports.deleteRent = (id, userId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM rent WHERE id = ? AND userId = ?`;
        db.run(sql, [id, userId], (err) => {
            if(err)
                reject(err);
            else 
                resolve(null);
        })
    })
}