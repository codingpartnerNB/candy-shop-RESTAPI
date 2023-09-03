let myForm = document.querySelector("#myForm");
let candyName = document.querySelector("#name");
let desc = document.querySelector("#description");
let price = document.querySelector("#price");
let quantity = document.querySelector("#quantity");
let ul = document.querySelector(".list-group");

myForm.addEventListener("submit", onSubmit);
window.addEventListener("DOMContentLoaded", showAllOnBrowser);
ul.addEventListener("click", editQuantity);

function showAllOnBrowser() {
    axios.get("https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData")
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                showOnBrowser(res.data[i]);
            }
        })
        .catch((err) => console.log(err));
}

function onSubmit(event) {
    event.preventDefault();
    if (candyName.value === "" || desc.value === "" || price.value === "" || quantity.value === "") {
        let msg = document.createElement("div");
        msg.className = "error";
        msg.appendChild(document.createTextNode("Please enter all fields."));
        let label = document.querySelector("label[for='name']");
        myForm.insertBefore(msg, label);
        setTimeout(() => msg.remove(), 3000);
    }
    else {
        let userData = {
            "CandyName": candyName.value,
            "Description": desc.value,
            "Price": price.value,
            "Quantity": quantity.value
        }

        // Storing data using POST request
        axios.post("https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData", userData)
            .then((res) => showOnBrowser(userData))
            .catch((err) => {
                document.body.innerHTML = document.body.innerHTML + "<h4 class'error'>Something went wrong</h4>";
                console.log(err)
            });

        //Clearing fields
        candyName.value = "";
        desc.value = "";
        price.value = "";
        quantity.value = "";
    }
}

function showOnBrowser(user) {
    const li = document.createElement("li");
    li.className = "list-group-item";

    // Buy One
    const buyOne = document.createElement("button");
    buyOne.className = "btn btn-success buy-one m-2";
    buyOne.appendChild(document.createTextNode("Buy One"));

    //Buy Two
    const buyTwo = document.createElement("button");
    buyTwo.className = "btn btn-success buy-two m-2";
    buyTwo.appendChild(document.createTextNode("Buy Two"));

    //Buy Three
    const buyThree = document.createElement("button");
    buyThree.className = "btn btn-success buy-three m-2";
    buyThree.appendChild(document.createTextNode("Buy Three"));


    li.appendChild(document.createTextNode(`${user.CandyName}:${user.Description}:${user.Price}Rs:${user.Quantity}:`));
    li.appendChild(buyOne);
    li.appendChild(buyTwo);
    li.appendChild(buyThree);
    ul.appendChild(li);
}

function editQuantity(event) {
    event.preventDefault();
    if (event.target.classList.contains("buy-one")) {
        let items = event.target.parentElement.textContent.split(":");
        axios.get("https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData")
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].CandyName === items[0]) {
                        let data = {
                            "CandyName": res.data[i].CandyName,
                            "Description": res.data[i].Description,
                            "Price": res.data[i].Price,
                            "Quantity": res.data[i].Quantity - 1
                        }
                        let url = "https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData/" + res.data[i]._id;
                        axios.put(url, data)
                            .then((res) => {
                                console.log(res);
                                event.target.parentElement.remove();
                                showOnBrowser(data);
                            })
                            .catch((err) => console.log(err));
                    }
                }
            })

    } else if (event.target.classList.contains("buy-two")) {
        let items = event.target.parentElement.textContent.split(":");
        axios.get("https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData")
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].CandyName === items[0]) {
                        let data = {
                            "CandyName": res.data[i].CandyName,
                            "Description": res.data[i].Description,
                            "Price": res.data[i].Price,
                            "Quantity": res.data[i].Quantity - 2
                        }
                        let url = "https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData/" + res.data[i]._id;
                        axios.put(url, data)
                            .then((res) => {
                                console.log(res);
                                event.target.parentElement.remove();
                                showOnBrowser(data);
                            })
                            .catch((err) => console.log(err));
                    }
                }
            })

    } else if (event.target.classList.contains("buy-three")) {
        let items = event.target.parentElement.textContent.split(":");
        axios.get("https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData")
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].CandyName === items[0]) {
                        let data = {
                            "CandyName": res.data[i].CandyName,
                            "Description": res.data[i].Description,
                            "Price": res.data[i].Price,
                            "Quantity": res.data[i].Quantity - 3
                        }
                        let url = "https://crudcrud.com/api/ab933109a9964041a2bd03d00eeadffd/candyData/" + res.data[i]._id;
                        axios.put(url, data)
                            .then((res) => {
                                console.log(res);
                                event.target.parentElement.remove();
                                showOnBrowser(data);
                            })
                            .catch((err) => console.log(err));
                    }
                }
            })
    }
}