// Fonction qui actualise le nombre d'objets dans le cart en haut à droite

function numberItems() {
    let cart = JSON.parse(localStorage.getItem("cart"))
    let textContent = ""
    if (cart && cart.length > 0) {
        textContent = cart.length
    }
    let indexCart = document.getElementById("itemsnumber")
    indexCart.textContent = textContent
}

numberItems()