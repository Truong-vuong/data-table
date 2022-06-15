 let urlBlog = 'https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs';

// let urlBlog = 'https://my.api.mockaroo.com/datatable.json?key=87f480d0';
// let urlPost = 'https://my.api.mockaroo.com/datatable.json?key=87f480d0&__method=POST';
// let urlPut = 'https://my.api.mockaroo.com/datatable/id.json?key=87f480d0&__method=PUT';
// let urlDelete = 'https://my.api.mockaroo.com/datatable.json?key=87f480d0&__method=DELETE';

let paginationNumber = document.getElementById('number-page');
let btnNext = document.querySelector('.btn-next')
let btnPrev = document.querySelector('.btn-prev');
let btnFist = document.querySelector('.btn-fist')
let btnLast = document.querySelector('.btn-last');
let btnReload = document.querySelector('.reload');
let load = document.querySelector('.load')
let loader = document.querySelector('.loader');

let currentPage = 1;
let perPage = 10;
let start = 0;
let end = perPage;
let totalPage
    //start = (currentPage -1) * perPage
    //end = currentPage * perPage
    // Example:   page1:currentPage = 1, start = (1-1) * 3 = 0, end = 1* 3 = 3 
    //page2:currentPage = 2, start = (2-1) * 3 = 3, end = 2* 3 = 6 

function toStart() {
    
    getBlog(function(blogs) {
        renderBlog(blogs);
        rederPerItem (blogs);
        fresherItem (blogs);
        reload(blogs)
        // renderListPages(blogs);
        nextPage(blogs);
        prevPage(blogs);
        fistPage(blogs);
        lastPage(blogs);
        handleCreateForm(blogs);
        // choosePages(blogs)
    })
}
toStart();

function getBlog(callback) {
  loader.classList.add('active')
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
}

