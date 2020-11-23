// On définit la valeur teddy et 2 fonctions qui seront appelées plus tard

currentTeddy = null

setCurrentTeddy = (teddy) => {
    currentTeddy = teddy
}

getCurrentTeddy = () => {
    return currentTeddy
}


// On récupère les teddy IDs via la fonction Get et on "set" les caractéristiques du teddy actuel

async function detailProduct() {
    let urlParams = new URLSearchParams(window.location.search);
    let teddyId = urlParams.get('id');

    let detailProduct = await getTeddies(teddyId)

    let pick = document.getElementById("pick")

    let colorh2 = document.createElement("h2")
    colorh2.textContent = "You picked " + detailProduct.name + ", now select a color"
    pick.appendChild(colorh2)

    let detailteddies = document.getElementById("detailteddies")

    let detailcontainer = document.createElement("div")
    detailcontainer.setAttribute("class", "detailcontainer")
    detailteddies.appendChild(detailcontainer)

    let detailimage = document.createElement("img")
    detailimage.setAttribute("src", detailProduct.imageUrl)
    detailimage.setAttribute("alt", "Picture of" + detailProduct.name)
    detailcontainer.appendChild(detailimage)

    let detailname = document.createElement("h2")
    detailname.textContent = detailProduct.name
    detailcontainer.appendChild(detailname)

    let detailprice = document.createElement("p")
    detailprice.textContent = detailProduct.price / 100 + " euros"
    detailcontainer.appendChild(detailprice)

    let description = document.createElement("p")
    description.textContent = detailProduct.description
    detailcontainer.appendChild(description)

    let firstColor=true

    detailProduct.colors.forEach((teddy) => {
        let pickColor = document.createElement("option")
        if (firstColor==true) {
            pickColor.setAttribute("selected", "true")
            firstColor=false
        }
        document.getElementById("colorpick")
            .appendChild(pickColor).innerHTML = teddy
    })
    setCurrentTeddy(detailProduct)

    let cart = JSON.parse(localStorage.getItem("cart"))

    if (!cart) {
        cart = []
    }
    let count = cart.filter(teddy => teddy._id == detailProduct._id).length

    if (count > 0) {
        let already = document.getElementById("already")
        let gotIt = document.createElement("p")
        gotIt.textContent = "You already picked this teddy" + " (" + count + ")"
        already.appendChild(gotIt)
    }
    else {
        let already = document.getElementById("already")
        already.remove()
    }
}


// On récupère les caractéristiques du teddy et on crée/ajoute au localStorage

addCart = () => {
    let teddy = getCurrentTeddy()
    let cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
        cart = []
    }
    let colorpick = document.getElementById("colorpick")
    teddy.selectedColor = colorpick.value
    cart.push(teddy)
    localStorage.setItem("cart", JSON.stringify(cart))
    alert(teddy.name + " (" + teddy.selectedColor + ")" + " has been added to your cart")
    location.reload()
}

detailProduct()