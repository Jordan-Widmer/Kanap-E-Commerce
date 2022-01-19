// lancement d'une requête HTTP et recuperation au format JSON
fetch("http://localhost:3000/api/products")
  .then((answer) => answer.json())
  .then(function (data) {
    card(data);
  })

  // Exécute le catch si une erreur est détectée
  .catch(function (error) {
    console.log("Erreur !");
  });

// Fonction qui inject la carte dans la page d'Accueil
function card(data) {
  let kanapHTML = "";
  data.forEach(function (canap) {
    kanapHTML += `
        <a href="./product.html?id=${canap._id}">
          <article>
            <img src="${canap.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
            <h3 class="productName">${canap.name}</h3>
            <p class="productDescription">${canap.description}</p>
          </article>
        </a>
    `;
  });
  items.innerHTML = kanapHTML;
}
