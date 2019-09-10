var apiBaseUrl, data, user_id;

apiBaseUrl = 'http://localhost:8000/api/generate_profile/'

async function create_profile () {

    user_id = localStorage.user_id;

    url = fetch(apiBaseUrl + '?user_id=' + user_id + '&?url=' + window.location)
    .then(res => res.json())
    .then(json => {
        console.log(json);
    });
}

create_profile();