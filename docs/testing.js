var apiBaseUrl, data;

apiBaseUrl = 'http://localhost:8000/api/auth/'

async function auth () {
    data = document.getElementById('user_id').value;
    data = {"user_id": data}

    localStorage.setItem("user_id", data.user_id);

    url = fetch(apiBaseUrl + '?user_id=' + data.user_id)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        //window.location = json.auth_url;
    });
    
}
