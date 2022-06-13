
let urlBlog = 'https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs/';

let paginationNumber = document.getElementById('number-page');
let btnNext = document.querySelector('.btn-next')
let btnPrev = document.querySelector('.btn-prev')

let currentPage = 1;
let perPage =10;
let start = 0;
let end = perPage;
let totalPage
//start = (currentPage -1) * perPage
//end = currentPage * perPage
// Example:   page1:currentPage = 1, start = (1-1) * 3 = 0, end = 1* 3 = 3 
            //page2:currentPage = 2, start = (2-1) * 3 = 3, end = 2* 3 = 6 

function toStart() {
    getBlog(function (blogs) {
        renderBlog(blogs);
        renderListPages (blogs);
        changePageNumber(blogs);
        nextPage(blogs);
        prevPage(blogs);

        handleCreateForm ()

    })
}
toStart();

function getBlog(callback) {
    fetch(urlBlog)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (error) {
            console.log(error);
        })
}

function renderBlog(blogs) {
    let tableBody = document.getElementById('table-body');
    let tableData = '';
    blogs.map(function (blog, index) {
        let {id, title, content, createdAt, image} = blog;

         let date = new Date(createdAt);
         let dateFull = date.getMonth() + '/' + date.getDate()  + '/' + date.getFullYear() +  " " + 
         date.getHours() + ":" + date.getMinutes()

            if(index >= start && index < end) {
            tableData += ` 
            <tr class="col">
                <td>${id}</td>
                <td>${title}</td>
                <td>${content}</td>
                <td>${dateFull}</td>
                <td><img src="${image}" alt='pic'/></td>
                <td><button onclick = "handleEdit(${id})">Details</button></td>
                <td><button>Edit</button></td>
                <td><button onclick = "handleDelete(${id})">Delete</button></td>
            </tr> `
            }
    })
    tableBody.innerHTML = tableData;   
}

function getCurrentPage (currentPage) {
    start = (currentPage -1) * perPage
    end = currentPage * perPage;

}

function changePageNumber(blogs) {
    let currentPages = document.querySelectorAll('#number-page li')
    for(let i = 0; i < currentPages.length; i++) {
        currentPages[i].addEventListener('click', function() {
            let value = i + 1;
            currentPages = value;
            currentPage = currentPages
            getCurrentPage(currentPages)
            renderBlog(blogs)
        })
    }
 }

function nextPage(blogs) {
    btnNext.addEventListener('click', function() {
        currentPage ++;
        if(currentPage > totalPage) {
            currentPage = totalPage;
        }
        start = (currentPage -1) * perPage
        end = currentPage * perPage;
        renderBlog(blogs);
    })
}

function prevPage(blogs) {
    btnPrev.addEventListener('click', function() {
        currentPage --;
        if(currentPage <= 1) {
            currentPage = 1;
        }
        start = (currentPage -1) * perPage
        end = currentPage * perPage;
        renderBlog(blogs);
    })
}

function renderListPages (blogs) {
    totalPage = Math.ceil(blogs.length) / perPage;
    for (let i = 0; i < totalPage; i++) {
        paginationNumber.innerHTML += `<li>${i + 1}</li>`
    }
}




/*-----CRUD----- */

function handleCreateForm () {
    let createBtn = document.getElementById('create');
    createBtn.onclick = function () {
        let id = document.querySelector('input[name="id"]').value;
        let title = document.querySelector('input[name="title"]').value;
        let content = document.querySelector('input[name="content"]').value;
        let createAt = document.querySelector('input[name="createAt"]').value;
        let image = document.querySelector('input[name="image"]').value;
        
        let dataForm = {
            id:id,
            title:title,
            content:content,
            createAt:createAt,
            image:image,
        }

        handleCreate(dataForm);
        getBlog(function(blogs) {
            renderBlog(blogs)
        })
    }
}

function handleCreate (data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(urlBlog, options)
        .then(res => res.json())
        .then(res => {console.log(res)})
}

function handleDelete (id) {
    fetch(urlBlog + id, { method: 'DELETE' })
        .then(res => res.text())
        .then(res => {console.log(res)});

    // getBlog(function(blogs) {
         //renderBlog()
    // })
}







