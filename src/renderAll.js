import { getData, postData, deleteData, putData, detailData } from './callAPI.js';

let loader = document.querySelector('.loader');
let page = document.querySelector('.page');
let btnReload = document.querySelector('.reload');
let btnNext = document.querySelector('.btn-next');
let btnPrev = document.querySelector('.btn-prev');
let btnFist = document.querySelector('.btn-fist');
let btnLast = document.querySelector('.btn-last');

let currentPage = 1;
let perPage = 10;
let totalPage;
let start = 0;
let end = perPage;

let blogs


function renderAll() {
    loader.classList.add('active');
    getData()
        .then(res => {
            blogs = res;
            renderPage()
            handleCreate();
            handleEdit()
            handleDelete()
            handleDetail()
            translate()
            pagination()
        })
        .catch(function(err) {
            console.log("Have Error:", err);
        })
};

function render() {
    loader.classList.add('active');
    getData()
        .then(res => {
            blogs = res
            renderPage()
        })
}

//----------Render----------
function renderPage() {
    let tableBody = document.getElementById('table-body');
    let tableData = '';
    blogs.forEach(function(blog, index) {
        let { id, title, content, createdAt } = blog;
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
    handleCreate();
    handleEdit()
    handleDelete()
    handleDetail()
};

//----------Pagination----------
function pagination() {

    function renderBtnReload() {
        btnReload.innerHTML = `<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`;
    };
    renderBtnReload()

    function curerntPageAcitive() {
        page.innerHTML = `<p>${currentPage}</p>`
    };
    curerntPageAcitive();

    function renderPerItem() {
        let perItem = document.querySelector('.perItem');
        for (let j = 10; j <= 40; j += 10) {
            perItem.innerHTML += `<option>${j}</option>`
        }
        perItem.onchange = function() {
            let perItemValue = document.querySelector('.perItem').value;
            perPage = perItemValue;
            totalPage = Math.round(Math.ceil(blogs.length) / perPage);
            currentPage = 1;
            caculatePage();
        }
    };
    renderPerItem()

    function caculatePage() {
        start = (currentPage - 1) * perPage;
        end = currentPage * perPage;
        curerntPageAcitive();
        renderPage();
        renderBtnReload();
    }

    function caculateLast() {
        start = (currentPage - 1) * perPage;
        end = blogs.length;
        curerntPageAcitive();
        renderPage();
        renderBtnReload();
    }

    btnNext.addEventListener('click', function() {
        totalPage = Math.ceil((blogs.length / perPage))
        if (currentPage >= totalPage) {
            currentPage = totalPage;
            caculateLast()
        } else {
            currentPage++;
            caculatePage();
        }
    });

    btnPrev.addEventListener('click', function() {
        totalPage = Math.ceil((blogs.length / perPage))
        if (currentPage <= 1) {
            currentPage = 1;
            caculatePage()
        } else {
            currentPage--;
            caculatePage();
        }
    })

    btnFist.addEventListener('click', function() {
        currentPage = 1;
        caculatePage();
    })

    btnLast.addEventListener('click', function() {
        totalPage = Math.ceil((blogs.length / perPage))
        currentPage = totalPage;
        caculateLast()
    })

}

//----------CRUD----------
function handleCreate() {
    let createBtn = document.getElementById('create');
    createBtn.onclick = function(e) {
        e.preventDefault();
        let title = document.querySelector('input[name="title"]').value;
        let content = document.querySelector('input[name="content"]').value;
        let createAt = document.querySelector('input[name="createAt"]').value;
        let image = document.querySelector('input[name="image"]').value;

        let data = {
            title: title,
            content: content,
            image: image,
            createAt: createAt,
        }
        postData(data)
            .then(res => {
                if (res) {
                    getData()
                        .then(item => {
                            render()
                        })
                        .then(item => {
                            document.querySelector('input[name="title"]').value = "";
                            document.querySelector('input[name="content"]').value = "";
                            document.querySelector('input[name="createAt"]').value = "";
                            document.querySelector('input[name="image"]').value = "";
                        })
                }
            })


    }
};

//Handle Editable
function handleEdit() {
    let btnEdit = document.querySelectorAll('.btn-edit');
    btnEdit.forEach(function(item) {
        let editId = item.getAttribute("data-edit");
        item.addEventListener("click", function(e) {
            document.querySelector('input[name="title"]').value = document.querySelector('.item-title-' + editId).textContent;
            document.querySelector('input[name="content"]').value = document.querySelector('.item-content-' + editId).textContent;
            document.querySelector('input[name="createAt"]').value = document.querySelector('.item-createAt-' + editId).textContent;
            // document.querySelector('input[name="image"]').value = document.querySelector('.item-image-'+id).src;

            let createBtn = document.querySelector('#create');
            let formTitle = document.querySelector('.form-title');
            document.querySelector('.pic').style.display = 'none';
            document.querySelector('input[name="image"]').style.display = 'block';
            createBtn.textContent = "Save";
            formTitle.textContent = "Update Information";

            createBtn.onclick = function(e) {
                e.preventDefault();
                let title = document.querySelector('input[name="title"]').value;
                let content = document.querySelector('input[name="content"]').value;
                let createAt = document.querySelector('input[name="createAt"]').value;
                let image = document.querySelector('input[name="image"]').value;

                let data = {
                    title: title,
                    content: content,
                    createAt: createAt,
                    image: image,
                }

                putData(editId, data)
                    .then(res => {
                        if (res) {
                            getData()
                                .then(item => {
                                    render()
                                })
                                .then(res => {
                                    createBtn.textContent = "Create";
                                    formTitle.textContent = "Create New Record"
                                    document.querySelector('input[name="title"]').value = "";
                                    document.querySelector('input[name="content"]').value = "";
                                    document.querySelector('input[name="createAt"]').value = "";
                                    document.querySelector('input[name="image"]').value = "";
                                })
                                .then(res => {
                                    handleCreate()
                                })
                        }
                    })
            }
        })
    });
};

function translate() {
    let btnTrans = document.querySelector('.trans-create');
    btnTrans.addEventListener('click', function(e) {
        let createBtn = document.querySelector('#create');
        let formTitle = document.querySelector('.form-title');
        createBtn.textContent = "Create";
        formTitle.textContent = "Create New Record";
        handleCreate();
        document.querySelector('input[name="title"]').value = "";
        document.querySelector('input[name="content"]').value = "";
        document.querySelector('input[name="createAt"]').value = "";
        document.querySelector('input[name="image"]').value = "";
    })
};

//Handle delete
function handleDelete() {
    let btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(function(item) {
        let deleteId = item.getAttribute("data-id");
        item.addEventListener("click", function() {
            deleteData(deleteId)
                .then(res => {
                    if (res.id == deleteId) {
                        getData()
                            .then(blogs => {
                                render()
                            })
                    }
                });
        })
    });
};

//Handle details
function handleDetail() {
    let btnDetail = document.querySelectorAll('.btn-detail');
    btnDetail.forEach(function(item) {
        let detailId = item.getAttribute("data-detail");
        item.addEventListener("click", function() {
            console.log("d");
            detailData(detailId)
                .then(res => {
                    if (res.id == detailId) {
                        renderDetail(res)
                    } else {
                        console.log("Error");
                    }
                })
                .then(res => {

                })

        })
    })
};

function renderDetail(data) {
    let details = document.querySelector('.details');
    let dataDetail
    let { id, title, content, createdAt, image } = data;
    let date = new Date(createdAt);
    let dateFull = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + " " +
        date.getHours() + ":" + date.getMinutes();

    dataDetail = ` 
    <div class="blog-detail-${id}">
    <div><label class=lable>Title</label>: ${id}</div>
    <div class="item-title-${id}"><label class=lable>Title</label>: ${title}</div>
    <div class="item-content-${id}"><label class=lable>Content</label>: ${content}</div>
    <div class="item-createAt-${id}"><label class=lable>Created At</label>: ${dateFull}</div>
    <div class="imageDetail" ><label class=lable>Pictures</label>: <img class="item-image-${id} img-detail" src=${image}/></div>
    </div> `

    details.innerHTML = dataDetail
}

export { renderAll, render };