

function showTable(){
    const xmlParser = new XMLHttpRequest();
    xmlParser.open("GET","http://localhost:3000/Computer");
    xmlParser.send();
    console.log(this.readyState);
    console.log(this.status)
    xmlParser.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            console.log(this.responseText);
            var data ="";
            const jsonData = JSON.parse(this.responseText);
            for (let values of jsonData){
                data +="<tr>";
                data +="<td>"+values["id"]+"</td>";
                data +="<td>"+values["computertype"]+"</td>";
                data +="<td>"+values["processor"]+"</td>";
                data +="<td>"+values["RAM"]+"</td>";
                data +="<td>"+values["monitor_size"]+"</td>";
                data +="<td>"+values["price"]+"</td>";
               data+=
                '<td><img width="50px" id ="" height="60px" src=https://pixabay.com/get/' +
                values["CompImage"] +' class="" cross-origin=""></td>';
                data +='<td> <button type="button" class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#editModel" onClick="showEdit('+values["id"]+')">Edit</button>';
                data +=`<td> <button type="button" class="btn btn-danger" onClick="alert(${values["id"]},'You are deleting the product with ID')">Del</button>`;
                data +="</td>"
            }
            console.log(data);
            document.getElementById("tabledata").innerHTML=data;
        }
    }
}
showTable()

function showEdit(prod_id){
    const xmlParser = new XMLHttpRequest();
    xmlParser.open("GET",`http://localhost:3000/Computer/${prod_id}`);
    xmlParser.send();
    xmlParser.onreadystatechange = function(){
        if(this.status = 200 && this.readyState==4)
        {
            const currentProduct = JSON.parse(this.responseText);
            console.log(currentProduct);
            document.getElementById("pro_id").value=currentProduct["id"]
            document.getElementById("ctype").value = currentProduct["computertype"];
            document.getElementById("processor").value = currentProduct["processor"];
            document.getElementById("ram").value = currentProduct["RAM"];
            document.getElementById("mon_size").value = currentProduct["monitor_size"];
            document.getElementById("pri").value = currentProduct["price"];
        }
    }
}

function editComputer(pro_id){
    
    const comp_type =document.getElementById("ctype").value;
    const processor = document.getElementById("processor").value;
    const ram =  document.getElementById("ram").value;
    const mon_size = document.getElementById("mon_size").value;
    const price = document.getElementById("pri").value;

    const xmlParser = new XMLHttpRequest();
    const timer = setTimeout(JSON.stringify,3000);

    xmlParser.open("PUT",`http://localhost:3000/Computer/${pro_id}`)
    xmlParser.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xmlParser.send(
        JSON.stringify(
           { 
                computertype : comp_type,
                processor : processor,
                RAM : ram,
                monitor_size : mon_size,
                price : price,
                CompImage : "No link Provided"

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
function addProduct(){
    const comp_type =document.getElementById("c_comtype").value;
    const processor = document.getElementById("c_processor").value;
    const ram =  document.getElementById("c_ram").value;
    const mon_size = document.getElementById("c_mon_size").value;
    const price = document.getElementById("c_pri").value;

    const xmlParser = new XMLHttpRequest();
    xmlParser.open("POST",`http://localhost:3000/Computer/`)
    xmlParser.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlParser.send(
        JSON.stringify(
           { 
                computertype : comp_type,
                processor : processor,
                RAM : ram,
                monitor_size : mon_size,
                price : price,
                CompImage : "No link Provided"

        })
    )
    xmlParser.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const products = JSON.parse(this.responseText);
        }
        showTable();
      };
}


function deleteData(pro_id){
    const xmlParser = new XMLHttpRequest();
    xmlParser.open("DELETE",`http://localhost:3000/Computer/${pro_id}`);
    xmlParser.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlParser.send(
        JSON.stringify(
           { 
            id :pro_id

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

const alert = (id,msg) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-danger alert-dismissible" role="alert">`,
    `<h3>${msg}</h3>`,`   <div><h3>${id}</h3></div>`,
    `  <button type="button" class="btn btn-danger form-btn" data-bs-dismiss="alert" aria-label="Close" onclick="deleteData(${id})">Okey</button>`,`<button type="button" class="btn btn-danger form-btn" data-bs-dismiss="alert" aria-label="Close">Cancel</button>`,
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


//validations

$(document).ready(function(){
    $("#ctype").validate({
        rules:{
            ctype:{
                required:true
            },
            processor:{
                required:true
            }
        },
        messages:{
            ctype:{
                required:"This is Required Field"
            },
            processor:{
                required:"T"
            }
        }
    })
})