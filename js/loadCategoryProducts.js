//4a
createProductCard = (product) => {
    try {
        //console.log('createProductCard', product);
        let heart= product.isFavorite ? "./icons/favorite-24px.svg" : "./icons/favorite_border-24px.svg" ;
        
                return  `<div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${product.imageUrl}" class="card-img" alt="Product Name">
                            <span class="product-sale-label badge badge-success no-border-radius">${product.percentOff}</span>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <span class="product-category text-muted">${product.category}</span>
                                <p class="product-category text-muted">${product.price}</p>
                                <p class="card-text">${product.description}</p>
        
                                <a productId="${product.id}" class="wishlist-btn product-btn ml-2" href="#" onclick="favorite(event, ${product.id})">
                                    <img src="${heart}" alt="Wishlist">
                                    <span class="sr-only">Wishlist</span>
                                </a>
        
                                <span class="product-footer">
                                    <span class="product-buttons">
                                        <a productId="${product.id}" class="product-btn" href="#" onclick="addToCart(1)">
                                            <img src="./icons/add_shopping_cart-24px.svg" alt="Shopping cart">
                                            <span class="sr-only">Shopping Cart</span>
                                        </a>
                                        <a productId="${product.id}" class="product-btn" href="#">
                                            <img src="./icons/compare_arrows-24px.svg" alt="Compare products">
                                            <span class="sr-only">Compare</span>
                                        </a>
                                    </span>
                                    <span class="product-stars">
                                        <span class="product-review-median">4</span>
                                        <img src="./icons/star_border-24px.svg" alt="Review Result">
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    catch(err){ console.log("createProductCard: ERROR", err, product);}
}
//4b
loadCategoryProducts = async (categoryId) => {
    try {
        if(categoryId>0){
            const products= document.getElementById('products');
            if(products!=undefined && localStorageKeyExist('CustomersId')){
                
                lastAction = action.CATEGORY;
                selectedCategoryId = categoryId;
                const result = axios.get(`http://localhost:5000/api/categories/${categoryId}/products?customerId=${localStorage.CustomersId}`);         
                const { data: apiProducts } = await result; 
                products.innerHTML = '';
                [...apiProducts].forEach(product => {

                    products.innerHTML += createProductCard(product);
                    
                });
            }
        }
       
    }
    catch(err){ console.log("loadCategoryProducts: ERROR", err, categoryId);}
}

