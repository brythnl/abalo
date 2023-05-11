'use strict';
function sendData() {
    let searchText =document.querySelector("#search").value;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=()=> {
        if(xhr.readyState===4){
            if(xhr.status===200){
                let result=JSON.parse(xhr.responseText);
                console.log(result);
                //createTable(result);
            }else{
                console.error(xhr.statusText);
            }
        }
    };
    let parameter = new URLSearchParams({'search':searchText});
    xhr.open('GET', "/api/articles?"+parameter.toString());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}



