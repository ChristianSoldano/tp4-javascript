"use strict"

class Product {
    constructor(id, name, description, price, img) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.img = img;
    }
}

class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    getSubTotal() {
        return this.product.price * this.quantity;
    }
}

const productList = [
    new Product(1, "Rutini Cabernet Malbec", "Caja de seis botellas de Rutini Malbec 750ml", 5500, "resources/img/caja-rutini.jpg"),
    new Product(2, "Nicasia Malbec Blend", "Caja de seis botellas de Nicasia Malbec Blend 750ml", 3060, "resources/img/vino-nicasia.jpg"),
    new Product(3, "Los Intocables Malbec", "Caja de seis botellas de Los Intocables Malbec 750 ml", 3450, "resources/img/vino-los-intocables.jpg"),
    new Product(4, "Johnnie Walker Black Label", "Whisky johnnie walker Black Label 1000ml", 3870, "resources/img/johnnie-walker.jpg"),
    new Product(5, "Macallan Fine Oak 12 Años", "Whisky Macallan Fine Oak 12 Años 700ml", 7999, "resources/img/the-macallan.jpg"),
    new Product(6, "Chivas Regal 12 Años", "Whisky Chivas Regal 12 Años 1000ml", 2900, "resources/img/chivas-regal.jpg"),
    new Product(7, "Tequila Patron Silver", "Tequila Patron Silver 750ml", 4999, "resources/img/silver-patron.jpg"),
    new Product(8, "Havana Club Maestros", "Ron Havana Club Seleccion Maestros 750ml", 6030, "resources/img/havana-club.jpg"),
    new Product(9, "Gin Hendrick's", "Gin Hendrick's 700ml", 5480, "resources/img/gin-hendricks.jpg")
]

var cartList = [];
var total = 0;
window.onload = renderProductList(productList);
var totalModal = document.getElementById('total-modal');
document.getElementById("finishButton").addEventListener("click", () => {
    executeSweetAlert();
});

function createItemCard(item) {
    const divCol = document.createElement('div');
    divCol.classList.add("col-lg-4", "d-flex", "align-items-stretch", "mb-4");

    const divCard = document.createElement('div');
    divCard.classList.add("card", "h-100");

    const imgElement = document.createElement('img');
    imgElement.className = "card-img-top";
    imgElement.src = item.img;

    const divCardBody = document.createElement('div');
    divCardBody.className = "card-body";

    const cardTitle = document.createElement('h4');
    cardTitle.className = "card-title";
    cardTitle.appendChild(document.createTextNode(item.name));

    const pDescription = document.createElement('p');
    pDescription.classList.add("card-text", "font-weight-light");
    pDescription.appendChild(document.createTextNode(item.description));

    const h3Price = document.createElement('h3');
    h3Price.classList.add("font-weight-normal", "mb-3");
    h3Price.appendChild(document.createTextNode("$" + item.price));

    const addCartButton = document.createElement('button');
    addCartButton.type = "button";
    addCartButton.classList.add("btn", "btn-success", "btn-block");
    const cartIcon = document.createElement('span');
    cartIcon.classList.add("fa", "fa-shopping-cart", "mr-3");
    addCartButton.appendChild(cartIcon);
    addCartButton.appendChild(document.createTextNode("Añadir al carrito"));
    addCartButton.addEventListener("click", () => {
        addItemToCart(item)
    });

    divCardBody.appendChild(cardTitle);
    divCardBody.appendChild(pDescription);
    divCardBody.appendChild(h3Price);
    divCardBody.appendChild(addCartButton);

    divCard.appendChild(imgElement);
    divCard.appendChild(divCardBody);

    divCol.appendChild(divCard);

    return divCol;
}

function addItem(item) {
    const divItemList = document.getElementById('article-list');
    divItemList.appendChild(createItemCard(item));
}

function renderProductList(productList) {
    productList.forEach(product => {
        addItem(product);
    });
}

function createCartElement(item, quantity) {
    const span = document.createElement('span');
    span.classList.add("list-group-item", "item");

    const row = document.createElement('div');
    row.className = "row";

    const divCol1 = document.createElement('div');
    divCol1.className = "col-3";

    const img = document.createElement('img');
    img.width = "70";
    img.height = "50";
    img.src = item.img;
    img.className = "mr-2";
    divCol1.appendChild(img);

    const divCol2 = document.createElement('div');
    divCol2.classList.add("col-9", "item");
    divCol2.appendChild(document.createTextNode(item.name));
    divCol2.appendChild(document.createElement('br'));
    divCol2.appendChild(document.createTextNode("Cantidad: " + quantity));

    const deleteButton = document.createElement('button');
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-sm", "btn-danger", "ml-2");
    deleteButton.appendChild(document.createTextNode("X"));
    deleteButton.addEventListener("click", () => {
        deleteItemFromCart(item);
    });

    divCol2.appendChild(deleteButton);

    row.appendChild(divCol1);
    row.appendChild(divCol2);

    span.appendChild(row);

    return span;
}

function addItemToCart(item) {

    let oldCartItem = cartList.find(element => element.product.id == item.id);

    if (oldCartItem != undefined) {
        oldCartItem.quantity++;
    } else {
        cartList.push(new CartItem(item, 1));
    }
    renderCart();
}

function deleteItemFromCart(item) {
    for (var i = 0; i < cartList.length; i++) {
        if (cartList[i].product.id == item.id) {
            cartList.splice(i, 1);
        }
    }
    renderCart();
}

function renderCart() {
    const divItemList = document.getElementById("cart-items");
    divItemList.innerHTML = "";
    total = 0;
    cartList.forEach(element => {
        divItemList.appendChild(createCartElement(element.product, element.quantity));
        total = total + element.getSubTotal();
    });
    if (cartList.length > 0) {
        document.getElementById('total').innerHTML = "Total: $" + total;
        document.getElementById('finishButton').hidden = false;
    } else {
        document.getElementById('total').innerHTML = "";
        document.getElementById('finishButton').hidden = true;
    }

}

function executeSweetAlert() {
    Swal.fire({
        title: 'Compra Finalizada!',
        html: 'Gracias por comprar en Vineria UTN Mar del Plata <br>El total de la compra es de $<strong>' + total + '</strong>',
        icon: 'success'
    })
}