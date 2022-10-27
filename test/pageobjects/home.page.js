const Page = require('./page');

class HomePage extends Page { 

    get Nav (){
        return $('header .nav')
    }

    getTelephone () {
       return $("span[class='shop-phone'] strong").getText()
    }

    async getNavBtns (index){
        let el = await $(`nav div:nth-child(${index})`)
        await el.waitForExist({timeout:2000, timeoutMsg:`${await el.getText()} is not present`})
        return el
    }

    getImages (){
        return $$('ul#homeslider li[class="homeslider-container"] a img')
    }

    getSliderImage (number){
        return $(`ul#homeslider li:nth-child(${number})`)
    }

    async getPositions (period){
        let positions = []
        let images = await (await this.getImages()).length
        for(let i=0; i<images; i++){
            positions.push(await browser.execute(()=>{
                return document.getElementById("homeslider").style.left
            }))
            await browser.pause(period)
        }
        return positions
    }

    getProduct (number){
        return $(`ul#homefeatured li:nth-child(${number})`)
    }

    getPriceOfItem (item){
        return this.getProduct(item).$("div[class='right-block'] span[class='price product-price']").getText()
    }

    getDiscount (item){
        return this.getProduct(item).$("div[class='right-block'] .price-percent-reduction").getText()
    }

    getOldPrice (item){
        return this.getProduct(item).$("div[class='right-block'] .old-price.product-price").getText()
    }

    async addItemToCart (number){
        let el = await $(`ul#homefeatured li:nth-child(${number})  a[title="Add to cart"]`)
        await el.waitForDisplayed({ timeout:8000, timeoutMsg:"The Btn of Item isn't displayed", interval:2000 })
        await el.click()
    }

    async addItemToCart_Firefox (number){
        let item = await $(`ul#homefeatured li:nth-child(${number})`)
        await item.scrollIntoView()
        await item.moveTo()
        let el = await item.$(`a[title="Add to cart"]`)
        await el.waitForDisplayed({ timeout:8000, timeoutMsg:"The Btn of Item isn't displayed", interval:2000 })
        await el.click()
    }

    get qtyItemsCart (){
        return $('.shopping_cart  .ajax_cart_quantity').getText()
    }

    get shippingPrice (){
        return $('.cart-prices .price.cart_block_shipping_cost.ajax_cart_shipping_cost').getText()
    }

    async openMiniCart (){
        const el = await $(".shopping_cart a[title='View my shopping cart']")
        await el.scrollIntoView()
        await el.moveTo()
        await $(".cart_block.block.exclusive").waitForDisplayed({ timeout:7000, timeoutMsg:"The expanded mini-Cart isn't displayed", interval:1000 })
    }

    async getPriceInCart (){ 
        await this.openMiniCart()
        //await browser.pause(5000)
        await $('#button_order_cart span').waitForClickable({ timeout:7000, timeoutMsg:"The checkout btn isn't clickable", interval:1000 })
        const price = await $('.cart-prices .price.cart_block_total.ajax_block_cart_total').getText()
        return price
    }

    async closeCart (){
        let cartPresent = await $('#layer_cart')
        await cartPresent.waitForDisplayed({ timeout:20000, timeoutMsg:"The Cart isn't displayed", interval:1000 })
        await $('.layer_cart_product span.cross').click()
        await cartPresent.waitForDisplayed({ timeout:7000, reverse:true, timeoutMsg:"The Cart isn't closeed", interval:1000 })
    }

    get inputEmailFooter (){
        return $('.inputNew.form-control.grey.newsletter-input')
    }

    get btnSendEmail (){
        return $("button[name='submitNewsletter']")
    }

    get alertPopUp (){
        return $(".alert")
    }

    async enterEmailFooter (mail){
        await this.inputEmailFooter.setValue(mail)
        await this.btnSendEmail.click()
    }

    changeTab (index){
        $(`#home-page-tabs li:nth-child(${index})`).click()
    }

    open () {
        super.open('index.php'); //Обращается через супер к классу родителю т.е. Page и использует path login, т.е. https://the-internet.herokuapp.com/login
    }
}

module.exports = new HomePage();