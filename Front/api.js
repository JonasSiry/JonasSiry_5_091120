//API Get

getTeddies = (teddyId) => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && request.status >= 200 && request.status < 400) {
                resolve(JSON.parse(this.responseText))
            }
            else if (request.status == 500) {
                window.location = "../notfound.html"
            }
            else {
            }
        }
        let url = "http://localhost:3000/api/teddies";

        if (teddyId) {
            url += "/" + teddyId;
        }

        request.open('GET', url)
        request.send()
    })
}


// API Post

sendFormFunc = (sendForm, url) => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && request.status == 201) {
                sessionStorage.setItem("order", this.responseText)
                window.location = "../confirm/confirm.html"
                resolve(JSON.parse(this.responseText))
            }
            else {
            }
        }
        request.open("POST", url)
        request.setRequestHeader("Content-Type", "application/json")
        request.send(sendForm)
    })
}