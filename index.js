const books = document.querySelector(".books");
const bookTitle = document.querySelector(".book--title");
const bookCover = document.querySelector(".book--cover");
const bookAuthor = document.querySelector(".book--author");
const bookPrice = document.querySelector(".book--price");
const bookDecs = document.querySelector(".book--desc");
const cartNav = document.querySelector(".nav-cart");

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
     <div class="book--container">
     <img src="${item.imageLink}" class="book--cover img" />
     <div book--text-container>
        <h3 class="book--title">${item.title}</h3>
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
    const currentNavContent = "Cart"
    cartNav.textContent = currentNavContent + " (" + count + ")";
   
  }
});
