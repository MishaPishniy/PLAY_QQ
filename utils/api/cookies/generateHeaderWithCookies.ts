import createAuthCookie from "./createAuthCookies";


export default  async function generateHeaderWithCookies(email:string , password:string) { 

    const sid = await createAuthCookie(email,password)

    return {'Cookie' : `sid=${sid}`}

}