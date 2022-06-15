// function renderListPages(blogs) {
//     totalPage = Math.ceil(blogs.length) / perPage;
//     for (let i = 0; i < totalPage; i++) {
//         paginationNumber.innerHTML += `<option>${i + 1}</option>`
//     }
//     let btnReload = document.querySelector('.reload');
//     btnReload.innerHTML =`<span>${start}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
// }


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


//     switch (perPage) {
    //         case 10:
    //             totalPage = Math.round(Math.ceil(blogs.length) / 10);
    //             currentPage = totalPage;
    //             curerntPageAcitive();
    //             start = (currentPage - 1) * perPage
    //             end = blogs.length;
    //             btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
    //             renderBlog(blogs);
    //             break;
    //          case 20:
    //             totalPage = Math.round(Math.ceil(blogs.length) / 20);
    //             currentPage = totalPage;
    //             curerntPageAcitive();
    //             start = (currentPage - 1) * perPage
    //             end =  blogs.length;
    //             btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
    //             renderBlog(blogs);
    //             break;
    //          case 30:
    //             totalPage = Math.round(Math.ceil(blogs.length) / 30);
    //             currentPage = totalPage;
    //             curerntPageAcitive();
    //             start = (currentPage - 1) * perPage
    //             end =  blogs.length;
    //             btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
    //             renderBlog(blogs);
    //             break;
    //          case 40:
    //             totalPage = Math.round(Math.ceil(blogs.length) / 40);
    //             currentPage = totalPage;
    //             curerntPageAcitive();
    //             start = (currentPage - 1) * perPage
    //             end =  blogs.length;
    //             btnReload.innerHTML =`<span>${start +1}</span>-<span>${end}</span>/<span>${blogs.length}</span>`
    //             renderBlog(blogs);
    //             break;
    //         default:
    //     }