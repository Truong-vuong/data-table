const url = 'https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs';

function getData() {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json()
                .then((data) => {
                    if (response.status === 200) {
                        resolve(data);
                    } else {
                        reject("Failure");
                    }
                })
            )
            .catch((err) => {
                reject(err);
            })
    })
};

function postData(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json()
                .then(item => {
                    if (response.status == 201) {
                        resolve(item);
                    } else {
                        reject("Create Failed");
                    }
                })
            )
            .catch(err => {
                reject(err);
            })
    })
}

function putData(id, data) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return new Promise((resolve, reject) => {
        fetch(url + "/" + id, options)
            .then(response => response.json()
                .then(item => {
                    if (response.status == 200) {
                        resolve(item);
                    } else {
                        reject("Create Failed");
                    }
                })
            )
            .catch(err => {
                reject(err);
            })
    })
}

function deleteData(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        fetch(url + "/" + id, options)
            .then(response => response.json()
                .then(item => {
                    if (response.status == 200) {
                        resolve(item);
                    } else {
                        reject("Delete Failed");
                    }
                })
            )
            .catch(err => {
                reject(err);
            })
    })
}

function detailData(id) {
    return new Promise((resolve, reject) => {
        fetch(url + "/" + id)
            .then((response) => response.json()
                .then((data) => {
                    if (response.status === 200) {
                        resolve(data);
                    } else {
                        reject("Failure");
                    }
                })
            )
            .catch((err) => {
                reject(err);
            })
    })
};

export { getData, postData, deleteData, putData, detailData };