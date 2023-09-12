// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemEl = document.querySelector(".totalItem");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const showCartEl = document.querySelector(".show-cart");

// RENDER PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <!-- Product Card Randring -->
       
             <div class="col">
                    <div class="card h-100 rounded-0 border-0"> <img src="${product.images[0].src}" class="shadow-sm card-img-top"
                    alt="${product.title}">
                        <!-- <div class="label-top shadow-sm">DELL</div> -->
                        <div class="card-body">
                            <div class="clearfix mb-3 fw-bold">
                                <span class="float-start ">${product.title}</span>
                                <span class="float-end price-hp"> <span>$</span> ${product.variants[0].price}</span>
                            </div>
                            <!-- <h5 class="card-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
                                quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit
                                ut. Saepe, iste optio laudantium sed aliquam sequi.
                            </h5> -->
                            
                            <!-- Choose color -->
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <span class="bg-info border-5 m-2 text-dark rounded-circle " data-bs-color="red"
                                        style="cursor: pointer; width: 20px; height: 20px;"></span>
                                    <span class="bg-primary border-5 m-2 text-dark rounded-circle "
                                        style="cursor: pointer; width: 20px; height: 20px;"></span>
                                    <span class="bg-secondary border-5 m-2 text-dark rounded-circle "
                                        style="cursor: pointer; width: 20px; height: 20px;"></span>
                                </div>
                            </div>

                            <!-- Choose Size -->
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="">
                                    <span class="btn btn-outline-dark  m-2 border border-1 border-dark  rounded-0 "
                                        style="cursor: pointer;">XS</span>
                                    <span class="btn btn-outline-dark m-2  border border-1 border-dark rounded-0 "
                                        style="cursor: pointer;">S
                                        </span>
                                    <span class="btn btn-outline-dark m-2  border border-1 border-dark rounded-0 "
                                        style="cursor: pointer;">M</span>
                                </div>
                            </div>
                            <div class="d-grid gap-2 my-2 w-100"> 
                                <a href="#" class="btn btn-outline-dark p-2 rounded-0" onclick="addToCart(${product.id})">Add to cart</a>
                            </div>

                            <!-- <div class="clearfix mb-1">
                                <span class="float-start">
                                    <i class="far fa-question-circle"></i>
                                </span> 
                                <span class="float-end"><i class="fas fa-plus"></i></span>
                            </div> -->
                        </div>
                    </div>
            

        `;
  });
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.variants[0].price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `$${totalPrice.toFixed(2)}`;
  totalItemEl.innerHTML = `(${totalItems} ITEM)`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <!--<div class="cart-item">
            <div class="item-info" >
                <img src="${item.images[0].src}" alt="${item.title}">
                <h4>${item.title}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.variants[0].price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
            <div class="total-price cursor-pointer" onclick="removeItemFromCart(${item.id})">
            <i class="fas fa-xmark" ></i>
            </div>

        </div> -->

        <div class="card border-0" style="width: 26.688rem; height: 10rem;">
                            <div class="card-body d-flex ">
                                <img src="${item.images[0].src}" style="width: 6.25rem; height: 6.25rem;" alt="${item.title}"
                                    srcset="">
                                <div class="col mx-4">
                                    <h5 class="card-title " style="font-size: 1rem;">${item.title}</h5>
                                    <p class="card-text"
                                        style="font: normal normal normal 14px/20px Nunito; color: #221F20; opacity: 1;">
                                        Color : Grey</p>
                                    <!-- Incriment decriment button  -->
                                    <div class="d-flex justify-content-between">
                                        <div class="btn-group ">
                                            <div class=" rounded-pill"
                                                style="background: #F6F6F6 0% 0% no-repeat padding-box;">
                                                <button type="button"
                                                    class="minus fw-bold border-0 rounded-2 btn btn-light btn-sm"
                                                    style="cursor: pointer;" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
                                                <span class="mx-2">${item.numberOfUnits}</span>
                                                <button type="button"
                                                    class="plus border-0 fw-bold rounded-2 btn btn-light btn-sm"
                                                    style="cursor: pointer;" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="total-price mx-4" style="cursor: pointer;"
                                        onclick="removeItemFromCart(${item.id})">
                                        <i class="fas fa-xmark"></i>
                                    </div>

                                    <div class="total-price mt-5">
                                        <p class="card-text fw-bold"> <small>$</small>${item.variants[0].price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}


// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// 
