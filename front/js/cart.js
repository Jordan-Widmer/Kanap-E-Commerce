// Initialisation Récupération du panier dans le localStorage
let canapOnLocalStorage = JSON.parse(localStorage.getItem("products"));
const textEmptyCart = document.querySelector("#cart__items");

// Fonction qui affiche les produits dans le panier
function productCard() {
  if (localStorage.getItem("products")) {
    if (canapOnLocalStorage.length > 0) {
      canapOnLocalStorage.forEach((canap) => {
        document.getElementById("cart__items").innerHTML += `
          <article class="cart__item" data-id="${canap.id}" data-color="${canap.color}">
              <div class="cart__item__img">
                <img src="${canap.productImg}" alt=${canap.productAltImg}>
              </div>
              <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                      <h2>${canap.productName}</h2>
                      <p>${canap.productPrice} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                          <p>Qté : ${canap.color} </p>
                          <input  type="number" class="itemQuantity" id="${canap.id}" name="itemQuantity" min="1" max="100"  value=${canap.quantityProduct}>
                      </div>
                      <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                      </div>
                  </div>
              </div>
          </article>
        `;
      });
    } else {
      const emptyCart = `<p>Votre panier est vide</p>`;
      textEmptyCart.innerHTML = emptyCart;
    }
  } 
}

// Fonction du Changement de la quantité des produits
function productQuantity() {
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  itemQuantity.forEach((item) => {
    const itemCloset = item.closest("article");
    let newQuantity = "";
    const id = itemCloset.dataset.id;
    const colorItem = itemCloset.dataset.color;

    item.addEventListener("change", (e) => {
      e.preventDefault();
      newQuantity = Number(item.value);

      canapOnLocalStorage.forEach((canap) => {
        if (canap.id === id && canap.color === colorItem) {
          canap.quantityProduct = newQuantity;
        }
      });

      localStorage.setItem("products", JSON.stringify(canapOnLocalStorage));
      productTotalQuantity();
      productTotalPrice();
    });
  });
}

// Fonction de Suppression des produits
function productDelete() {
  let btnDelete = document.querySelectorAll(".deleteItem");

  for (let n = 0; n < btnDelete.length; n++) {
    btnDelete[n].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = canapOnLocalStorage[n].id;
      let colorDelete = canapOnLocalStorage[n].color;

      canapOnLocalStorage = canapOnLocalStorage.filter(
        (el) => el.id !== idDelete || el.color !== colorDelete
      );

      localStorage.setItem("products", JSON.stringify(canapOnLocalStorage));

      //Alerte produit supprimé et refresh
      alert("l'Article a été supprimé de Votre panier.");

      location.reload();
    });
  }
}

// Fonction d'affichage du prix total du panier
function productTotalPrice() {
  let total = 0;
  canapOnLocalStorage.forEach((canap) => {
    total =
      total + Number(canap.productPrice) * Number(canap.quantityProduct);
  });

  const totalPrice = document.getElementById("totalPrice");
  const htmlTotalPrice = `${total}`;
  totalPrice.innerHTML = htmlTotalPrice;
}

// Fonction d'affichage de la quantité du totals du Panier
function productTotalQuantity() {
  let quantityTotal = 0;

  canapOnLocalStorage.forEach((canap) => {
    quantityTotal = quantityTotal + Number(canap.quantityProduct);
  });

  const QuantityTotal = document.getElementById("totalQuantity");
  const quantityHTMLTotal = `${quantityTotal}`;
  QuantityTotal.innerHTML = quantityHTMLTotal;
}

productCard();
productQuantity();
productDelete();
productTotalPrice();
productTotalQuantity();

// Formulaire
// Contact Fonction et ecoute change Regex
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// funtion et change Prenom
function validFirstNameRegex(firstName) {
  let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$", "g");
  return validRegex(firstName, "prénom", nameRegExp);
}

firstName.addEventListener("change", (e) => {
  e.preventDefault();
  validFirstNameRegex(firstName);
});

// Fonction et change Nom
function validLastNameRegex(lastName) {
  let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$", "g");
  return validRegex(lastName, "nom", nameRegExp);
}

lastName.addEventListener("change", (e) => {
  e.preventDefault();
  validLastNameRegex(lastName);
});

// Fonction et change Adresse
function validAddressRegex(address) {
  let nameRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$","g");
  return validRegex(address, "adresse", nameRegExp);
}

address.addEventListener("change", (e) => {
  e.preventDefault();
  validAddressRegex(address);
});

// Fonction et change City
function validCityRegex(city) {
  let nameRegExp = new RegExp("^[a-zA-Z',.s-]{1,25}$", "g");
  return validRegex(city, "ville", nameRegExp);
}

city.addEventListener("change", (e) => {
  e.preventDefault();
  validCityRegex(city);
});

// Fonction et change Email
function validEmailRegex(email) {
  let nameRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?w+)*(\\.\\w{2,3})+$","g");
  return validRegex(email, "email", nameRegExp);
}

email.addEventListener("change", (e) => {
  e.preventDefault();
  validEmailRegex(email);
});

// Fonction ValideRegex. 
function validRegex(inputName, nameType, nameRegExp) {
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.nextElementSibling.innerHTML = "";
    return true;
  } else {
    inputName.nextElementSibling.innerHTML = "Veuillez renseigner votre " + nameType;
    return false;
  }
}

// Fonction de validation en Regex et Envoie du formulaire en méthode POST
function validAndSubmitForm() {
  const btnOrder = document.getElementById("order");

  btnOrder.addEventListener("click", (e) => {
    e.preventDefault();

    let canOrder =
      validFirstNameRegex(firstName) &&
      validLastNameRegex(lastName) &&
      validAddressRegex(address) &&
      validCityRegex(city) &&
      validEmailRegex(email);

    if (canOrder) {
      // Construction d'un array depuis le local storage
      let idProducts = [];
      for (let i = 0; i < canapOnLocalStorage.length; i++) {
        idProducts.push(canapOnLocalStorage[i].id);
      }

      const order = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: idProducts,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          document.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
        .catch((err) => {
          alert("Problème avec fetch : " + err.message);
        });
    } else {
      alert("Veuillez renseigner vos information.");
    }
  });
}

validAndSubmitForm();