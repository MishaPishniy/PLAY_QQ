import LoginFormComponent from "../components/loginForm.component";

class LoginPage {
    constructor(page){
        this.page = page;
        this.loginForm = new LoginFormComponent(page);
    }

    async navigate(){

        await this.page.goto(process.env.BASE_URL);
    }
}

module.exports = LoginPage;