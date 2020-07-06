function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("data-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("data-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();

      xhttp.onloadend = function () {
        // Call function that loads the customers into the drop-down
        if(file.includes('nav-middle'))
          getCustomers();
          //search();
        
        // Call function that loads the product categories
        if(file.includes('home-categories'))
          loadCategories();

          if(file.includes('home-products'))
          loadCategoryProducts();
      }

      /*exit the function:*/
      return;
    }
  }
};