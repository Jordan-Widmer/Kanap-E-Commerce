//récupération du span orderId
let idOrder = document.querySelector("#orderId");

//utilisation de URLSearchParams pour récupérer dans l'url l'orderId -> "?orderId="
const urlConfirmation = window.location.search;
const urlSearchParams = new URLSearchParams(urlConfirmation);
idOrder.innerHTML = urlSearchParams.get("orderId"); //récupère la clé orderId et l'insère dans le span
orderId.insertAdjacentHTML('afterend', '<div id="two">Merci pour votre commande</div>'); //affiche un message de remerciment


