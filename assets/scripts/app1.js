//Product class to create objects and each object title,image,price,desc
class Product {
  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = desc;
  }
}
//ProductList class => to create list of products and inject the list into the body using
class ProductList {
  products = [new Product("title", "image", 99, "description")];

  render() {
    const productList = document.createElement("ul");
    //add style to this new element
    productList.className = "product-list";
    for (const prod of this.products) {
      const productEl = new ProductItem(prod).render();

      productList.append(productEl);
    }
    return productList;
  }
}
//Product Item class to pass product from product list to this class and add logic for every item in the arry to avoid redduncdy and to add reusablitit so create multiple object with differnet data and same structure then inject them into the unorderd list
class ProductItem {
  constructor(product) {
    //add prop to this class for the first time in the constructor
    this.product = product;
  }
  addToCartHandler() {
    App.addProduct(this.product);
  }
  render() {
    const productEl = document.createElement("li");
    productEl.className = "product-item";
    productEl.innerHTML = `
  <div>
   <img src="${this.product.imageUrl}" alt="${this.product.title}"/>
   <div class="product-item__content">
    <h2>${this.product.title} </h2>
    <h3>\$${this.product.price}</h3>
    <p>${this.product.description}</p>
    <button id='add-to-cart-btn' >Add to cart</button>
   </div>
  </div>`;
    const addToCartBtn = productEl.querySelector("#add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      this.addToCartHandler();
    });

    return productEl;
  }
}
class ShoppingCart {
  items = [];
  //get return totalAmount by using
  get totalAmount() {
    const sum = this.items.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
    return sum;
  }
  set cartItems(value) {
    this.items = value; //here the value is the updated array of products
    this.totalOutput.innerHTML = `<h2 id='total-out'>Total :${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
  render() {
    const cartEl = document.createElement("section");
    cartEl.className = "cart";
    cartEl.innerHTML = `
    <h2 id='total-out'>Total</h2>
    <button>Order Now!</button>`;
    this.totalOutput = cartEl.querySelector("#total-out");
    return cartEl;
  }
}
class Shop {
  render() {
    const renderHook = document.getElementById("app");
    const productList = new ProductList().render();
    this.cartEl = new ShoppingCart();
    const cart = this.cartEl.render();
    renderHook.append(cart);
    renderHook.append(productList);
    return this;
  }
}




class App {
  static cart;
  static init() {
    const shop = new Shop().render();

    this.cart = shop.cartEl;
    return shop;
  }
  static addProduct(product) {
    this.cart.addProduct(product);
  }
}
App.init();
