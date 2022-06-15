import { getBlog, renderBlog, curerntPageAcitive, paginational,
         handleCreateForm,  getDataEdit,  getDataDelete, getDataDetails, reload, translate } from './main.js';

window.addEventListener('load', function() {
    getBlog(function(blogs) {
        renderBlog(blogs);
        curerntPageAcitive();
        paginational(blogs);
        reload(blogs);
    });
    
    handleCreateForm();
    getDataDetails();
    getDataEdit();
    getDataDelete();
    translate();
});

