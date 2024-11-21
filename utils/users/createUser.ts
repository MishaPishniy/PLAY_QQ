import { request } from "@playwright/test";


export default async function createUser(userName: string, userLastName: string, userEmail: string, userPassword: string) {

    const contextRequest  = await request.newContext();
    const createUserReques =  await contextRequest.post('/api/auth/signup', {
        data: {
            "name": userName,
            "lastName": userLastName,
            "email": userEmail,
            "password": userPassword,
            "repeatPassword": userPassword
        }
    })
       return  await createUserReques.json();
    }