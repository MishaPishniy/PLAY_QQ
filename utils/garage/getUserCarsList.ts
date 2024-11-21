import { request } from "@playwright/test";

export default async function getUserCarsList(header) {

    const contextRequest  = await request.newContext();
    const response =  await contextRequest.get('/api/cars/',
        {
            headers : header
        }
    );
       return  await response.json();
    }
