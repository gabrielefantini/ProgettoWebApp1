import Car from './Car';
const baseURL = "/api";



async function getPublicCars(){
    
    let url = "/cars/public";
    const response = await fetch(baseURL + url);
    const carsJson = await response.json();
    if(response.ok){
        return carsJson.map((c) => new Car(c.id, c.name, c.brand, c.category, c.avaibility));
    } else {
        let err = { status: response.status, errObj: carsJson };
        throw err;
    }
}


const API = { getPublicCars};
export default API;