import Car from './Car';
import { Rent, RentProposal} from './Rent';
const baseURL = "/api";


async function isAuthenticated(){
    let url = "/user";
    const response = await fetch(baseURL + url);
    const userJson = await response.json();
    if(response.ok){
        return userJson;
    } else {
        let err = { status: response.status, errObj: userJson};
        throw err;
    }
}

async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogout() {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        });
    });
}

async function getPublicCars(){
    
    let url = "/cars/public";
    const response = await fetch(baseURL + url);
    const carsJson = await response.json();
    if(response.ok){
        return carsJson.map((c) => new Car(c.id, c.name, c.brand, c.category, c.availability));
    } else {
        let err = { status: response.status, errObj: carsJson };
        throw err;
    }
}

async function getRentsHistory(){
    let url = "/rentsHistory";
    const response = await fetch(baseURL + url);
    const rentsHistoryJson = await response.json();
    if(response.ok){
        return rentsHistoryJson.map((r) => new Rent(r.id, r.carId, r.userId, r.startDate, r.endDate, r.coast));
    } else {
        let err = {status: response.status, errObj: rentsHistoryJson};
        throw err;
    }
}

async function getRentProposal(rentRequest) {
    let url = "/rentProposal/";
    if(rentRequest){
        url+=`${rentRequest.startDate}/${rentRequest.endDate}/${rentRequest.category}/${rentRequest.driverAge}/${rentRequest.additionalDrivers}/${rentRequest.dailyKm}/${rentRequest.extraInsurance}`;
    }
    const response = await fetch(baseURL + url);
    const proposalJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return new RentProposal(proposalJson.coast, proposalJson.availability);
    } else {
        let err = {status: response.status, errObj:proposalJson};
        throw err;  // An object with the error coming from the server
    }
}

const API = { getPublicCars, userLogin, userLogout, isAuthenticated, getRentsHistory, getRentProposal};
export default API;