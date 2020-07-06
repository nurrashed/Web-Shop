let categoryUlLoaded = false;
//const ulOnClick = document.getElementById('categories');
//4c
ulOnClick = (event) => {
    try {
         const categoryId = event.target.getAttribute('categoryId');
        
       if(categoryId!=undefined){
            selectedCategoryId=categoryId;
           loadCategoryProducts(categoryId);
       }
    }
    catch(err){ console.log("loadCategoryProducts: ERROR", err, event);}
}

loadCategories = async () => {
    try {
        if(categoryUlLoaded==false)
        {
            const categories = document.getElementById('categories');
            categories.onclick = ulOnClick;
            const result = axios.get('http://localhost:5000/api/categories');
            const {data:productCategories}= await result;
            categories.innerHTML='';
            [...productCategories].forEach(category => {
                //console.log(category);
                    categories.innerHTML += `<li categoryId='${category.id}'>
                    <span class="d-flex align-items-center nav-link-inline py-3 cursor-pointer" categoryId='${category.id}'>
                    <i class="text-primary mr-2 mt-1 fas fa-hdd" categoryId='${category.id}'></i>
                    <span categoryId='${category.id}'>${category.name}</span></span>
                </li>`
                //categories.innerHTML += `<li id='categoryId'>${category.name}</li>`
            });
            categoryUlLoaded = true;
            
            firstCategoryId = productCategories[0].id;
            loadCategoryProducts(firstCategoryId);
        } 
     
    }
    catch(err){ console.log("loadCategoryProducts: ERROR", err);}
}