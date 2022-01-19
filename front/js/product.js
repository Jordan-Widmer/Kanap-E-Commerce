// Récupération des paramètres d'URL en Javascript
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
console.log(id);
const color = document.getElementById("colors");
getProduct();

// Récupération des products de l'API
function getProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then(function (data) {
      return data.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(function (resultatAPI) {
      product = resultatAPI;
      console.table(product);
      if (product) {
        printProductCard(product);
      }
    });
}

// Conversion pour définir le prix
const devide = (x) => Number.parseFloat(x);

// Affiche les produits sur la page
function printProductCard() {
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
  let productName = document.getElementById("title");
  productName.innerHTML = product.name;
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = devide(product.price);
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = product.description;
  for (let colors of product.colors) {
    console.log(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addProductOnCart(product);
}

// Pop-up de confirmation de commande
function popUp() {
  if (
    window.confirm(`Votre article a bien été ajouté au panier.
    cliquez sur OK pour voir votre panier`)
  ) {
    window.location.href = "cart.html";
  }
}

// Ajoute les produits au paniers et dans le local storage
function addProductOnCart(product) {
  const btnSendToCart = document.getElementById("addToCart");

  // Événement au click
  btnSendToCart.addEventListener("click", () => {

    // Condition d'utilisation
    if (
      quantity.value > 0 &&     // supérieur à 0 et
      quantity.value <= 100 &&  // inférieur ou egal à 100 et
      color.value != 0          // indifférent à 0
    ) {

      // choix de la couleur
      let colorProduct = color.value;

      // choix de la quantité
      let quantityProduct = quantity.value;

      // element à rajouter au panier
      let objProducts = {
        id: id,
        color: colorProduct,
        quantityProduct: Number(quantityProduct),
        productName: product.name,
        productPrice: product.price,
        productDescription: product.description,
        productImg: product.imageUrl,
        productAltImg: product.altTxt,
      };

      //Initialisation du local storage
      let productOnLocalStorage = JSON.parse(localStorage.getItem("products"));

      // Si le panier comporte déjà au moins 1 produit
      if (productOnLocalStorage) {
        const resultFind = productOnLocalStorage.find((el) => el.id === id && el.color === colorProduct);

        // Si le produit est déjà dans le panier
        if (resultFind) {
          let newQuantity =
            parseInt(objProducts.quantityProduct) +
            parseInt(resultFind.quantityProduct);
          resultFind.quantityProduct = newQuantity;
          localStorage.setItem("products",JSON.stringify(productOnLocalStorage));
          console.table(productOnLocalStorage);
          popUp();

          // Si le produit n'es pas dans le panier
        } else {
          productOnLocalStorage.push(objProducts);
          localStorage.setItem("products", JSON.stringify(productOnLocalStorage));
          console.table(productOnLocalStorage);
          popUp();
        }

        // Si le panier est vide
      } else {
        productOnLocalStorage = [];
        productOnLocalStorage.push(objProducts);
        localStorage.setItem("products", JSON.stringify(productOnLocalStorage));
        console.table(productOnLocalStorage);
        popUp();
      }
    } else {
      alert("Veuillez sélectionner une couleur et la quantité");
    }
  });
}