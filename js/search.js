//5
search = async event => {
  try {
      event.preventDefault();
    products.innerHTML = "";
    console.log(event);
    if (event.type == "click" || event.key == "Enter") {
      const products = document.getElementById("products");
      const productSearch = document.getElementById("product-search");
      searchTerm = productSearch.value;

      if (
        products != undefined &&
        productSearch != undefined &&
        localStorageKeyExist("CustomersId")
      ) {
        lastAction = action.SEARCH;
        const result = axios.get(
          `http://localhost:5000/api/products/${searchTerm}?customerId=${localStorage.CustomersId}`
        );

        const { data: apiProducts } = await result;
        //console.log('search', apiProducts);
        apiProducts.forEach(product => {
          products.innerHTML += createProductCard(product);
          //let card = createProductCard(product);
        });
      }
    }
  } catch (err) {
    console.log("loadCategoryProducts: Error", err, event);
  }
};
