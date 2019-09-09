var apiBaseUrl, data;

apiBaseUrl = 'http://localhost:8000/api/generate_profile2/'

async function create_profile () {
    data = document.getElementById('user_id').value;
    data = {"user_id": data}

    localStorage.setItem("user_id", data);

    url = fetch(apiBaseUrl + '?user_id=' + data)
    .then(res => res.json())
    .then(json => {s
        console.log(json);
        window.location = json.auth_url;
    });
}