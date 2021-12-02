// const btn = document.getElementsByClassName("addToCart");
// const btn = document.getElementById('add')

// console.log(btn);

// const products = [];

// for (var i = 0; i < btn.length; i++) {
//   let cartBtn = btn[i];
//   cartBtn.addEventListener("click", () => {
//     let product = {
//       image:
//         event.target.parentElement.parentElement.children[0].src,
//       name: event.target.parentElement.parentElement.children[1].children[0]
//         .textContent,
//       price:
//         event.target.parentElement.parentElement.children[1].children[1]
//           .textContent,
//       totalPrice: parseInt(
//         event.target.parentElement.parentElement.children[1].children[1]
//           .textContent
//       ),
//       quantity: 1,
//     };
//     addItemToLocal(product);
//   });
// }

// function addItemToLocal(product) {
//   let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
//   if (cartItem === null) {
//     products.push(product);
//     localStorage.setItem("prdInCart", JSON.stringify(products));
//   } else {
//     cartItem.forEach((item) => {
//       if (product.name == item.name) {
//         product.quantity = item.quantity += 1;
//         product.totalPrice = item.totalPrice += product.totalPrice;
//       } else {
//         products.push(item);
//       }
//     });
//     products.push(product);
//   }
//   localStorage.setItem("prdInCart", JSON.stringify(products));
//   window.location.reload();
// }

function cartNumberDisplay() {
  let cartNumbers = 0;
  let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
  cartItem.forEach((item) => {
    cartNumbers = item.quantity += cartNumbers;
  });
  document.querySelector(".shopingCart").textContent = cartNumbers;
}
cartNumberDisplay();