function renderBlog(blogs) {
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
                <td ><img class="item-image-${id} image-hide" src=${image}/></td>
                <td><button class="btn" onclick = "handleDetails(${id})">Details</button></td>
                <td><button class="btn btn-blue"onclick = "handleEditForm(${id})"><i class='bx bx-edit-alt'></i></button></td>
                <td><button class="btn btn-red" onclick = "handleDelete(${id})"><i class='bx bx-x'></i></button></td>
            </tr> `
        }
    })
    tableBody.innerHTML = tableData;
    loader.classList.remove('active')
}

//Pagination-----------------------
function getCurrentPage(currentPage) {
    start = (currentPage - 1) * perPage
    end = currentPage * perPage;
}

let page = document.querySelector('.page');
page.innerHTML = `<p>${currentPage}</p>`

// function renderListPages(blogs) {
//     totalPage = Math.ceil(blogs.length) / perPage;
//     for (let i = 0; i < totalPage; i++) {
//         paginationNumber.innerHTML += `<option>${i + 1}</option>`
//     }
//     let btnReload = document.querySelector('.reload');
//     btnReload.innerHTML =`<span>${start}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
// }

function fresherItem (blogs) {
    let perItem = document.querySelector('.perItem');
    perItem.onchange = function() {
        let perItemValue = document.querySelector('.perItem').value;
        perPage = perItemValue;
        currentPage =1;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage; 
        load.classList.add('bx-spin')
        renderBlog(blogs)
        // rederPerItem (blogs)
        load.classList.remove('bx-spin')
    }
    
    btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
}

function reloadPerItem(blogs) {
    currentPage =1;
    page.innerHTML = `<p>${currentPage}</p>`;
    let perItemValue = document.querySelector('.perItem').value;
        perPage = perItemValue;
    start = (currentPage - 1) * perPage
    end = currentPage * perPage;
    btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span> `
    load.classList.add('bx-spin')
    renderBlog(blogs)
    setTimeout(function () {
        load.classList.remove('bx-spin')
    },500)

    fresherItem (blogs);
}


function rederPerItem (blogs) {
    let perItem = document.querySelector('.perItem');
    for(let j= 10; j <=40; j+=10) {
        perItem.innerHTML += `<option>${j}</option>`
       }
    perItem.onchange = function() {
        let perItemValue = document.querySelector('.perItem').value;
        perPage = perItemValue;
        currentPage =1;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage; 
        load.classList.add('bx-spin')
        renderBlog(blogs)
        reloadPerItem(blogs)
        fresherItem (blogs);
        load.classList.remove('bx-spin')
    }  
    btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
}

// function choosePages(blogs) {
//     let numberPage = document.querySelector('#number-page');
//     numberPage.onchange = function() {
//         let numberPageValue = document.getElementById('number-page').value;
//         currentPage = numberPageValue;
//         page.innerHTML = `<p>${currentPage}</p>`
//         start = (currentPage - 1) * perPage
//         end = currentPage * perPage;
//         renderBlog(blogs)
//     }
// }

function nextPage(blogs) {
    btnNext.addEventListener('click', function() {
        totalPage = Math.round(Math.ceil(blogs.length) / perPage);
        if (currentPage >= totalPage) {
            currentPage = totalPage;
            page.innerHTML = `<p>${currentPage}</p>`
            start = (currentPage - 1) * perPage
            end = currentPage * perPage;
            btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
            load.classList.add('bx-spin')
            renderBlog(blogs)
            setTimeout(function () {
                load.classList.remove('bx-spin')
            },500)
        }else {
            currentPage++;
            page.innerHTML = `<p>${currentPage}</p>`
            start = (currentPage - 1) * perPage
            end = currentPage * perPage;
            btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
            load.classList.add('bx-spin')
            renderBlog(blogs)
            setTimeout(function () {
                load.classList.remove('bx-spin')
            },500)
        }    
    })
}

function prevPage(blogs) {
    btnPrev.addEventListener('click', function() {
        if (currentPage <= 1) {
            currentPage = 1;
            start = (currentPage - 1) * perPage
            end = currentPage * perPage;
            load.classList.add('bx-spin')
            renderBlog(blogs)
            setTimeout(function () {
                load.classList.remove('bx-spin')
            },500)
        }else {
            currentPage--;
            page.innerHTML = `<p>${currentPage}</p>`
            start = (currentPage - 1) * perPage
            end = currentPage * perPage;
            btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
            load.classList.add('bx-spin')
            renderBlog(blogs)
            setTimeout(function () {
                load.classList.remove('bx-spin')
            },500)
        }
    })
}

function fistPage(blogs) {
    btnFist.addEventListener('click', function() {
        currentPage = 1;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
        load.classList.add('bx-spin')
            renderBlog(blogs)
            setTimeout(function () {
                load.classList.remove('bx-spin')
            },500)
    })
}

function lastPage(blogs) {
    btnLast.addEventListener('click', function() {
        switch (perPage) {
            case 10:
                totalPage = Math.round(Math.ceil(blogs.length) / 10);
                currentPage = totalPage;
                page.innerHTML = `<p>${currentPage}</p>`
                start = (currentPage - 1) * perPage
                end = currentPage * perPage;
                btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
                load.classList.add('bx-spin')
                renderBlog(blogs)
                setTimeout(function () {
                    load.classList.remove('bx-spin')
                },500)
                break;
             case 20:
                totalPage = Math.round(Math.ceil(blogs.length) / 20);
                currentPage = totalPage;
                page.innerHTML = `<p>${currentPage}</p>`
                start = (currentPage - 1) * perPage
                end = currentPage * perPage;
                btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
                load.classList.add('bx-spin')
                renderBlog(blogs)
                setTimeout(function () {
                    load.classList.remove('bx-spin')
                },500)
                break;
             case 30:
                totalPage = Math.round(Math.ceil(blogs.length) / 30);
                currentPage = totalPage;
                page.innerHTML = `<p>${currentPage}</p>`
                start = (currentPage - 1) * perPage
                end = currentPage * perPage;
                btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
                load.classList.add('bx-spin')
                renderBlog(blogs)
                setTimeout(function () {
                    load.classList.remove('bx-spin')
                },500)
                break;
             case 40:
                totalPage = Math.round(Math.ceil(blogs.length) / 40);
                currentPage = totalPage;
                page.innerHTML = `<p>${currentPage}</p>`
                start = (currentPage - 1) * perPage
                end = currentPage * perPage;
                btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
                load.classList.add('bx-spin')
            renderBlog(blogs)
            setTimeout(function () {
                load.classList.remove('bx-spin')
            },500)
                break;
            default:
                break;
        }
        totalPage = Math.round(Math.ceil(blogs.length) / perPage);
        currentPage = totalPage;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
        load.classList.add('bx-spin')
        renderBlog(blogs)
        setTimeout(function () {
            load.classList.remove('bx-spin')
        },500)
    })
}

function reload(blogs) {
    btnReload.addEventListener('click',function () {
        currentPage =1;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        btnReload.innerHTML =`<span>${start+1}</span>-<span>${end}</span>/<span>${blogs.length}</span> `
        load.classList.add('bx-spin')
        renderBlog(blogs)
        setTimeout(function () {
            load.classList.remove('bx-spin')
        },500)

        getBlog(function(blogs) {
            renderBlog(blogs);
            fresherItem (blogs);
        })
    })
}

/*-----CRUD----- */
function handleCreateForm(blogs) {
    document.querySelector('.pic').style.display = 'none';
    document.querySelector('input[name="image"]').style.display = 'block';
    let createBtn = document.getElementById('create');
    createBtn.onclick = function(e) {
        e.preventDefault();
        // let id = document.querySelector('input[name="id"]').value;
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
        content=""
        
    }
}

function handleCreate(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(urlBlog, options)
        .then(res => res.json())
        .then(res => {
          return  getBlog(function(blogs) {
                renderBlog(blogs);
                fresherItem (blogs);
            })
        })
}

function handleDelete(id) {
    fetch(urlBlog + '/' + id, { method: 'DELETE', })
        .then(res => res.json())
        .then(res => {
            //update DOM
            // console.log(res)
            // let blogItem = document.querySelector('.blog-item-' + id);
            // console.log(blogItem);
            // if (blogItem) {
            //     blogItem.remove();
            // }

            //call API 
            getBlog(function(blogs) {
                renderBlog(blogs);
                fresherItem (blogs);
            })

            
        });
}

///////////////////
function handleEditForm(id) {
    document.querySelector('input[name="title"]').value = document.querySelector('.item-title-'+id).textContent;
    document.querySelector('input[name="content"]').value = document.querySelector('.item-content-'+id).textContent;
    document.querySelector('input[name="createAt"]').value = document.querySelector('.item-createAt-'+id).textContent;
    // document.querySelector('input[name="image"]').value = document.querySelector('.item-image-'+id).src;

    // Lấy Btn Element và đổi tên hiển thị thành "Save"+********
   let createBtn = document.querySelector('#create');
   let formTitle = document.querySelector('.form-title');
   document.querySelector('.pic').style.display = 'none';
   document.querySelector('input[name="image"]').style.display = 'block';
    createBtn.textContent = "Save";
    formTitle.textContent = "Update Information"

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
        .then(function(response) {
            response.json();
        })
        .then((json) => {
            //update DOM
            // document.querySelector('.item-title-'+id).textContent = title;
            // document.querySelector('.item-content-'+id).textContent = content;
            // document.querySelector('.item-createAt-'+id).textContent = createAt;
            // // document.querySelector('.item-image-'+id).textContent = image;

            // Đổi lại tên nút thành "Create" và xóa các giá trị tại các ô input
            createBtn.textContent = "Create";
            formTitle.textContent = "Create New Record"
            document.querySelector('input[name="title"]').value = "";
            document.querySelector('input[name="content"]').value = "";
            document.querySelector('input[name="createAt"]').value = "";
            document.querySelector('input[name="image"]').value = "";

            loader.style.display = 'block';
            //Call API
            getBlog(function(blogs) {
                loader.style.display = 'block';
                renderBlog(blogs);
                fresherItem (blogs);
            })
            loader.style.display = 'block';
            // Gọi lại hàm handleCreateForm để trả lại chức năng cho nút "Create"
            handleCreateForm()
        })
    }
}

function handleDetails(id,image) {
    (document.querySelector('input[name="title"]').value) = document.querySelector('.item-title-'+id).textContent;
    document.querySelector('input[name="content"]').value = document.querySelector('.item-content-'+id).textContent;
    document.querySelector('input[name="createAt"]').value = document.querySelector('.item-createAt-'+id).textContent;
    document.querySelector('input[name="image"]').value = document.querySelector('.item-image-'+id).src;
    document.querySelector('input[name="image"]').style.display = 'none';
    document.querySelector('.pic').style.display = 'block';
    document.querySelector('.pic').src = document.querySelector('.item-image-'+id).src;

    // Lấy Btn Element và đổi tên hiển thị thành "Save"+********
   let createBtn = document.querySelector('#create').disabled ;
   let formTitle = document.querySelector('.form-title');

    formTitle.textContent = "Details";

}

