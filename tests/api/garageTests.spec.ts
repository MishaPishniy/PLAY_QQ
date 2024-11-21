import test, { expect } from "@playwright/test";
import {users} from "../../test-data/credentials"
import createAuthCookie from "../../utils/api/cookies/createAuthCookies";
import generateHeaderWithCookies from "../../utils/api/cookies/generateHeaderWithCookies";
import getUserCarsList from "../../utils/garage/getUserCarsList";



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


    console.log('-------------Before------------');
    console.log(await request.storageState());
    console.log('-------------------------');

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

    console.log('------------Afte-------------');
    console.log(await request.storageState());
    console.log('-------------------------');
})

//   6 passed (5.4s)
test.describe('API TEST BeforeEach' , ()=>{


    test.beforeEach(async ({request})=>
    {

        const aurhRequest = await request.post('/api/auth/signin', {
            data : {
                "email": users.mainUser.email,
                "password": users.mainUser.password,
                "remember": false
            }
        })

    })

    test('Cars BeforeEach 1', async({request}) =>{
        const response = await request.get('/api/cars/');
        const body =  await response.json();
        console.log(body)
})

test('Cars BeforeEach 2', async({request}) =>{
    const response = await request.get('/api/cars/');
    const body =  await response.json();
    console.log(body)
})

test('Cars BeforeEach 3', async({request}) =>{
    const response = await request.get('/api/cars/');
    const body =  await response.json();
    console.log(body)
})

test('Cars BeforeEach 4', async({request}) =>{
    const response = await request.get('/api/cars/');
    const body =  await response.json();
    console.log(body)
})
test('Cars BeforeEach 5', async({request}) =>{
    const response = await request.get('/api/cars/');
    const body =  await response.json();
    console.log(body)
})
test('Cars BeforeEach 6', async({request}) =>{
    const response = await request.get('/api/cars/');
    const body =  await response.json();
    console.log(body)
})

})




test.describe('API TEST BeforeALL' , ()=>{


    //let sid: string;

    let authHeaders;
    test.beforeAll(async ()=>
    {
        //  sid = await createAuthCookie(users.mainUser.email , users.mainUser.password);

        authHeaders = await generateHeaderWithCookies(users.mainUser.email , users.mainUser.password);

        //  console.log('Cookies' + JSON.stringify(await generateHeaderWithCookies(users.mainUser.email , users.mainUser.password)))
    })

    test('Cars BeforeAll 1', async({request}) =>{
        const response = getUserCarsList(authHeaders);
      console.log(await response)
})

test('Cars BeforeAll 2', async({request}) =>{
    const response = await request.get('/api/cars/',
    {
        headers : {
            'Cookie' : `sid=${sid}`
        }
    }
);
    const body =  await response.json();
    console.log(body)


})

test('Cars BeforeAll 3', async({request}) =>{
    const response = await request.get('/api/cars/',
    {
        headers : {
            'Cookie' : `sid=${sid}`
        }
    }
);
    const body =  await response.json();
    console.log(body)


})

test('Cars BeforeAll 4', async({request}) =>{
    const response = await request.get('/api/cars/',
    {
        headers : {
            'Cookie' : `sid=${sid}`
        }
    }
);
    const body =  await response.json();
    console.log(body)


})

test('Cars BeforeAll 5', async({request}) =>{
    const response = await request.get('/api/cars/',
    {
        headers : {
            'Cookie' : `sid=${sid}`
        }
    }
);
    const body =  await response.json();
    console.log(body)


})


test('Cars BeforeAll 6', async({request}) =>{
    const response = await request.get('/api/cars/',
    {
        headers : {
            'Cookie' : `sid=${sid}`
        }
    }
);
    const body =  await response.json();
    console.log(body)


})

})