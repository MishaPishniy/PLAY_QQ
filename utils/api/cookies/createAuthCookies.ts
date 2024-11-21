import { request } from "@playwright/test";


let sid;
export default  async function createAuthCookie (email:string , password:string) {

    const contextRequest  = await request.newContext();
    const respons =  await contextRequest.post('/api/auth/signin', {
    data : {
        "email": email,
        "password": password,
        "remember": false
    }
})

const cookie = respons.headers()['set-cookie'];
console.log(respons.headers())
if(cookie) {
    const cookieArray = cookie.split('\n')
    for ( const cookie of cookieArray){
        if (cookie.trim().startsWith('sid=')){
            sid = (cookie.trim().split('=')[1].split(';')[0]);
            break;
        }

    }

}
return sid;
}
