//6a
getFavorites = async (event) => {
    try {
        if(event.type=='click'){
            event.preventDefault();
            const products = document.getElementById("products");
            if(products!=undefined && localStorageKeyExist("CustomersId")){
                lastAction = action.FAVORITES;
                const result = axios.get(`http://localhost:5000/api/favorites?customerId=1`
                  );
          
                  const { data: apiProducts } = await result;
                  products.innerHTML = '';
                  //console.log('search', apiProducts);
                  apiProducts.forEach(product => {
                    products.innerHTML += createProductCard(product);
                    //let card = createProductCard(product);
                  });
            }
        }
    }
    catch(err){
        console.log("getFavorites: Error", err, event);
    }
}
//6b
favorite = async (event, productId) => {
    try {
        if(productId > 0){
            
            event.preventDefault();
            const products = document.getElementById("products");
            if(products!=undefined && localStorageKeyExist("CustomersId")){
                const result = axios.put(`http://localhost:5000/api/favorites?productId=${productId}&customerId=${localStorage.CustomersId}&returnData=${lastAction}& categoryId=${selectedCategoryId}&searchTerm=${searchTerm}`
                );
                
                const { data: apiProducts } = await result;
                //console.log(productId);
                  console.log('favorite', apiProducts);
                  products.innerHTML = '';
                  apiProducts.forEach(product => {
                    products.innerHTML += createProductCard(product);
                    //let card = createProductCard(product);
                  });
            }
        }
    }
    catch(err){
        console.log("favorite: Error", err, event, productId);
    }
}