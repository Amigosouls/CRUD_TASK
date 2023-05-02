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
                data +="<td>"+values["prod_id"]+"</td>";
                data +="<td>"+values["computertype"]+"</td>";
                data +="<td>"+values["processor"]+"</td>";
                data +="<td>"+values["RAM"]+"</td>";
                data +="<td>"+values["monitor_size"]+"</td>";
                data +="<td>"+values["price"]+"</td>";
                data +="<td>"+values["CompImage"]+"</td>";
                data +='<td> <button type="button" class="btn btn-primary" onClick="showEdit(values['prod_id'])">Edit</button>';
                data +="<td> <button type='button' class='btn btn-primary'>Del</button>";
                data +="</td>"
            }
            document.getElementById("tabledata").innerHTML=data;
        }
    }
}
showTable()