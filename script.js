var userNameAlert = document.getElementById("userNameAlert");
var pName = document.getElementById("productName");
var pPrice = document.getElementById("productPrice");
var pCategory = document.getElementById("productCategory");
var pDesc = document.getElementById("productDesc");
var productArr;
if (localStorage.getItem("ProductsList") == null) {
    productArr = [];
}
else {
    productArr = JSON.parse(localStorage.getItem("ProductsList"));
    displayproducts();
}
function addProduct() {
    if (validateProductName()== true) {
        if (checkEmpty() == true) {
            var product =
            {
                Name: pName.value,
                Price: pPrice.value,
                category: pCategory.value,
                Desc: pDesc.value
            };
            productArr.push(product);
            localStorage.setItem("ProductsList", JSON.stringify(productArr));

            //  clearForm();
            displayproducts();
        }
        else
            alert("All Fields Required");
    }


}
function clearForm() {
    pName.value = "";
    pPrice.value = "";
    pCategory.value = "";
    pDesc.value = "";
}

function displayproducts() {
    var cartona = ` `;
    for (var i = 0; i < productArr.length; i++) {
        cartona += `   <tr>
    <td>${i}</td>
    <td>${productArr[i].Name}</td>
    <td>${productArr[i].Price}</td>
    <td>${productArr[i].category}</td>
    <td>${productArr[i].Desc}</td>
    <td><button class="btn btn-outline-warning">update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>

</tr>`
    }
    document.getElementById("BodyId").innerHTML = cartona;
}

function checkEmpty() {
    if (pName.value != "" && pPrice.value != "" && pCategory.value != "" && pDesc.value != "") {
        return true;
    }
    else {
        return false;
    }
}

function deleteProduct(Index) {
    productArr.splice(Index, 1);
    localStorage.setItem("ProductsList", JSON.stringify(productArr));
    displayproducts();
}

function searchProduct(term) {
    var cartoona = ``;
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].Name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartoona += `   <tr>
    <td>${i}</td>
    <td>${productArr[i].Name}</td>
    <td>${productArr[i].Price}</td>
    <td>${productArr[i].category}</td>
    <td>${productArr[i].Desc}</td>
    <td><button class="btn btn-outline-warning">update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>

</tr>`
        }
        else {
            alert("Not Found");
        }

    }

    document.getElementById("BodyId").innerHTML = cartoona;
}


function validateProductName() {

    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(pName.value) == true) {
        pName.classList.add("is-valid");
        pName.classList.remove("is-invalid");
        userNameAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        pName.classList.add("is-invalid");
        pName.classList.remove("is-valid");
        userNameAlert.classList.replace("d-none", "d-block");
        return false;
    }

}
pName.addEventListener("blur", validateProductName);