let urlBlog = 'https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs';

let loader = document.querySelector('.loader');
let btnNext = document.querySelector('.btn-next')
let btnPrev = document.querySelector('.btn-prev');
let btnFist = document.querySelector('.btn-fist');
let btnLast = document.querySelector('.btn-last');
let btnReload = document.querySelector('.reload');

let currentPage = 1;
let perPage = 10;
let start = 0;
let end = perPage;
let totalPage;

//Render--------------------
export function getBlog(callback) {
    loader.classList.add('active');
    fetch(urlBlog)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(error) {
            console.log(error);
        })
        .finally(function() {

        })
};

export function renderBlog(blogs) {
    let tableBody = document.getElementById('table-body');
    let tableData = '';
    blogs.forEach(function(blog, index) {
        let { id, title, content, createdAt, image } = blog;
        let date = new Date(createdAt);
        let dateFull = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + " " +
            date.getHours() + ":" + date.getMinutes()

        if (index >= start && index < end) {
            tableData += ` 
            <tr class="blog-item-${id} col">
                <td>${id}</td>
                <td class="item-title-${id}">${title}</td>
                <td class="item-content-${id}">${content}</td>
                <td class="item-createAt-${id}">${dateFull}</td>
                <td><button class="btn btn-detail" data-detail="${id}">Details</button></td>
                <td><button class="btn btn-blue btn-edit" data-edit="${id}"><i class='bx bx-edit-alt'></i></button></td>
                <td><button class="btn btn-red btn-delete " data-id="${id}"><i class='bx bx-x'></i></button></td>
            </tr> `
        }
    })
    tableBody.innerHTML = tableData;
    loader.classList.remove('active');
    getDataDetails();
    getDataEdit();
    getDataDelete();
};

//Pagination-----------------------
export function paginational (blogs) {
    fresherItem (blogs);
    renderPerItem(blogs);
    reloadPerItem(blogs);
    nextPage(blogs);
    prevPage(blogs);
    fistPage(blogs);
    lastPage(blogs);
};

export function curerntPageAcitive() {
    let page = document.querySelector('.page');
    page.innerHTML = `<p>${currentPage}</p>`
};

function fresherItem (blogs) {
    let perItem = document.querySelector('.perItem');
    perItem.onchange = function() {
        let perItemValue = document.querySelector('.perItem').value;
        perPage = perItemValue;
        currentPage =1;
        curerntPageAcitive();
        start = (currentPage - 1) * perPage
        end = currentPage * perPage; 
        renderBlog(blogs)
    }
    btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
};

function renderPerItem(blogs) {
    let perItem = document.querySelector('.perItem');
    for(let j= 10; j <=40; j+=10) {
        perItem.innerHTML += `<option>${j}</option>`
       }
    perItem.onchange = function() {
        let perItemValue = document.querySelector('.perItem').value;
        perPage = perItemValue;
        totalPage = Math.round(Math.ceil(blogs.length) / perPage);
        currentPage = 1;
        curerntPageAcitive();
        start = (currentPage - 1) * perPage;
        end = currentPage * perPage; 
        renderBlog(blogs);
        fresherItem (blogs);
    }  
    btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
};

