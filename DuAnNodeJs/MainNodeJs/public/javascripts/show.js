const showCart = document.getElementById("showCartSp");
const tongTT = document.getElementById("tongTT");

const products = [];
function dispCartItem() {
  let html = "";
  let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
  cartItem.forEach((item) => {
    html += `
      <div class="container">
      <div class="row">
        <div class="col-xl-2">
          <img src="${item.image}" alt="" style="height: 60px">
        </div>
        <div class="col-xl-2">
          <h3>${item.name}</h3>
        </div>
        <div class="col-xl-2">
          <h3>${item.price}</h3>
        </div>
        <div class="col-xl-2">
          <h3>${item.quantity}</h3>
        </div>
        <div class="col-xl-2">
          <h3>${item.totalPrice}</h3>
        </div>
        <div class="col-xl-2">
          <button class="reoveItem">Xóa</button>
        </div>
      </div>
    </div>
      `;
  });
  showCart.innerHTML = html;
}
dispCartItem();

const removeItem = document.getElementsByClassName("reoveItem");
for (var i = 0; i < removeItem.length; i++) {
  let removeBtn = removeItem[i];
  removeBtn.addEventListener("click", () => {
    let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
    cartItem.forEach((item) => {
      if (
        item.name !=
        event.target.parentElement.parentElement.children[1].children[0]
          .textContent
      ) {
        products.push(item);
      }
    });
    localStorage.setItem("prdInCart", JSON.stringify(products));
    window.location.reload();
  });
}

function cartPrice() {
  let subTotal = 0;
  let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
  cartItem.map((item) => {
    subTotal = item.totalPrice += subTotal;
  });
  tongTT.textContent = subTotal;
}
cartPrice();

