/* ------------------------ retrieve Data from Form ------------------------ */
/*let submit-button = document.getElementById('submit_search');
if(submit-button) {
    submit-button.addEventListener('click',
        event => {
            let SearchText = document.querySelector('#search_text').value;
            event.preventDefault();
            sendData(SearchText);
            return false;
        })
}
let Filter ="";
sendData(Filter);
/* ------------------------ sending XMLHTTPRequest ------------------------ */
/*function sendData(SearchText) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "/api/articles");
    xhr.setRequestHeader("Search-text",SearchText);
    let formData = new FormData();
    formData.append("search_text",SearchText);
    xhr.send(formData);
}

/* ------------------------ Construction Table ------------------------ */
/*let list = Filter;
let table = document.getElementById('articletable_body');
list.forEach((item)=>{
    let tr = document.createElement('tr');
    item.forEach((data)=>{
        let td = document.createElement('td');
        td.innerText=data;
        tr.appendChild(td);
    })
    let td = document.createElement('td');
    let a = document.createElement('a');
    a.innerText="+";
    a.setAttribute('href','#');
    a.classList.add('add-to-cart-button');
    a.setAttribute('style','text-decoration: none; color: black;')
    td.appendChild(a);
    tr.appendChild(td);
    td = document.createElement('td');
    a = document.createElement('a');
    a.innerText="-";
    a.setAttribute('href','#');
    a.classList.add('remove-from-cart-button');
    a.setAttribute('style','text-decoration: none; color: black;')
    tr.appendChild(td);
    table.appendChild(tr);
})
*/