function reloadPerItem(blogs) {
    currentPage =1;
    curerntPageAcitive();
    let perItemValue = document.querySelector('.perItem').value;
    perPage = perItemValue;
    start = (currentPage - 1) * perPage
    end = currentPage * perPage;
    btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span> `
    renderBlog(blogs)
    fresherItem(blogs);
}

function nextPage(blogs) {
    btnNext.addEventListener('click', function() {
        totalPage = Math.round(Math.ceil(blogs.length) / perPage);
        if (currentPage >= totalPage) {
            currentPage = totalPage;
            curerntPageAcitive();
            start = (currentPage - 1) * perPage;
            end = blogs.length;
            btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
            renderBlog(blogs);
        }else {
            currentPage++;
            curerntPageAcitive();
            start = (currentPage - 1) * perPage
            end = currentPage * perPage;
            btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
            renderBlog(blogs);
        }    
    })
};

function prevPage(blogs) {
    btnPrev.addEventListener('click', function() {
        if (currentPage <= 1) {
            currentPage = 1;
            start = (currentPage - 1) * perPage;
            end = currentPage * perPage;
            renderBlog(blogs);
        }else {
            currentPage--;
            curerntPageAcitive();
            start = (currentPage - 1) * perPage
            end = currentPage * perPage;
            btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
            renderBlog(blogs);
        }
    })
};

function fistPage(blogs) {
    btnFist.addEventListener('click', function() {
        currentPage = 1;
        curerntPageAcitive();
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
        renderBlog(blogs);
    })
};

function lastPage(blogs) {
    btnLast.addEventListener('click', function() {
        totalPage = Math.round(Math.ceil(blogs.length) / perPage);
        currentPage = totalPage;
        curerntPageAcitive();
        start = (currentPage - 1) * perPage
        end = blogs.length;
        btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
        renderBlog(blogs);
    })
};

//CRUD data API -----------------
export function handleCreateForm() {
    document.querySelector('.pic').style.display = 'none';
    document.querySelector('input[name="image"]').style.display = 'block';
    let createBtn = document.getElementById('create');
    createBtn.onclick = function(e) {
        e.preventDefault();
        let title = document.querySelector('input[name="title"]').value;
        let content = document.querySelector('input[name="content"]').value;
        let createAt = document.querySelector('input[name="createAt"]').value;
        let image = document.querySelector('input[name="image"]').value;

        let dataForm = {
            title: title,
            content: content,
            image: image,
            createAt: createAt,
        }
        handleCreate(dataForm);
        title='';
        content="";
        createAt='';
        image='';     
    }
};

function handleCreate(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(urlBlog, options)
        .then(response => response.json())
        .then(res => {
          return  getBlog(function(blogs) {
                    renderBlog(blogs);
                    fresherItem (blogs);
            })
        })
};

export function getDataDelete() {
    let btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(function(item,index) {
        let deleteId = item.getAttribute("data-id");
        item.addEventListener("click", function() {
        handleDelete(deleteId);
       })
    })   
};

function handleDelete(id) {
    fetch(urlBlog + '/' + id, { method: 'DELETE', })
    .then(res => res.json())
    .then(res => { 
        console.log(res);
        getBlog(function(blogs) {
            renderBlog(blogs);
            fresherItem (blogs);
        })
    })  
};

export function getDataEdit() {
    let btnEdit = document.querySelectorAll('.btn-edit');
    btnEdit.forEach(function(item,index) {
        let editId = item.getAttribute("data-edit");
        item.addEventListener("click", function() {
        handleEdit(editId);
       })
    })   
};

function handleEdit(id) {
    document.querySelector('input[name="title"]').value = document.querySelector('.item-title-'+id).textContent;
    document.querySelector('input[name="content"]').value = document.querySelector('.item-content-'+id).textContent;
    document.querySelector('input[name="createAt"]').value = document.querySelector('.item-createAt-'+id).textContent;
    // document.querySelector('input[name="image"]').value = document.querySelector('.item-image-'+id).src;

    //Lấy Btn Element và đổi tên hiển thị thành "Save"+********
    let createBtn = document.querySelector('#create');
    let formTitle = document.querySelector('.form-title');
    document.querySelector('.pic').style.display = 'none';
    document.querySelector('input[name="image"]').style.display = 'block';
    createBtn.textContent = "Save";
    formTitle.textContent = "Update Information";

    // Hàm bắt sự kiện tại nút "Save"
    createBtn.onclick = function(e) {
        e.preventDefault();
        let title = document.querySelector('input[name="title"]').value;
        let content = document.querySelector('input[name="content"]').value;
        let createAt = document.querySelector('input[name="createAt"]').value;
        let image = document.querySelector('input[name="image"]').value;

        let newData = {
            title: title,
            content: content,
            createAt: createAt,
            image: image,
        }
        
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        };
    
        fetch(urlBlog+'/'+ id, options)
            .then(response => response.json())
            .then((json) => {
            // Đổi lại tên nút thành "Create" và xóa các giá trị tại các ô input
            createBtn.textContent = "Create";
            formTitle.textContent = "Create New Record"
            document.querySelector('input[name="title"]').value = "";
            document.querySelector('input[name="content"]').value = "";
            document.querySelector('input[name="createAt"]').value = "";
            document.querySelector('input[name="image"]').value = "";
            //Call API
            getBlog(function(blogs) {
                renderBlog(blogs);
                fresherItem (blogs);
            })
            // Gọi lại hàm handleCreateForm để trả lại chức năng cho nút "Create"
            handleCreateForm()
        })
    }
};

export function getDataDetails() {
    let btnDetail = document.querySelectorAll('.btn-detail');
    btnDetail.forEach(function(item,index) {
        let detailId = item.getAttribute("data-detail");
        item.addEventListener("click", function() {
        handleDetails(detailId);
       })
    })   
};

function handleDetails(id) {
    let details = document.querySelector('.details');
    fetch(urlBlog + '/' + id)
        .then(res=> res.json())
        .then(blog=> {
            let { id, title, content, createdAt, image } = blog;
            let date = new Date(createdAt);
            let dateFull = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + " " +
                date.getHours() + ":" + date.getMinutes()

           let dataDetail
            dataDetail = ` 
            <div class="blog-detail-${id}">
               <div><label class=lable>Title</label>: ${id}</div>
               <div class="item-title-${id}"><label class=lable>Title</label>: ${title}</div>
               <div class="item-content-${id}"><label class=lable>Content</label>: ${content}</div>
               <div class="item-createAt-${id}"><label class=lable>Created At</label>: ${dateFull}</div>
               <div class="imageDetail" ><label class=lable>Pictures</label>: <img class="item-image-${id} img-detail" src=${image}/></div>
            </div> `
            details.innerHTML = dataDetail
        })
};

export function reload(blogs) {
    btnReload.addEventListener('click',function () {
        currentPage =1;
        curerntPageAcitive();
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span> `
        getBlog(function(blogs) {
            renderBlog(blogs);
            fresherItem (blogs);
        })
    })
};

export function translate() {
    let btnTrans = document.querySelector('.trans-create');
    btnTrans.addEventListener('click', function(e) {
        let createBtn = document.querySelector('#create');
        let formTitle = document.querySelector('.form-title');
        createBtn.textContent = "Create";
        formTitle.textContent = "Create New Record";
        handleCreateForm();
        document.querySelector('input[name="title"]').value = "";
        document.querySelector('input[name="content"]').value = "";
        document.querySelector('input[name="createAt"]').value = "";
        document.querySelector('input[name="image"]').value = "";
    })
};