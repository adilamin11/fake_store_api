document.addEventListener("DOMContentLoaded", () => {//i use dom and event listner 
    const productList = document.getElementById("product-list");
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
  
    // Fetch produts from Fake Store API
    fetch("https://fakestoreapi.com/products")//fetch products 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();//This code fetches product data from the API, checks if the response is successful, and, if so, converts the data to JSON; otherwise, it throws an error.
      })
      .then((data) => {//handles successful responses and processing.
        loading.style.display = "none";
        displayProducts(data);// promises
      })
      .catch((err) => {//handles errors, ensuring the page informs users if fetching fails.
        loading.style.display = "none";
        error.textContent = err.message;
      });
  
    function displayProducts(products) {
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
  
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="product-image" />
          <h2 class="product-title">${product.title}</h2>
          <p class="product-price">$${product.price}</p>
          <div class="product-rating">${getRatingStars(product.rating.rate)}</div>
        `;
  
        productList.appendChild(productCard);
      });
    }
  
    function getRatingStars(rating) {
      return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));//usse math This is useful for displaying a star rating without decimals.
    }
  });
  