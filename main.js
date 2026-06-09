let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood = 'Creat';
let tmp;
// get total 
function gettotal() {
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result ;
        total.style.background = "#040";
    }
    else{
        total.innerHTML = '' ;
        total.style.backgroundColor = "red";
    }
}
// create product 
let arrproduct;
if(localStorage.getItem('product') != null){
    arrproduct = JSON.parse(localStorage.getItem('product'))
}
else{
arrproduct = [];
}
submit.onclick = function(){
    let newpro = {
        title : title.value.toLowerCase() ,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value ,
        discount : discount.value,
        total : total.innerHTML ,
        count : count.value,
        category : category.value.toLowerCase()
    }
if(title.value != ''&& count.value < 1500 && price.value != ''){
        if(mood === 'Creat'){
if (newpro.count > 1 ) {
    for(let i=0 ; i<newpro.count ; i++){
        arrproduct.push(newpro)
    }
}
else{
    arrproduct.push(newpro)
}
    }
    else{
        arrproduct[tmp] =newpro;
        mood = 'Creat';
        submit.innerHTML = "Creat";
        count.style.display = 'block';
    }
    cleardata()
}
localStorage.setItem('product' , JSON.stringify(arrproduct))
cleardata()
showdata()
}
// clear inputs
function cleardata(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '' ;
total.innerHTML = '';
count.value = '';
category.value = '';
}
// read
function showdata(){
    gettotal()
let table = '';
for(let i=0 ; i < arrproduct.length ;i++){
    table += `
     <tr>
    <td>${i+1}</td>
    <td>${arrproduct[i].title}</td>
    <td>${arrproduct[i].price}</td>
    <td>${arrproduct[i].taxes}</td>
    <td>${arrproduct[i].ads}</td>
    <td>${arrproduct[i].discount}</td>
    <td>${arrproduct[i].total}</td>
    <td>${arrproduct[i].category}</td>
    <td><button onclick="updatepro(${i})" id="update">Update</button></td>
    <td><button onclick="deletdata(${i})" id="delete">Delete</button></td>
    </tr>
    `

}
let btndelete = document.getElementById('deleteall');
document.getElementById('tbody').innerHTML = table ;
if(arrproduct.length > 0){
    btndelete.innerHTML = `<button onclick="Deleteall()">Delete All (${arrproduct.length})</button>`
}
else{
    btndelete.innerHTML= '';
}
}
showdata()
//delete
function deletdata(i) {
    arrproduct.splice(i,1);
    localStorage.setItem('product' , JSON.stringify(arrproduct));
    showdata();
}
function Deleteall(){
    localStorage.removeItem('product');
    arrproduct.splice(0);
    showdata();
}
//update
function updatepro(i){
title.value = arrproduct[i].title;
price.value = arrproduct[i].price;
taxes.value = arrproduct[i].taxes;
ads.value = arrproduct[i].ads;
discount.value = arrproduct[i].discount;
category.value = arrproduct[i].category;
gettotal()
count.style.display = 'none';
submit.innerHTML = "Update";
mood = 'Update';
tmp = i ;
scroll({
    top:0,
    behavior:'smooth',
})
}
// search 
let searchmood = 'title' ;
function getsearchmood(id){
    let search = document.getElementById('search');
if(id == 'searchtitle'){
    searchmood = 'title';
}else{
    searchmood = 'category';
}
 search.placeholder = 'Search By '+ searchmood;
search.focus()
search.value = '';
showdata()
}
function searchdata(value){
    let table = '';
    for(let i = 0 ; i < arrproduct.length ; i++){
if(searchmood == 'title'){
    if(arrproduct[i].title.includes(value.toLowerCase())){
    table += `
     <tr>
    <td>${i}</td>
    <td>${arrproduct[i].title}</td>
    <td>${arrproduct[i].price}</td>
    <td>${arrproduct[i].taxes}</td>
    <td>${arrproduct[i].ads}</td>
    <td>${arrproduct[i].discount}</td>
    <td>${arrproduct[i].total}</td>
    <td>${arrproduct[i].category}</td>
    <td><button onclick="updatepro(${i})" id="update">Update</button></td>
    <td><button onclick="deletdata(${i})" id="delete">Delete</button></td>
    </tr>
    `
    }
}else{
    if(arrproduct[i].category.includes(value.toLowerCase())){
    table += `
     <tr>
    <td>${i}</td>
    <td>${arrproduct[i].title}</td>
    <td>${arrproduct[i].price}</td>
    <td>${arrproduct[i].taxes}</td>
    <td>${arrproduct[i].ads}</td>
    <td>${arrproduct[i].discount}</td>
    <td>${arrproduct[i].total}</td>
    <td>${arrproduct[i].category}</td>
    <td><button onclick="updatepro(${i})" id="update">Update</button></td>
    <td><button onclick="deletdata(${i})" id="delete">Delete</button></td>
    </tr>
    `
    }
}}
document.getElementById('tbody').innerHTML = table ;
}
// clean data 

