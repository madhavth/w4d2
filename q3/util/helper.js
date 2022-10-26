module.exports = (request) => {

    let numOfItems = 0, totalPrice = 0;

    for (let key in request.session.cart) {
        numOfItems += request.session.cart[key].quantity;
        totalPrice += request.session.cart[key].quantity * request.session.cart[key].price; 
    }
    
    console.log(numOfItems, totalPrice);
    return {numOfItems, totalPrice};
}