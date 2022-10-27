const LoginPage = require('../pageobjects/login.page');

describe('My Home Page', () => {

    beforeEach(function(){
        LoginPage.open()
     })


    it('Verify Create field with Invalid Value', async () => {
        await LoginPage.inputEmailForCreate.setValue("testtest")
        await LoginPage.btnSubmitCreate.click({ x: 190 })
        const status = await LoginPage.validationOnField('create').getAttribute('class')
        await expect(status).toContain('error')
    });
})