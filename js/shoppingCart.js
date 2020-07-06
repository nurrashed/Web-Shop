let basicCartLoaded = false;
//2
displayBasicCart = (cart) => {
    try {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementsByClassName('cart-total');
        //if(cartCount===true){
         cartCount.innerHTML = cart.count;
        //}
        [...cartTotal].forEach(element => {
            
            element.innerHTML = cart.total;
        });
        localStorage.CartTotal= cart.total;
        basicCartLoaded = true;
        /* const result = axios.get('http://localhost:5000/api/customers');
        const {data:carts}= await result;
        carts.forEach(cart => {
            
        }); */
    }
    catch(err){
        console.log("dispayBasicCart: Error", err, cart);
    }
}

basicCart = async () => {
    try {
        if(basicCartLoaded==false && localStorageKeyExist('CustomersId')){
            const result = axios.get(`http://localhost:5000/api/BasicShoppingCart?customerId=${localStorage.CustomersId}`);
            const {data:carts}= await result;
            //console.log(carts);
        displayBasicCart(carts);
    }
    }
    catch(err){
        console.log("basicCart: Error", err);
    }
}
//7b
addToCart = async (productId) => {
    try {
        if(localStorage.CustomersId!=undefined){
            {
                const result = axios.post('http://localhost:5000/api/ShoppingCartProducts', { customerId: parseInt(localStorage.CustomersId), productId: parseInt(productId), count: 1});
                  const { data: carts } = await result;
                 
                  displayBasicCart(carts);
            }
        }
    }
    catch (err) {
        console.log("addToCart: Error", err, productId);
    }
}
//7a

createCartItem = (cartItem) => {
    try {
        let percentOff ='';
        if(cartItem.percentOff>0){
            percentOff =`<span class="product-sale-label badge badge-success no-border-radius">${cartItem.percentOff}%</span>`;
        }
        let totalPrice = 0;
        let  percentValue = 1-cartItem.percentOff/100;
        if(cartItem.percentOff == 0 && cartItem.count==1){
            totalPrice = `<h5 class="text-danger mt-4">$${cartItem.price}</h5>`;
        }else if (cartItem.percentOff > 0 && cartItem.count==1){
            totalPrice = `<h5 class="text-danger mt-4"> ${cartItem.price}* ${percentValue } = $${cartItem.price * percentValue }</h5>`;
        }else if(cartItem.percentOff > 0 && cartItem.count > 1){
            totalPrice = `<h5 class="text-danger mt-4"> ${cartItem.price} * ${percentValue } * ${cartItem.count}= $${cartItem.price * percentValue  * cartItem.count}</h5>`;
        }else if(cartItem.percentOff == 0 && cartItem.count > 1){
            totalPrice = `<h5 class="text-danger mt-4"> ${cartItem.price} * ${cartItem.count} = $${cartItem.price * cartItem.count}</h5>`;
        }

      return  `<div class="card border border-info mb-3 w-100">
        <div class="row no-gutters">
            <div class="col-md-2.5">
                <img src="${cartItem.imageUrl}" class="cart-card-img" alt="Product Name 1">
                ${percentOff}
            </div>
            <div class="col-md-9.5">
                <div class="card-body">
                    <h4 class="card-title">${cartItem.name}</h4>
                    <h6 class="text-muted">${cartItem.category}</h6>
                   <!-- <h5 class="text-danger mt-4">$300 x 2 x 90% = ${cartItem.price}</h5>-->
                    ${totalPrice}
                    <div class="cart-card-buttons mx-auto mx-sm-0 text-center text-sm-left"
                        style="max-width: 8rem;">
                        <div class="form-group mb-2 d-flex justify-content-start">
                            <label class="mr-2">Quantity</label>
                            <input class="form-control form-control-sm no-border-radius quantity" type="number"
                                min=1 value="${cartItem.count}" onchange="updateQuantity(event, ${cartItem.productId})">
                            <!-- updateQuantity(event, productId) -->
                        </div>
                        <button class="btn btn-outline-secondary btn-sm btn-block mb-2 no-border-radius"
                            type="button" onclick="updateCart(${cartItem.productId})">
                            <!-- updateCart(productId) -->
                            <i class="mr-1 fas fa-sync"></i>Update cart</button>
                        <button class="btn btn-outline-danger btn-sm btn-block mb-2 no-border-radius" type="button"
                            onclick="deleteProductFromCart(${cartItem.productId})">
                            <!-- deleteProductFromCart(productId) -->
                            <i class="mr-1 far fa-trash-alt"></i>Remove</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>`
    }
    catch(err) { console.log("createCartItem: ERROR", err, cartItem); }
}
//7a

