// Récupère la fonction Get de l'API pour afficher les teddies

async function teddies() {
    let teddies = await getTeddies()

    let bears = document.getElementById("bears")

    teddies.forEach((teddy) => {

        let container = document.createElement("a")
        container.setAttribute("href", "product/product.html?id=" + teddy._id)
        bears.appendChild(container)

        let image = document.createElement("div")
        image.setAttribute("class", "image")
        image.style.backgroundImage = "url(" + teddy.imageUrl + ")"
        image.style.backgroundSize = "cover"
        image.style.height = "30rem"
        container.appendChild(image)

        let name = document.createElement("h2")
        name.textContent = teddy.name
        container.appendChild(name)

        let price = document.createElement("p")
        price.textContent = teddy.price / 100 + " euros"
        container.appendChild(price)
    })
}

teddies()