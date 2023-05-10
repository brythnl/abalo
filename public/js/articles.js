'use strict';
/* ------------------------ retrieve Data from Form ------------------------ */
let submitbutton = document.getElementById('submit_search');
let Filter ="";
sendData(Filter);
if(submitbutton) {
    submitbutton.addEventListener('click',
        event => {
            Filter = document.querySelector('#search_text').value;
            event.preventDefault();
            sendData(Filter);
            return false;
        })
}
/* ------------------------ sending XMLHTTPRequest ------------------------ */
let result;
function sendData(Text) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "/api/articles");
    xhr.setRequestHeader("search_text",Text);
    xhr.onreadystatechange=()=> {
        if(xhr.readyState===4){
            if(xhr.status===200){
                result=JSON.parse(xhr.responseText);
                createTable(result);
            }else{
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send();
}

/* ------------------------ Construction Table ------------------------ */


function createTable(lists) {
    let table = document.getElementById('articletable_body');
    for(let i = 0;i<lists.length;i++) {
        let item=lists[i];
        let tr = document.createElement('tr');

        Object.keys(item).forEach(key=>{

            let td = document.createElement('td');
            if(key==='picture'){
                let img = document.createElement('img');
                img.setAttribute('src',item[key]);
                td.appendChild(img);
            }else {
                td.innerText = item[key];
            }
            tr.appendChild(td);
        })
        let td = document.createElement('td');
        let a = document.createElement('a');
        a.innerText = "+";
        a.setAttribute('href', '#');
        a.classList.add('add-to-cart-button');
        a.setAttribute('style', 'text-decoration: none; color: black;')
        td.appendChild(a);
        tr.appendChild(td);
        td = document.createElement('td');
        a = document.createElement('a');
        a.innerText = "-";
        a.setAttribute('href', '#');
        a.classList.add('remove-from-cart-button');
        a.setAttribute('style', 'text-decoration: none; color: black;')
        td.appendChild(a);
        tr.appendChild(td);
        table.appendChild(tr);
    }
}



