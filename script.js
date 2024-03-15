import { products } from "./product.js";

// select DOM elements
const productsWrapper = document.getElementById("products-wrapper");
const checkboxes = document.querySelectorAll(".check")
const filtersContainer = document.getElementById("filters-container")
const searchInput = document.getElementById("search")
const cartCount = document.getElementById("cart-count")

const cartIcon = document.querySelector(".cart-icon")
const resetSearchIcon = document.querySelector(".reset-search")

resetSearchIcon.onclick = function () {
  searchInput.value = "";
  filterProducts();
}

// if (localStorage.getItem("product")) {
//   localStorage.getItem("product")
// }

localStorage.setItem("products", JSON.stringify(products))

let storedProducts = JSON.parse(localStorage.getItem("products"));


// init cart item count
let cartItemCount = 0;


// init product element array
const productElements = [];



// filtering checkboxes and search input
filtersContainer.addEventListener("change", filterProducts)
searchInput.addEventListener("input", filterProducts)

products.forEach((product) => {
  const productElement = createProductElement(product);
  productElements.push(productElement)
  productsWrapper.appendChild(productElement)

})

function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.className = "space-y-2 item"

  productElement.innerHTML = `
    <div class="relative flex justify-center overflow-hidden bg-gray-100 border cursor-pointer group rounded-xl">
            <img src="${product.url}" alt="${product.name}" class="object-cover w-full h-full">
            <button
              class="absolute bottom-0 left-0 right-0 py-2 text-white transition translate-y-full bg-black group-hover:translate-y-0 status">Add
              To
              Cart</button>
          </div>
          <p class="text-xl">${product.name}</p>
          <strong>${product.price.toLocaleString()}$</strong>
  `;

  productElement.querySelector('.status').addEventListener("click", updateCart);

  return productElement;
}

function updateCart(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains("added")) {
    statusEl.classList.remove("added")
    statusEl.innerText = "Add To Cart";
    statusEl.classList.remove("bg-red-600");
    statusEl.classList.add("bg-black");

    cartItemCount--;
  } else {
    statusEl.classList.add("added")
    statusEl.innerText = "Remove From Cart";
    statusEl.classList.remove("bg-black");
    statusEl.classList.add("bg-red-600");

    cartItemCount++;
  };

  cartCount.innerText = cartItemCount;

}

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const checkedCategories = Array.from(checkboxes).filter((check) => check.checked).map((check) => check.id);

  productElements.forEach((productElement, index) => {
    const product = products[index]

    console.log(product);
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category)

    if (matchesSearchTerm && isInCheckedCategory) {
      productElement.classList.remove("hidden")
    } else {
      productElement.classList.add("hidden")
    }
  });
}