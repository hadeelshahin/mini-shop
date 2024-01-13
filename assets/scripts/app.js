//Product class
class Product {
  constructor(title, image, proce, desc) {
    this.title = title;
    this.imageUrl = image;
    this.price = proce;
    this.description = desc;
  }
}
//ProductItem class
class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCartHandler() {
    App.addProductToCart(this.product);
  }
  render() {
    const productElement = document.createElement("li");

    productElement.className = "product-item";
    productElement.innerHTML = `
      <div> 
        <img src="${this.product.imageUrl}" alt="${this.product.title}" />
        <div class="product-item__content">
          <h2>${this.product.title} </h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button id="add-to-cart-btn">  Add to cart  </button>
        </div>
      </div>`;
    const addToCartBtn = productElement.querySelector("#add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      this.addToCartHandler();
    }); //first this: refer to class scope function //second this: refer to item itself
    return productElement; // this.addToCart.bind(this)
  }
}
//Product List
class ProductList {
  products = [
    new Product(
      "Espresso Manual Coffee Machine50s Style",
      "https://bucket-smeg.4flow.cloud/OBJECTS/JPG%2072%20dpi/ECF01RDUK_16.jpg",
      566,
      "A great coffee machine is judged on the quality of its heating system and pump pressure. Using a sophisticated thermoblock heating system which allows for faster switch-on times and precise water temperature control for brewing, steam and hot water."
    ),

    new Product(
      "Blender 50s Style",
      "https://assets.4flow.cloud/BLF01PKUK_6.jpg?pEFs=cVY2M1MyN1ZOMFFadEQ5ZlVOMzhVMjQxLzduSXd1dFArbHptVmxhUjRhbjZvOVVqQnVRdlczdWZZVWlmaTJqamtSK1dHcGo3elMrWVdvNmI1TlB0eUo1NSszSy9IczFhQ3BtR2Z5MjBEYVpxcmtQbGhBVEkweW9JQWZSV05xS2RZdlNka3hGdk94b1lCWmZTUnhyN21BPT0",
      1089,
      "For a healthy fruit and yogurt smoothie for breakfast, to recuperate with a refreshing drink after a workout, or to prepare a quick and simple soup for lunch, Smeg blends ingredients of different textures to perfection, to accompany you throughout the day."
    ),
    new Product(
      "Stand mixer50s Style",
      "https://assets.4flow.cloud/SMF03BLUK_1.jpg?pEFs=cVY2M1MyN1ZOMFFadEQ5ZlVOMzhVelpnc3RzUkJnbUdKdjhRYzlRcHFUTHhNcDRTQWdhOEZudmdIMEdyRkxwVU96RFY0YmxWdVI2T3hTTDNhSDJ3cWlYcmxaRXlGbFBIanVBdnhsQTBuQURDNXJ5YlZ1Qk5DR1FuV2NTeXB6NkdjZEpvSDM1S0JnSWdLd1EzbDQxazhRPT0",
      899,
      "The Smeg Stand Mixer can assist you in every culinary endeavour, adding geniality and versatility to your recipes. Thanks to its standard accessories and the ones purchasable separately, you will be able to really show off your culinary skills! Your creativity has finally found its perfect companion."
    ),
    new Product(
      "Toaster50s Style",
      "https://assets.4flow.cloud/TSF01CHMUK_2.jpg?pEFs=cVY2M1MyN1ZOMFFadEQ5ZlVOMzhVNHE3dXEwbWZyZzV1SitnY09VTGNlUk5mSjFTYWQycytDM0NocTgyazFFNG1tbjROOFgvM2k1K2dLaXovVTZQeVhXeENnaC9PRFdXS2pqeEIxeXdHT1lnbUJSbzBjbC9TY3lUd0txbXp0RmdXOFluWVhNOFJHSDdvUE8xdmYwRjl3NjYzdTh3MGxMRkwyTURoUE8xTER3PQ",
      599,
      "The Smeg toaster combines ergonomics, functionality, and aesthetic balance. Breakfast, lunch, brunch, or snack - when you fall in love with the SMEG 50’s Style toaster, you’ll find every available excuse to use it."
    ),
  ];

  render() {
    const productsList = document.createElement("ul");
    productsList.className = "product-list";
    for (const prod of this.products) {
      const productElement = new ProductItem(prod).render(); //render will return the new object to append it

      productsList.append(productElement);
    }
    return productsList;
  }
}
class Components {
  constructor(renderHookId) {
    console.log("called");
    this.hookId = renderHookId;
  }
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttributes(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}
class elementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
//to create cart Element
class ShoppingCart extends Components {
  items = []; //field

  set cartItem(value) {
    this.items = value;
    this.outputTotal.innerHTML = `<h2 id='total-value'> Total : \$${this.totalAmount}</h2>`;
  }
  get totalAmount() {
    const sum = this.items.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
    return sum;
  }
  constructor(renderId) {
    super(renderId);
  }

  addProduct(product) {
    //this method accepts a product and should update the rendered cart
    //this method should update what we see on screen
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItem = updatedItems;
  }
  orderProductsHandler() {
    console.log("Ordering ...");
    console.log(this.items);
  }
  render() {
    const cartEl = this.createRootElement("section", "cart");
    //const cartEl = document.createElement("section");
    cartEl.className = "cart";
    cartEl.innerHTML = `
      
         <h2 id='total-value'> Total : \$${0}</h2>
         <button id='order-btn'> Order Now! </button>

     
    
    `;
    const orderBtn = cartEl.querySelector("#order-btn");
    orderBtn.addEventListener("click", () => {
      this.orderProductsHandler();
    });
    this.outputTotal = cartEl.querySelector("#total-value");
    // console.log(this.outputTotal);
    return cartEl;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    const productList = new ProductList().render();
    this.cart = new ShoppingCart("app"); // we store the refrence to the cart object in a property to be a property of Shop
    // const cartEl = this.cart.render();
    this.cart.render();

    //renderHook.append(cartEl);

    renderHook.append(productList);
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart; // we added a App cart property /// we did all of that to access
  }
  static addProductToCart(product) {
    this.cart.addProduct(product); /// we did all of that to access addProduct method in the shoppingcart by make an instance cart from shoppingCart
  }
}

App.init();
