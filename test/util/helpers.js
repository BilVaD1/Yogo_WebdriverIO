class helpers {

//Check duplicates in arr
async hasDuplicates(arr) {
    const answ =  new Set(await arr).size !== arr.length; //Создаем новый Set и проверяем его размер(если два елемента одинаковые, они считаются как один) и сравниваем с обычной длинной arr
    if (answ) {
        console.log("Duplicate elements found.");
    }
    else {
        console.log("No Duplicates found.");
    }
    return answ
}

calculateNewPrice(price, discount){
    this.price = +price.replace(/[^0-9,.]/g,"") //Находим в строке только числа, также десятичные. И преобразуем строку в число
    this.discount = +discount.replace(/[^0-9]/g,"") //Находим в строке только числа. И преобразуем строку в число
    const discountAmount = this.price / 100 * this.discount
    const newPrice = this.price - discountAmount
    //console.log(this.price, this.discount)
    return newPrice.toFixed(2)
}

sumPrices(){
    arguments.reduce = [].reduce;
    return arguments.reduce(function(a, b) {
        return a + b;
    });
}


}

module.exports = new helpers();