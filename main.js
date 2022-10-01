let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let moood = 'create';
let elguett;


// get total
function gettotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
         total.innerHTML = result;
         total.style.background = '#32c905';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#aa0e03';
    }
}

// create product
let dataPro;
if(localStorage.Product != null){
    dataPro = JSON.parse(localStorage.Product)
}
else{
    dataPro = [];
}


submit.onclick = function()
{
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value, 
        count:count.value, 
        total:total.innerHTML,
        category:category.value.toLowerCase(),
    }

    if(title.value != ''
        && price.value != ''
        && category.value != ''
        && newPro.count < 1000){

        if(moood === 'create'){
            dataPro.push(newPro);
        }else{
            dataPro[  elguett  ] = newPro;
            moood = 'create';
            submit.innerHTML = 'Create';
        }
        clearData()

    }
    



// save localstorage
localStorage.setItem('Product',   JSON.stringify(dataPro)  )

showData()

}




// clear inputs
function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = ''; 
    count.value = ''; 
    total.innerHTML = '';
    category.value = '';
}


// read
function showData()
{
    gettotal()
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update"><i class="fas fa-edit btnedit"></button></td>
            <td><button onclick="deleteData( ${i} )" id="delete"><i class="fas fa-trash-alt btndelete"></button></td>
        </tr>
        `;
    }


    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML = '';
    } 

}
showData()

// count
// delete
function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.Product = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount; 
    count.value = dataPro[i].count;
    gettotal()
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    moood = 'update';
    elguett = i;
    scroll({
        top:0,
        behavior: 'smooth',
    })
}


// search
let searchmoood = 'title';
function getdearchmoood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchtitle')
    {
        searchmoood = 'title';
        
    }
        else{
                searchmoood = 'category';
                
            }
            search.placeholder = 'Search By '+ searchmoood;
        search.focus(); 
        search.value   = '';
        showData();
    
}

function searchData(value)
{
    let table = '';
    for(let i =0; i < dataPro.length;i++){
    if(searchmoood == 'title')
    {
        
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
                <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
                </tr>`;
            }
        



    }else{

        
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
        </tr>
        `;
            }
       

    }
}

    document.getElementById('tbody').innerHTML = table;

} 







// clean data
