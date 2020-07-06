let customersLoaded = false;
//1
getCustomers = async () => {
    try {
        if (customersLoaded==false){
            let personSelect = document.getElementById('person-select');
            const result = axios.get('http://localhost:5000/api/customers');
            const {data:customers}= await result;
            
            personSelect.innerHTML = '';
            customers.forEach(customer => {
                personSelect.innerHTML += `<option value="${customer.id}">${customer.email}</option>`;
            });
            localStorage.CustomersId = customers[0].id;
            customersLoaded = true;
            
        }
        basicCart();
    }
    catch(err){ console.log("getCustomers: ERROR", err); }
}
//8

onSelectedCustomer = (event) => {
    try {
        basicCartLoaded = false;
        localStorage.CustomersId = event.target.value;
        basicCart();
        console.log(firstCategoryId);
        
        loadCategoryProducts(firstCategoryId);

    }
    catch(err){ console.log("onSelectedCustomer: ERROR", err, event); }
}