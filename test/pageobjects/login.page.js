

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmailForCreate () {
        return $('#email_create');
    }

    get btnSubmitCreate () {
        return $('#SubmitCreate');
    }

    get inputUsername () {
        return $('#email');
    }

    get inputPassword () {
        return $('#passwd');
    }

    get btnSubmit () {
        return $('#SubmitLogin');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }


    async create (email) {
        await this.inputEmailForCreate.setValue(email);
        await this.btnSubmitCreate.click();
    }

    validationOnField (form) {
        switch(form){
            case 'login':
                return $('#login_form .form-group');
            case 'create':
                return $('#create-account_form .form-group');
            default:
                console.log("You can use the next values: 'login' or 'create'")
                break
        }
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('index.php?controller=authentication&back=my-account');
    }
}

module.exports = new LoginPage();
