// Tableau récapitulatif des produits

cartInit = () => {

    let cart = JSON.parse(localStorage.getItem("cart"))

    if (cart == undefined) {
        cart = []
    }
    if (cart.length > 0) {
        document.getElementById("empty").remove()

        let itemsInCart = document.getElementById("cartitems")

        let commande = document.createElement("table")
        itemsInCart.appendChild(commande)

        let lignetop = document.createElement("tr")
        commande.appendChild(lignetop)

        let picture = document.createElement("th")
        lignetop.appendChild(picture)
        picture.textContent = "Bear Pic"

        let name = document.createElement("th")
        lignetop.appendChild(name)
        name.textContent = "Bear Name"

        let color = document.createElement("th")
        lignetop.appendChild(color)
        color.textContent = "Color"

        let price = document.createElement("th")
        lignetop.appendChild(price)
        price.textContent = "Price"

        let remove = document.createElement("th")
        lignetop.appendChild(remove)
        remove.textContent = "Remove"

        for (let i = 0; i < cart.length; i++) {

            let lignemid = document.createElement("tr")
            lignemid.setAttribute("id", "lignemid" + [i])
            commande.appendChild(lignemid)

            let picmid = document.createElement("img")
            picmid.setAttribute("src", cart[i].imageUrl)
            picmid.setAttribute("alt", "Picture of" + cart[i].name)
            // picmid.setAttribute("class", "picmid")
            // picmid.style.backgroundImage = "url(" + cart[i].imageUrl + ")"
            // picmid.style.backgroundSize = "cover"
            // picmid.style.height = "100%"
            lignemid.appendChild(picmid)

            let namemid = document.createElement("td")
            namemid.textContent = cart[i].name
            lignemid.appendChild(namemid)

            let colormid = document.createElement("td")
            colormid.textContent = cart[i].selectedColor
            lignemid.appendChild(colormid)

            let pricemid = document.createElement("td")
            pricemid.textContent = cart[i].price / 100 + " euros"
            lignemid.appendChild(pricemid)

            let deleteitem = document.createElement("td")
            lignemid.appendChild(deleteitem)

            let removeitem = document.createElement("p")
            removeitem.setAttribute("id", "remove" + [i])
            removeitem.setAttribute("class", "fas fa-times-circle fa-1x")
            removeitem.setAttribute("title", "Remove Item")
            deleteitem.appendChild(removeitem)

            removeitem.addEventListener("click", (event) => { this.cancel(i) })
        }

        let totalrow = document.createElement("tr")
        totalrow.setAttribute("id", "total")
        commande.appendChild(totalrow)

        let totaltext = document.createElement("th")
        totaltext.setAttribute("id", "colonne")
        totaltext.setAttribute("colspan", "2")
        totaltext.textContent = "Total"
        totalrow.appendChild(totaltext)

        let fullprice = document.createElement("td")
        fullprice.setAttribute("id", "fullprice")
        fullprice.setAttribute("colspan", "5")
        totalrow.appendChild(fullprice)

        let somme = 0
        cart.forEach((cart) => {
            somme += cart.price / 100
        })

        document.getElementById("fullprice").textContent = somme + " euros"

        cancel = (i) => {
            cart.splice(i, 1)
            localStorage.clear()
            localStorage.setItem("cart", JSON.stringify(cart))
            window.location.reload()
        }
    }
    if (cart.length == 0 || cart.length == null) {
        document.getElementById("fill").remove()
        document.getElementById("form").remove()
    }
}

cartInit()



// Validation des données du formulaire

checkInput = () => {
    let checkNumber = /[0-9]/
    let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/

    let checkMessage = ""

    let firstName = document.getElementById("firstname").value
    let lastName = document.getElementById("lastname").value
    let email = document.getElementById("email").value
    let address = document.getElementById("address").value
    let city = document.getElementById("city").value

    if (checkNumber.test(firstName) == true || checkSpecialCharacter.test(firstName) == true || firstName == "") {
        let firstNamer = document.getElementById("firstname")
        firstNamer.style.backgroundColor = "rgb(255, 164, 164)"
        checkMessage = "Firstname incorrect !"
    }
    else {
        let firstNamer = document.getElementById("firstname")
        firstNamer.style.backgroundColor = "white"
    }

    if (checkNumber.test(lastName) == true || checkSpecialCharacter.test(lastName) == true || lastName == "") {
        let lastNamer = document.getElementById("lastname")
        lastNamer.style.backgroundColor = "rgb(255, 164, 164)"
        checkMessage = checkMessage + "\n" + "Lastname incorrect !"
    }
    else {
        let lastNamer = document.getElementById("lastname")
        lastNamer.style.backgroundColor = "white"
    }

    if (checkMail.test(email) == false) {
        let emailr = document.getElementById("email")
        emailr.style.backgroundColor = "rgb(255, 164, 164)"
        checkMessage = checkMessage + "\n" + "Email incorrect !"
    }
    else {
        let emailr = document.getElementById("email")
        emailr.style.backgroundColor = "white"
    }

    if (checkSpecialCharacter.test(address) == true || address == "") {
        let addressr = document.getElementById("address")
        addressr.style.backgroundColor = "rgb(255, 164, 164)"
        checkMessage = checkMessage + "\n" + "Address incorrect !"
    }
    else {
        let addressr = document.getElementById("address")
        addressr.style.backgroundColor = "white"
    }

    if (checkNumber.test(city) == true || checkSpecialCharacter.test(city) == true || city == "") {
        let cityr = document.getElementById("city")
        cityr.style.backgroundColor = "rgb(255, 164, 164)"
        checkMessage = checkMessage + "\n" + "City incorrect !"
    }
    else {
        let cityr = document.getElementById("city")
        cityr.style.backgroundColor = "white"
    }

    if (checkMessage != "") {
        alert("Certains champs sont incorrects =>" + "\n" + checkMessage)
        console.log(checkMessage)
    }
    else {
        contact = {
            firstName: firstName, lastName: lastName, address: address, city: city, email: email
        }
        return contact
    }
}


// Récupère la fonction de vérification du formulaire, les ID du localStorage, récupère la fonction Post de l'API, puis supprime le localStorage

confirmCommand = () => {
    let contact = checkInput()
    if (contact != undefined) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let products = []
        // selectedColor = cart.selectedColor impossible via backend
        cart.forEach((items) => {
            products.push(items._id)
        })

        let order = {
            contact, products
        }

        let url = "http://localhost:3000/api/teddies/order"
        let sendForm = JSON.stringify(order)
        sendFormFunc(sendForm, url)

        contact = {}
        products = []
        localStorage.clear()
    }
}