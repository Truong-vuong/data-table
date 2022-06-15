import { getBlog, urlBlog, renderBlog, fresherItem } from '../main.js';

function handleDelete(id) {
    fetch(urlBlog + '/' + id, { method: 'DELETE', })
        .then(res => res.json())
        .then(res => {
            getBlog(function(blogs) {
                renderBlog(blogs);
                fresherItem (blogs);
        })
    });
}

export { handleDelete }