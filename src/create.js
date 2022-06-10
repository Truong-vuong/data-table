let createBtn = document.getElementById('create')
createBtn.onclick = handleCreate()
function handleCreate() {
       let titleInput = document.querySelector('input[name="title"]').value;
       let idInput = document.getElementById('id').value;
       let contentInput = document.getElementById('content').value;
       let createAtInput = document.getElementById('createAt').value;
       let imageInput = document.getElementById('image').value;
      
       console.log(titleInput);
       
}

