const books = document.querySelector(".books");
const bookTitle = document.querySelector(".book--title");
const bookCover = document.querySelector(".book--cover");
const bookAuthor = document.querySelector(".book--author");
const bookPrice = document.querySelector(".book--price");
const bookDecs = document.querySelector(".book--desc");
const cartNav = document.querySelector(".nav-cart");
const float = document.querySelector(".float");

async function getData() {
  const response = await fetch("./bookInfo/books.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  console.log(data);

  data
    .map((item) => {
      books.innerHTML += `
     <div class="book--container droptarget " >
     <img src="${item.imageLink}" class="book--cover img" />
     <div book--text-container>
        <h3 class="book--title" draggable="true" id="dragtarget">${item.title}</h3>
        <p class="book--author"><strong>${item.author}</strong></p>
        <p class="book--price">Price: $${item.price}</p>
        <button id="modalBtn" class="btn-hipster btn modalBtn">Show more</button>
        <button class="btn cartBtn">Add to cart</button>
        <div class="modal" id="modal">
        <div  class="modal-content">
        <span class="close">&times;</span>
        <p class="book--desc">${item.description}</p>
        </div>
        </div>
     </div>
      `;
    })
    .join("");

  // cart items
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", getItems);
  } else {
    getItems();
  }
  function getItems() {
    const removeCartItemButtons = document.querySelectorAll(".btn-danger");
    console.log(removeCartItemButtons.length);
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      const button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartItem);
    }

    const quantityInputs = document.querySelectorAll(".cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
    }

    const addToCartButtons = document.querySelectorAll(".cartBtn");
    for (let i = 0; i < addToCartButtons.length; i++) {
      const button = addToCartButtons[i];
      button.addEventListener("click", addToCartClicked);
    }

    document
      .querySelectorAll(".btn-purchase")[0]
      .addEventListener("click", purchaseClicked);
  }

  function purchaseClicked() {
    alert("Thank you for your purchase. Happy Shopping!");
    const cartItems = document.querySelectorAll(".cart-items")[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }

  function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }

  function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

  function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement.parentElement;

    console.log(shopItem);
    const title = shopItem.querySelectorAll(".book--title")[0].innerText;
    const price = shopItem
      .querySelectorAll(".book--price")[0]
      .innerText.replace("Price: ", "");
    console.log(price);
    const imageSrc = shopItem.querySelectorAll(".book--cover")[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
  }

  function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    const cartItems = document.querySelectorAll(".cart-items")[0];
    const cartItemNames = cartItems.querySelectorAll(".cart-item-title");
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        alert(
          "This item is already added to the cart. Thank you for choosing this."
        );
        return;
      }
    }
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .querySelectorAll(".btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .querySelectorAll(".cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  }

  function updateCartTotal() {
    const cartItemContainer = document.querySelectorAll(".cart-items")[0];
    const cartRows = cartItemContainer.querySelectorAll(".cart-row");
    console.log(cartRows);
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      console.log(cartRow);
      const priceElement = cartRow.querySelectorAll(".cart-price")[0];
      console.log(priceElement);
      const quantityElement = cartRow.querySelectorAll(
        ".cart-quantity-input"
      )[0];
      console.log(quantityElement);
      const price = parseFloat(priceElement.innerText.replace("$", ""));
      console.log(price);
      const quantity = quantityElement.value;
      console.log(quantity);
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
    console.log(total);
  }
}
getData();

function responsiveNav() {
  const nav = document.querySelector("#nav");
}

// date in form
const dateInForm = document.getElementById("delivery-date");
function dateDefault() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  dateInForm.valueAsDate = currentDate;
}
dateInForm.addEventListener("click", dateDefault());

// modal
const modalContainer = document.querySelector(".books");

console.log(modalContainer);

let count = 0;
modalContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("modalBtn")) {
    const modal = modalContainer.querySelector(".modal");
    const span = modalContainer.querySelector("span");
    //  show the modal
    modal.style.display = "block";
    // when click on (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
    // when click outside the modal, close it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }
  if (e.target.classList.contains("cartBtn")) {
    // add to cart
    const cartBtn = modalContainer.querySelector(".cartBtn");
    console.log(cartBtn);
    console.log(cartNav);
    console.log(cartNav.textContent);
    count++;
    const currentNavContent = "Cart";
    cartNav.textContent = currentNavContent + " (" + count + ")";
  }
  // drag and drop
  document.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.className == "droptarget") {
      const data = event.dataTransfer.getData("Text");
      event.target.appendChild(document.getElementById(data));
    }
  });
});

