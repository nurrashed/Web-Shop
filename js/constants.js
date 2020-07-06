const action = {
  UNKNOWN: 0,
  CATEGORY: 1,
  SEARCH: 2,
  FAVORITES: 3,
  CART: 4
};
const productSearch = document.getElementById("product-search");
let lastAction = action.UNKNOWN;
let firstCategoryId = 0;
let selectedCategoryId = 1;
//let searchTerm = "";
let searchTerm = '';
let baseUrl = "https://localhost:5001/api/";
//let baseUrl = "https://localhost:44397/api/";
