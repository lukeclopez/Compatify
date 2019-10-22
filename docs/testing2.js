var apiBaseUrl, data, user_id;
var userNameEl, ageEL, lengthEL, popularityEL;

apiBaseUrl = 'http://localhost:8000/api/generate_profile/'
userNameEl = document.getElementById('user-name')
ageEL = document.getElementById('avg-track-age')
lengthEL = document.getElementById('avg-track-length')
popularityEL = document.getElementById('avg-track-popularity')

async function create_profile () {

    user_id = localStorage.user_id;

    url = fetch(apiBaseUrl + '?user_id=' + user_id + '&url=' + window.location)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        userNameEl.innerHTML = json.user_id
        ageEL.innerHTML = json.avg_track_age
        lengthEL.innerHTML = json.avg_track_length
        popularityEL.innerHTML = json.avg_track_popularity
    });
}

create_profile();