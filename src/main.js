let urlBlog = 'https://my.api.mockaroo.com/datatable.json?key=87f480d0&pageSize=20/';

let paginationNumber = document.getElementById('number-page');
let btnNext = document.querySelector('.btn-next')
let btnPrev = document.querySelector('.btn-prev');
let btnFist = document.querySelector('.btn-fist')
let btnLast = document.querySelector('.btn-last')

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
        console.log(blogs);
        renderBlog(blogs);
        renderListPages(blogs);
        nextPage(blogs);
        prevPage(blogs);
        fistPage(blogs);
        lastPage(blogs);
        handleCreateForm(blogs);
        choosePages(blogs)
    })
}
toStart();

function getBlog(callback) {
    fetch(urlBlog)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(error) {
            console.log(error);
        })
}

function renderBlog(blogs) {
    let tableBody = document.getElementById('table-body');
    let tableData = '';
    blogs.map(function(blog, index) {
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
                <td><img src="${image}" alt='pic' class="item-image-${id}" /></td>
                <td><button class="btn"onclick = "handleDetails(${id})">Details</button></td>
                <td><button class="btn btn-blue"onclick = "handleEditForm(${id})">Edit</button></td>
                <td><button class="btn btn-red"onclick = "handleDelete(${id})">Delete</button></td>
            </tr> `
        }
    })
    tableBody.innerHTML = tableData;
}

function getCurrentPage(currentPage) {
    start = (currentPage - 1) * perPage
    end = currentPage * perPage;

}

let page = document.querySelector('.page');
page.innerHTML = `<p>${currentPage}</p>`

function renderListPages(blogs) {
    totalPage = Math.ceil(blogs.length) / perPage;

    for (let i = 0; i < totalPage; i++) {
        paginationNumber.innerHTML += `<option>${i + 1}</option>`
    }
}

function choosePages(blogs) {
    let numberPage = document.querySelector('#number-page');
    numberPage.onchange = function() {
        let numberPageValue = document.getElementById('number-page').value;
        currentPage = numberPageValue;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        renderBlog(blogs)
    }
}

function nextPage(blogs) {
    btnNext.addEventListener('click', function() {
        currentPage++;
        page.innerHTML = `<p>${currentPage}</p>`
        if (currentPage > totalPage) {
            currentPage = totalPage;
        }
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        renderBlog(blogs);
    })
}

function prevPage(blogs) {
    btnPrev.addEventListener('click', function() {
        currentPage--;
        page.innerHTML = `<p>${currentPage}</p>`
        if (currentPage <= 1) {
            currentPage = 1;
        }
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        renderBlog(blogs);
    })
}

function fistPage(blogs) {
    btnFist.addEventListener('click', function() {
        currentPage = 1;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        renderBlog(blogs);
    })
}

function lastPage(blogs) {
    btnLast.addEventListener('click', function() {
        let currentPages = document.querySelectorAll('#number-page option')
        currentPage = currentPages.length;
        page.innerHTML = `<p>${currentPage}</p>`
        start = (currentPage - 1) * perPage
        end = currentPage * perPage;
        renderBlog(blogs);
    })
}

/*-----CRUD----- */

function handleCreateForm(blogs) {
    let createBtn = document.getElementById('create');
    createBtn.onclick = function() {
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
    }
    getBlog(function() {
        renderBlog(blogs)
    })
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
            console.log(res)

        })
}

function handleDelete(id) {
    fetch(urlBlog + id, { method: 'DELETE', })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let blogItem = document.querySelector('.blog-item-' + id);
            console.log(blogItem);
            if (blogItem) {
                blogItem.remove();
            }
        });
}


///////////////////

function handleEditForm(id) {

    // Lấy Name và Description tại phần tử muốn sửa để điền vào ô sửa Nam và Desc
    document.querySelector('input[name="title"]').value = document.querySelector('.item-title-'+id).textContent;
    document.querySelector('input[name="content"]').value = document.querySelector('.item-content-'+id).textContent;
    document.querySelector('input[name="createAt"]').value = document.querySelector('.item-createAt-'+id).textContent;
    document.querySelector('input[name="image"]').value = document.querySelector('.item-image-'+id).src;

    // Lấy Btn Element và đổi tên hiển thị thành "Save"
    var createBtn = document.querySelector('#create');
    createBtn.textContent = "Save";

    // Hàm bắt sự kiện tại nút "Save"
    createBtn.onclick = function() {
        var title = document.querySelector('input[name="title"]').value;
        var content = document.querySelector('input[name="content"]').value;
        var createAt = document.querySelector('input[name="createAt"]').value;
        var image = document.querySelector('input[name="image"]').value;

        var newData = {
            title: title,
            content: content,
            createAt: createAt,
            image: image,
        }

        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        };
        fetch(urlBlog + '/' + id, options)
            .then(function(response) {
                response.json();
            })

        // Hiển thị filed mới lên giao diện sau khi đã sửa
        .then(function() {
            document.querySelector('.item-title-'+id).textContent = title;
            document.querySelector('.item-content-'+id).textContent = content;
            document.querySelector('.item-createAt-'+id).textContent = createAt;
            document.querySelector('.item-image-'+id).textContent = image;
            // Đổi lại tên nút thành "Create" và xóa các giá trị tại 2 ô Name và Desc
            createBtn.textContent = "Create";
            document.querySelector('input[name="title"]').value = "";
            document.querySelector('input[name="content"]').value = "";
            document.querySelector('input[name="createAt"]').value = "";
            document.querySelector('input[name="image"]').value = "";
            // Gọi lại hàm handleCreateForm để trả lại chức năng cho nút "Create"
            handleCreateForm()
        })
    }

}