// // cart items
// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   getItems();
// }
// function getItems() {
//   const removeCartItemButtons = document.querySelectorAll(".btn-danger");
//   console.log(removeCartItemButtons.length)
//   for (let i = 0; i < removeCartItemButtons.length; i++) {
//     const button = removeCartItemButtons[i];
//     button.addEventListener("click", removeCartItem);
//   }

//   const quantityInputs = document.querySelectorAll(".cart-quantity-input");
//   for (let i = 0; i < quantityInputs.length; i++) {
//     const input = quantityInputs[i];
//     input.addEventListener("change", quantityChanged);
//   }

//   const addToCartButtons = document.querySelectorAll(".cartBtn");
//   for (let i = 0; i < addToCartButtons.length; i++) {
//     const button = addToCartButtons[i];
//     button.addEventListener("click", addToCartClicked);
//   }

//   document
//     .querySelectorAll(".btn-purchase")[0]
//     .addEventListener("click", purchaseClicked);
// }

// function purchaseClicked() {
//   alert("Thank you for your purchase");
//   const cartItems = document.querySelectorAll(".cart-items")[0];
//   while (cartItems.hasChildNodes()) {
//     cartItems.removeChild(cartItems.firstChild);
//   }
//   updateCartTotal();
// }

// function removeCartItem(event) {
//   const buttonClicked = event.target;
//   buttonClicked.parentElement.parentElement.remove();
//   updateCartTotal();
// }

// function quantityChanged(event) {
//   const input = event.target;
//   if (isNaN(input.value) || input.value <= 0) {
//     input.value = 1;
//   }
//   updateCartTotal();
// }

// function addToCartClicked(event) {
//   const button = event.target;
//   const shopItem = button.parentElement.parentElement;
//   const title = shopItem.querySelectorAll(".book--title")[0].innerText;
//   const price = shopItem.querySelectorAll(".book--price")[0].innerText;
//   const imageSrc = shopItem.querySelectorAll(".book--cover")[0].src;
//   addItemToCart(title, price, imageSrc);
//   updateCartTotal();
// }

// function addItemToCart(title, price, imageSrc) {
//   const cartRow = document.createElement("div");
//   cartRow.classList.add("cart-row");
//   const cartItems = document.querySelectorAll(".cart-items")[0];
//   const cartItemNames = cartItems.querySelectorAll(".cart-item-title");
//   for (let i = 0; i < cartItemNames.length; i++) {
//     if (cartItemNames[i].innerText == title) {
//       alert("This item is already added to the cart");
//       return;
//     }
//   }
//   const cartRowContents = `
//         <div class="cart-item cart-column">
//             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//             <span class="cart-item-title">${title}</span>
//         </div>
//         <span class="cart-price cart-column">${price}</span>
//         <div class="cart-quantity cart-column">
//             <input class="cart-quantity-input" type="number" value="1">
//             <button class="btn btn-danger" type="button">REMOVE</button>
//         </div>`;
//   cartRow.innerHTML = cartRowContents;
//   cartItems.append(cartRow);
//   cartRow
//     .querySelectorAll(".btn-danger")[0]
//     .addEventListener("click", removeCartItem);
//   cartRow
//     .querySelectorAll(".cart-quantity-input")[0]
//     .addEventListener("change", quantityChanged);
// }

// function updateCartTotal() {
//   const cartItemContainer = document.querySelectorAll(".cart-items")[0];
//  const cartRows = cartItemContainer.querySelectorAll(".cart-row");
//   let total = 0;
//   for (let i = 0; i < cartRows.length; i++) {
//     const cartRow = cartRows[i];
//     const priceElement = cartRow.querySelectorAll(".cart-price")[0];
//     const quantityElement = cartRow.querySelectorAll(
//       ".cart-quantity-input"
//     )[0];
//     const price = parseFloat(priceElement.innerText.replace("$", ""));
//     const quantity = quantityElement.value;
//     total = total + price * quantity;
//   }
//   total = Math.round(total * 100) / 100;
//   document.querySelectorAll(".cart-total-price")[0].innerText =
//     "$" + total;
// }
