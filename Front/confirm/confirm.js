// Récupère la sessionStorage de la page précédente ou redirige la page au refresh

order = () => {
    if (sessionStorage.getItem("order") !=null) {
        let order = JSON.parse(sessionStorage.getItem("order"))
        document.getElementById("firstname").innerHTML = " " + order.contact.firstName + " !"
        document.getElementById("orderid").innerHTML = " " + order.orderId
        sessionStorage.removeItem("order")
    }
    else {
        document.getElementById("confirm").remove()

        let redirect = document.getElementById("redirect")
        let thankYou = document.createElement("p")
        thankYou.textContent = "Thank you ! Automatic redirection in 5 sec !"
        redirect.appendChild(thankYou)

        setTimeout(function() {
            window.location = "../index.html"
        }, 5000)
    }
}


// Crée un tableau qui récupère les infos de la sessionStorage concernant les teddies

orderItems = () => {
    let cartItems = document.getElementById("confirmcartitems")

    let commande = document.createElement("table")
    cartItems.appendChild(commande)

    let lignetop = document.createElement("tr")
    commande.appendChild(lignetop)

    let picture = document.createElement("th")
    lignetop.appendChild(picture)
    picture.textContent = "Bear Pic"

    let name = document.createElement("th")
    lignetop.appendChild(name)
    name.textContent = "Bear Name"

    // let color = document.createElement("th")
    // lignetop.appendChild(color)
    // color.textContent = "Color"

    let price = document.createElement("th")
    lignetop.appendChild(price)
    price.textContent = "Price"

    let i = 0
    let order=JSON.parse(sessionStorage.getItem("order"))

    if (sessionStorage.getItem("order") !=null) {
        order.products.forEach((orderItem) => {

            let lignemid = document.createElement("tr")
            lignemid.setAttribute("id", "lignemid" + i)
            commande.appendChild(lignemid)

            let picmid = document.createElement("img")
            picmid.setAttribute("src", orderItem.imageUrl)
            picmid.setAttribute("alt", "Picture of" + orderItem.name)
            // picmid.style.backgroundImage = "url(" + orderItem.imageUrl + ")"
            // picmid.style.backgroundSize = "cover"
            // picmid.style.height = "100%"
            lignemid.appendChild(picmid)

            let namemid = document.createElement("td")
            namemid.textContent = orderItem.name
            lignemid.appendChild(namemid)

            // let colormid = document.createElement("td")
            // colormid.textContent = orderItem.selectedColor
            // lignemid.appendChild(colormid)

            let pricemid = document.createElement("td")
            pricemid.textContent = orderItem.price / 100 + " euros"
            lignemid.appendChild(pricemid)
        })

        let totalrow = document.createElement("tr")
        totalrow.setAttribute("id", "total")
        commande.appendChild(totalrow)

        let totaltext = document.createElement("th")
        totaltext.setAttribute("id", "colonne")
        totaltext.textContent = "Total"
        totalrow.appendChild(totaltext)

        let fullprice = document.createElement("td")
        fullprice.setAttribute("id", "fullprice")
        fullprice.setAttribute("colspan", "2")
        totalrow.appendChild(fullprice)

        let somme = 0
        order.products.forEach((orderItem) => {
            somme += orderItem.price / 100
        })

        document.getElementById("fullprice").textContent = somme + " euros"
    }
}

orderItems()
order()