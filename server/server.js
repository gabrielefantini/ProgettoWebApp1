'use strict';

//import express
const express = require('express');
const carDao = require('./car_dao');
const userDao = require('./user_dao');
const rentDao = require('./rent_dao');
const calculatePrice = require('./coastCalculator');
const paymentS = require('./payment');
const morgan = require('morgan'); // logging middleware
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 400000; //seconds

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

//GET /rentProposal/<rentRequest>
/**
 * Ritorna una rentProposal
 * 
 * Se si vuole garantire che questa non sia modificata dall'utente, va aggiunta una firma, che sarà poi verificata nel momento del pagamento
 * Inoltre andrebbe "fermata" una macchina della categoria relativa alla proposta...
 * se l'utente richiede una nuova proposta o se passa un certo intervallo di tempo, la macchina verrà liberata
 */

app.get('/api/rentProposal/:startDate/:endDate/:category/:driverAge/:additionalDrivers/:dailyKm/:extraInsurance', (req, res) => {
    const user = req.user && req.user.user;
    const options = {...req.params};
    calculatePrice(user,options)
    .then(val => {
        res.json(val);
    })
    .catch((err) => {
        res.status(500).json({
            errors:[{'param': 'Server', 'msg': err}],
        });
    });
});

//POST /payments
/**
 * body ---> {
 *              cardHolder,
 *              cardNumber,
 *              cardCvv,
 *              rentProposal:{
 *                  startDate:
 *                  endDate:
 *                  availability:
 *                  category:
 *                  coast:
 *              }
 *  } 
 *
 */

app.post('/api/payments', (req,res) => {
    const paymentRequest = req.body;

    if(!paymentRequest){
        res.status(400).end();
    } else {
        const user = req.user && req.user.user;
        //modulo interno al server che dovrebbe pagare l'importo
        paymentS.payment(paymentRequest.cardHolder, paymentRequest.cardNumber, paymentRequest.cardCvv, paymentRequest.rentProposal.coast)
        .then((answer) => {
            //una volta pagato l'importo
            if(answer === 'OK'){

                const user = req.user && req.user.user;

                let rent = {...paymentRequest.rentProposal};
                rent.userId = user;
                
                //prendo una macchina tra quelle della categoria scelta... N.B. questo potrebbe causare problemi con più prenotazioni contemporanee
                carDao.getOneAvailableCar(rent.startDate, rent.endDate, rent.category)
                .then((car) =>{
                    rent.carId = car.id;
                    
                    console.log(car);
                    console.log(rent);
                    //aggiungo un noleggio al database
                    rentDao.createRent(rent.userId, rent.carId, rent.startDate, rent.endDate, rent.coast)
                    .then((id) => res.status(201).json({"id" : id}))
                    .catch((err) => {});
                })
                .catch((err) => {
                });
            } else {}
        })
        .catch((err) => {})
    }
});

//DELETE /rents/<rentId>
app.delete('/api/rents/:rentId',(req, res) => {
    const user = req.user && req.user.user;
    rentDao.deleteRent(req.params.rentId, user)
    .then((result) => res.status(204).end())
    .catch((err) => {
        res.status(500).json({errors: [{'param': 'Server', 'msg': err}],});
    });
});

//activate server
app.listen(port, () => console.log('Server ready'));