let menu = [["Home"],["Kategorien"],["Verkaufen"],["Unternehmen","Philosophie","Karriere"]];
let list = document.getElementById("navBar");
let button;
menu.forEach((item)=>{
    if(item.length>1){
        let ul = document.createElement('ul');
        ul.classList.add('dropList');
        ul.setAttribute('id','DownList');
        for(let i=0;i<item.length;i++){
            if(i===0){
                let li = document.createElement('li');
                button = document.createElement('button');
                button.classList.add('Dropdown-button')
                button.innerText=item[i];
                button.onclick=function(){
                    document.getElementById("DownList").style.visibility="visible";
                }
                li.appendChild(button);
                list.appendChild(li);
            }else{
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.innerText=item[i];
                li.appendChild(a);
                ul.appendChild(li);
            }
        }
        list.appendChild(ul);
    }else{
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.innerText=item;
        li.appendChild(a);
        list.appendChild(li);
    }

})
window.onclick = function(event) {
    if (!event.target.matches('.Dropdown-button')) {
        document.getElementById("DownList").style.visibility="hidden";
    }
}
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navBar").style.top = "0";
    } else {
        document.getElementById("navBar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}
