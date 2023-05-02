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
                data +="<td>"+values["CompImage"]+"</td>";
                data +='<td> <button type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick="showEdit('+values["id"]+')">Edit</button>';
                data +='<td> <button type="button" class="btn btn-primary" onClick="deleteData('+values["prod_id"]+')">Del</button>';
                data +="</td>"
            }
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

}


//alert button

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Nice, you triggered this alert message!', 'success')
  })
}