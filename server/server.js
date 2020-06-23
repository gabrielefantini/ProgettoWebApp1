'use strict';

//import express
const express = require('express');
const carDao = require('./car_dao');
const userDao = require('./user_dao');
const rentDao = require('./rent_dao');
const morgan = require('morgan'); // logging middleware
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 400; //seconds

// Authorization error
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };

//create application
const app = express();
const port = 3001;

// Set-up logging
app.use(morgan('tiny'));

// Process body content
app.use(express.json());


// Authentication endpoint
app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    userDao.getUser(username)
      .then((user) => {

        if(user === undefined) {
            res.status(404).send({
                errors: [{ 'param': 'Server', 'msg': 'Invalid username' }] 
              });
        } else {
            if(!userDao.checkPassword(user, password)){
                res.status(401).send({
                    errors: [{ 'param': 'Server', 'msg': 'Wrong password' }] 
                  });
            } else {
                //AUTHENTICATION SUCCESS
                const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {expiresIn: expireTime});
                res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
                res.json({id: user.id, name: user.name});
            }
        } 
      }).catch(

        // Delay response when wrong user/pass is sent to avoid fast guessing attempts
        (err) => {
            new Promise((resolve) => {setTimeout(resolve, 1000)}).then(() => res.status(401).json(authErrorObj))
        }
      );
  });

app.use(cookieParser());

app.post('/api/logout', (req, res) => {
    res.clearCookie('token').end();
});


//GET /cars/public
app.get('/api/cars/public', (req, res) => {
    carDao.getPublicCars()
        .then((cars) => {
            res.json(cars);
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});



// For the rest of the code, all APIs require authentication
app.use(
    jwt({
      secret: jwtSecret,
      getToken: req => req.cookies.token
    })
  );
  
// To return a better object in case of errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json(authErrorObj);
    }
  });

// AUTHENTICATED REST API endpoints

//GET /user
app.get('/api/user', (req,res) => {
    const user = req.user && req.user.user;
    userDao.getUserById(user)
        .then((user) => {
            res.json({id: user.id, username: user.username});
        }).catch(
        (err) => {
         res.status(401).json(authErrorObj);
        }
      );
});



//GET /rentsHistory
app.get('/api/rentsHistory', (req, res) => {
    const user = req.user && req.user.user;
    rentDao.getRentByUserId(user)
        .then((rents) => {
            if(!rents){
                res.status(404).send();
            } else {
                res.json(rents);
            }
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            });
        });
});

//GET /avaibleRents/<rentRequest>
app.get('/api/avaibleRents/:startDate/:endDate/:category/:driverAge/:additionalDrivers/:dailyKm/:extraInsurance', (req, res) => {
    
});
/*
//GET /tasks
app.get('/api/tasks', (req, res) => {
    const user = req.user && req.user.user;
    taskDao.getTasks(user, req.query.filter)
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

//POST /tasks
app.post('/api/tasks', (req,res) => {
    const task = req.body;
    if(!task){
        res.status(400).end();
    } else {
        const user = req.user && req.user.user;
        task.user = user;
        taskDao.createTask(task)
            .then((id) => res.status(201).json({"id" : id}))
            .catch((err) => {
                res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
            });
    }
});

//DELETE /tasks/<taskId>
app.delete('/api/tasks/:taskId', (req,res) => {
    taskDao.deleteTask(req.params.taskId)
        .then((result) => res.status(204).end())
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});

//PUT /tasks/<taskId>
app.put('/api/tasks/:taskId', (req,res) => {
    if(!req.body.id){
        res.status(400).end();
    } else {
        const task = req.body;
        const user = req.user && req.user.user;
        task.user = user;
        taskDao.updateTask(req.params.taskId,task)
            .then((result) => res.status(200).end())
            .catch((err) => res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            }));
    }
});

*/

//activate server
app.listen(port, () => console.log('Server ready'));