// Get the Elements from HTML

const userNameInput = document.getElementById('userName')
const showdetailsButton = document.getElementById('showdetails');
const profileInfoDiv = document.getElementById('profileInfo')
const showReposInfoDiv = document.getElementById('showReposInfo');

//
async function showReposInfo (login) {
   const res = await fetch(`https://api.github.com/users/${login}/repos`);
    const repos = await res.json();

    for (let i = 0; i < repos.length; i++) {
        showReposInfoDiv.innerHTML += `
        <div class="card">
            <div class="card-body">
                <div class="card-title">${repos[i].name}</div>
                <div class="card-login">${repos[i].language}</div>
                <div class="card-text">
                    <button>
                        <a href=${repos[i].html_url}>Do Checkout the Repository</a>
                    </button>
                </div>
            </div>
        </div>
        `    
    }  
}

function showProfileInfo(data) {

    profileInfoDiv.innerHTML = `
    <div class="card">
        <div class="card-img">
            <img src=${data.avatar_url} alt=${data.name}>
        </div>
        <div class="card-body">
        <div class="card-title">${data.name}</div>
        <div class="card-login">${data.login}</div>
        <div class="card-text">
            <p>${data.bio}</p>
            <p>${data.followers} followers ${data.following} following</p>
            <button>
            <a href=${data.html_url}>View Profile</a>
        </button>
        </div>
        </div>
    </div>
    `
}

showdetailsButton.addEventListener("click", async () => {
    const userName = userNameInput.value;
    
    //request data using fetch

    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json(); 
     
    showProfileInfo(data);
    showReposInfo(data.login);

})