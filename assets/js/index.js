
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function showTable() {
    const xmlParser = new XMLHttpRequest();
    xmlParser.open("GET", "http://localhost:3000/Computer");
    xmlParser.send();
    console.log(this.readyState);
    console.log(this.status)
    xmlParser.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var data = "";
            const jsonData = JSON.parse(this.responseText);
            for (let values of jsonData) {
                data += "<tr>";
                data += "<td>" + values["id"] + "</td>";
                data += "<td>" + values["computertype"] + "</td>";
                data += "<td>" + values["processor"] + "</td>";
                data += "<td>" + values["RAM"] + "</td>";
                data += "<td>" + values["monitor_size"] + "</td>";
                data += "<td>" + values["price"] + "</td>";
                data +=
                    '<td class="avatar"></td>';
                    getImage(values["CompImage"]);
                data += '<td> <button type="button" class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#editModel" onClick="showEdit(' + values["id"] + ')">Edit</button>';
                data += `<td> <button type="button" class="btn btn-danger" onClick="alert(${values["id"]},'You are deleting the product with ID')">Del<span><i class="fa-thin fa-trash-can fa-xl" style="color: #051fe6;"></i></span></button>`;
                data += "</td>"
            }
            console.log(data);
            document.getElementById("tabledata").innerHTML = data;
        }
    }
}
showTable()

function showEdit(prod_id) {
    const xmlParser = new XMLHttpRequest();
    xmlParser.open("GET", `http://localhost:3000/Computer/${prod_id}`);
    xmlParser.send();
    xmlParser.onreadystatechange = function () {
        if (this.status = 200 && this.readyState == 4) {
            const currentProduct = JSON.parse(this.responseText);
            console.log(currentProduct);
            document.getElementById("pro_id").value = currentProduct["id"]
            document.getElementById("ctype").value = currentProduct["computertype"];
            document.getElementById("processor").value = currentProduct["processor"];
            document.getElementById("ram").value = currentProduct["RAM"];
            document.getElementById("mon_size").value = currentProduct["monitor_size"];
            document.getElementById("pri").value = currentProduct["price"];
        }
    }
}

function editComputer(pro_id) {

    const comp_type = document.getElementById("ctype").value;
    const processor = document.getElementById("processor").value;
    const ram = document.getElementById("ram").value;
    const mon_size = document.getElementById("mon_size").value;
    const price = document.getElementById("pri").value;

    const xmlParser = new XMLHttpRequest();
    const timer = setTimeout(JSON.stringify, 3000);

    xmlParser.open("PUT", `http://localhost:3000/Computer/${pro_id}`)
    xmlParser.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlParser.send(
        JSON.stringify(
            {
                computertype: comp_type,
                processor: processor,
                RAM: ram,
                monitor_size: mon_size,
                price: price,
                CompImage: "No link Provided"

            })
    )
    xmlParser.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);

            showTable();
        }
    }

}


//alert button


//Add new 
function addProduct() {
    const comp_type = document.getElementById("c_comtype").value;
    const processor = document.getElementById("c_processor").value;
    const ram = document.getElementById("c_ram").value;
    const mon_size = document.getElementById("c_mon_size").value;
    const price = document.getElementById("c_pri").value;

    const xmlParser = new XMLHttpRequest();
    xmlParser.open("POST", `http://localhost:3000/Computer/`)
    xmlParser.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlParser.send(
        JSON.stringify(
            {
                computertype: comp_type,
                processor: processor,
                RAM: ram,
                monitor_size: mon_size,
                price: price,
                CompImage: "No link Provided"

            })
    )
    xmlParser.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const products = JSON.parse(this.responseText);
        }
        showTable();
    };
}


function deleteData(pro_id) {
    const xmlParser = new XMLHttpRequest();
    xmlParser.open("DELETE", `http://localhost:3000/Computer/${pro_id}`);
    xmlParser.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlParser.send(
        JSON.stringify(
            {
                id: pro_id

            })
    )
    xmlParser.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const products = JSON.parse(this.responseText);
        }
        showTable();
    };
}


//alerts
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (id, msg) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `<h3>${msg}</h3>`, `   <div><h3>${id}</h3></div>`,
        `  <button type="button" class="btn btn-danger form-btn" data-bs-dismiss="alert" aria-label="Close" onclick="deleteData(${id})">Okey</button>`, `<button type="button" class="btn btn-danger form-btn" data-bs-dismiss="alert" aria-label="Close">Cancel</button>`,
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}


//validations




// $(document).ready(function(){
//     const comp_type =document.getElementById("c_comtype").value;
//     const processor = document.getElementById("c_processor").value;
//     const ram =  document.getElementById("c_ram").value;
//     const mon_size = document.getElementById("c_mon_size").value;
//     const price = document.getElementById("c_pri").value;
//     if(comp_type ==''|| processor==''||ram=='' || mon_size=='' || price==''){
//         $('#ctype').addClass('is-invalid');
//         console.log("hiiiii")

//     }
//     else{

//         $('#ctype').removeClass('is-invalid');
//     }

// })

$(document).ready(function () {
    $('#editForm').validate({
        rules: {
            ctype: {
                required: true,
                minlength: 5,
                maxlength: 12
            },
            processor: {
                required: true,

            },
            ram: {
                required: true,
                minlength: 10,
                maxlength: 10
            },
            mon_size: {
                required: true,
            },
            pri: {
                required: true,
                pattern: /^[0-9]+$/
            }
        },
        messages: {
            uname: {
                required: " Required",
                minlength: "It should be minimum of 5 characters",
                maxlength: "It should contain 12 characters only",
            },
            processor: {
                required: " Required",

            },
            ram: {
                required: " Required",
                minlength: "It should contain 10 digits",
                maxlength: "It should contain 10 digits"
            },
            mon_size: {
                required: " Required",
            },
            pri: {
                required: "This is a required field",
                pattern: "Pattern doesn't match"
            }
        }
    })
})

$(document).ready(function () {
    $('#createForm').validate({
        rules: {
            c_comtype: {
                required: true,
                minlength: 5,
                maxlength: 12
            },
            c_processor: {
                required: true,

            },
            c_ram: {
                required: true,
                minlength: 10,
                maxlength: 10
            },
            c_mon_size: {
                required: true,
            },
            c_pri: {
                required: true,
                pattern: /^[0-9]+$/
            }
        },
        messages: {
            c_comtype: {
                required: " Required",
                minlength: "It should be minimum of 5 characters",
                maxlength: "It should contain 12 characters only",
            },
            c_processor: {
                required: " Required",

            },
            c_ram: {
                required: " Required",
                minlength: "It should contain 10 digits",
                maxlength: "It should contain 10 digits"
            },
            c_mon_size: {
                required: " Required",
            },
            c_pri: {
                required: "This is a required field",
                pattern: "Pattern doesn't match"
            }
        }
    })
})

function getImage(img){
    fetch(`https://pixabay.com/api/?key=36007746-b36ae27c3528436e0e7b2219a&id=${img}&image_type=photo&min_width=70&min_height=60`,{method:"GET"
    }).then(res => res.json())
    .then(image=>{
        console.log(image);
        const img = image.hits[0].largeImageURL
        const bg = document.querySelector(".avatar");
        bg.style.backgroundImage=`url(${img})`;
    
    })
}
