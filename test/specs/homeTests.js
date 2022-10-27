const HomePage = require('../pageobjects/home.page');
const Emails = require('../util/emails')
const helpers = require('../util/helpers')


describe('My Home Page', () => {

    beforeEach(function(){
       HomePage.open()
    })

    afterEach(async function (){
        await browser.reloadSession()
    })





    xit('Verify Header Telephone', async () => {
        expect (await HomePage.getTelephone()).toEqual('0123-456-789')
    });

    xit('Verify HeaderNav Links', async () => {
        //HomePage.open()
        let contactBtn = await (await HomePage.getNavBtns(2)).getText()
        let SignInBtn = await (await HomePage.getNavBtns(1)).isClickable()
        expect (await contactBtn).toBe('Contact us')
        expect (await SignInBtn).toBe(true)
    });

    xit('should wait until slider images have displayed', async () => {
        //HomePage.open()
        await (await HomePage.getSliderImage(2)).waitForExist({timeout:5000, timeoutMsg:"images are not present"})
        let images = await HomePage.getImages()
        await expect (images.length).toBe(3) //verify amount of images
        //await browser.pause(5000)
        for(let el of images){
            console.log('checking image with attribute ' + await el.getAttribute('alt'))
            let ans = await el.waitForDisplayed({timeout:10000, reverse:false, timeoutMsg:`expected image ${await el.getAttribute('alt')} is not displayed`})
            expect (await ans).toBe(true)
            //await expect(el).toBeDisplayed()
        }
    });

    xit('should wait until image slider css position has changed', async () => {
        //HomePage.open()

        let pos = await HomePage.getPositions(3000)
        console.log(pos)

        let answ = await helpers.hasDuplicates(pos)

        expect (answ).toBe(false)
    });


    xit('Check the Items qty in the Cart', async () => {
        //HomePage.open()

        await HomePage.addItemToCart_Firefox(2)
        await HomePage.closeCart()
        await HomePage.addItemToCart_Firefox(3)
        await HomePage.closeCart()
        await expect (await HomePage.qtyItemsCart).toBe('2')  //Здесь был баг что следующий addItemToCart не срабатывал, исправлено в методе closeCart

    });

    it('Check the Total Price', async () => {
        let firefox = process.env.firefox

        firefox ? await HomePage.addItemToCart_Firefox(5) : await HomePage.addItemToCart(5)
        await HomePage.closeCart()
        firefox ? await HomePage.addItemToCart_Firefox(1) : await HomePage.addItemToCart(1)
        await HomePage.closeCart()
        const itemPriceOne = +(await HomePage.getPriceOfItem(1)).replace(/[^0-9,.]/g,"")
        const itemPriceFifth = +(await HomePage.getPriceOfItem(5)).replace(/[^0-9,.]/g,"")
        const sumProducts = await helpers.sumPrices(itemPriceOne, itemPriceFifth)
        const priceCart = +(await HomePage.getPriceInCart()).replace(/[^0-9,.]/g,"")
        const shipping = +(await HomePage.shippingPrice).replace(/[^0-9,.]/g,"")
        const sumWithShipping = await helpers.sumPrices(shipping, sumProducts)
        expect (sumWithShipping).toBe(priceCart)
    });

    xit('Verify the Discount', async () => {
        //HomePage.open()
        const oldPrice = await HomePage.getOldPrice(5)
        const discount = await HomePage.getDiscount(5)
        const newPrice = helpers.calculateNewPrice(oldPrice, discount)
        //console.log(oldPrice, discount, newPrice)
        const checkPrice = (await HomePage.getPriceOfItem(5)).replace(/[^0-9,.]/g,"")
        expect (newPrice).toBe(checkPrice)
    });

    xit('Check the footer subscribing with valid emails', async () => {
        let valid = Emails.getValidEmails()
        for(key in valid){
            console.log(valid[key])
            await HomePage.enterEmailFooter(valid[key])
            await HomePage.alertPopUp.waitForExist({ timeout:9000, timeoutMsg:`Danger alert isn't displayed for email ${valid[key]}` })
            let answ = await HomePage.alertPopUp.getText()
            await expect(answ).toContain('successfully')
            //await browser.pause(2000)
        }
    })
});