displayCartItems = () => {
    try {
        const products= document.getElementById('products');
        products.innerHTML = '';
        if(products!=undefined && localStorageKeyExist("CustomersId")&& localStorageKeyExist("CartItems")){
           let cartItems = JSON.parse(localStorage.CartItems);
           cartItems.forEach(cart=>{
               products.innerHTML +=createCartItem(cart);
           })
           products.innerHTML +=`<h2>total: ${JSON.parse(localStorage.CartTotal)} </h2>`;

        }
    }
    catch(err) { console.log("displayCartItems: ERROR", err); }
}

loadCart = async () => {
    try {
        if(localStorage.CustomersId!=undefined){
            const result = axios.get(`http://localhost:5000/api/ShoppingCartProducts?customerId=${localStorage.CustomersId}`);
            const {data:apiproducts}= await result;
            localStorage.CartItems = JSON.stringify(apiproducts.products);
            localStorage.CartTotal = JSON.stringify(apiproducts.total);
            displayCartItems();
        }
    }
    catch(err) { console.log("loadCart: ERROR", err); }
}
//7c
updateQuantity = async (event, productId) => {
    try {
        if(productId > 0 && localStorageKeyExist("CartItems") && localStorageKeyExist("CustomersId")){
            const cartItems = JSON.parse(localStorage.CartItems);
            //let item = cartItems.filter(product=>product.productId==productId && product.customerId == localStorage.CustomersId)
            const index = cartItems.findIndex(product=>product.productId==productId && product.customerId == localStorage.CustomersId);
            cartItems[index].count = parseInt(event.target.value);
            localStorage.CartItems = JSON.stringify(cartItems);
           // basicCartLoaded = false;
            //basicCart();
            
        }
    }
    catch(err) { console.log("updateQuantity: ERROR", err, event, productId); }
}

updateCart = async (productId) => {
    try {
        if(productId > 0 && localStorageKeyExist("CartItems") && localStorageKeyExist("CustomersId")){
    
            
            let item = JSON.parse(localStorage.CartItems).filter(product=>product.productId==productId && product.customerId == localStorage.CustomersId); 
            if(item!=null){  
                
                const result = axios.put('http://localhost:5000/api/ShoppingCartProducts',...item);
                const {data:apiproducts}= await result;
               // console.log('jhjh', apiproducts);
               basicCartLoaded = false;
               basicCart();
               
            }
        }
    }
    catch (err) { console.log("UpdateCart: ERROR", err, productId); }
}
//7d
deleteProductFromCart = async (productId) => {
    try {
        if(productId > 0 && localStorageKeyExist("CartItems") && localStorageKeyExist("CustomersId")){
            const cartItems = JSON.parse(localStorage.CartItems);
            const index = cartItems.findIndex(product=>product.productId==productId && product.customerId == localStorage.CustomersId);
           // const deletedItem = cartItems[index];
            localStorage.CartItems = JSON.stringify(cartItems);
            const result = axios.delete(`http://localhost:5000/api/ShoppingCartProducts?customerId=${localStorage.CustomersId}&productId=${productId}`);
            const{data:apiproducts} = await result;
            displayBasicCart(apiproducts);
            cartItems.splice(index, 1);
            localStorage.CartItems = JSON.stringify(cartItems);
            displayCartItems();
        }
        
    }
    catch (err) { console.log("DeleteProductFromCart: ERROR", err, productId); }
}