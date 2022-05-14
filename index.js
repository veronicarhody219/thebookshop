const books = document.querySelector(".books");
const bookTitle = document.querySelector(".book--title");
const bookCover = document.querySelector(".book--cover");
const bookAuthor = document.querySelector(".book--author");
const bookPrice = document.querySelector(".book--price");
const bookDecs = document.querySelector(".book--desc");

async function getData() {
  const response = await fetch("http://localhost:8080/bookInfo/books.json", {
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
        <button class="btn">Add to card</button>
        <p class="book--desc hide">${item.description}</p>
        </div>
     </div>
      `;
      // bookTitle.textContent = item.title;
      // bookCover.src = item.imageLink;
      // bookAuthor.textContent = item.author;
      // bookPrice.textContent = "$" + item.price;
      // bookDecs.textContent = item.description;
    })
    .join("");
}
getData();

function responsiveNav() {
  const nav = document.querySelector("#nav");
}
