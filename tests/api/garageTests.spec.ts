import test, { expect } from "@playwright/test";
import {users} from "../../test-data/credentials"


test('Cars models public request', async({request}) =>{

    const response = await request.get('/api/cars/models');
    const body =  await response.json();
    const allCars = body.data;
    const carTitle = allCars[10].title;
    expect(carTitle).toEqual('Fiesta')
    expect(allCars.length).toEqual(23);
    expect(body.status).toEqual('ok');
})



test('Cars', async({request}) =>{

    const aurhRequest = await request.post('/api/auth/signin', {
        data : {
            "email": users.mainUser.email,
            "password": users.mainUser.password,
            "remember": false
        }
    })


    const response = await request.get('/api/cars/');
    const body =  await response.json();
    console.log(body)
  
})