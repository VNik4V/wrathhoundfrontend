const forum = document.getElementById('forum');
const home = document.getElementById('home');
const embark = document.getElementById('embark');
const profile = document.getElementById('profile');
const BTNpost = document.getElementById('BTNpost');

forum.addEventListener('click', () => {
    window.location.href = '../forum.html';
});
home.addEventListener('click', () => {
    window.location.href = '../index.html';
});

window.addEventListener('DOMContentLoaded', checkUserLoggedIn);

async function checkUserLoggedIn() {
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/auth/validate', {
        methode: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data)
    if(data.loggedIn) {
        embark.textContent = 'Profil';
        embark.addEventListener('click', () => getUserProfile(embark));
        getUser();
    }
    else{
        embark.textContent = 'Csatlakozz';
        embark.addEventListener('click', toCsatlakozz);
        const user = document.getElementsByClassName('user')[0];
        user.textContent = "";
    }
}

function toProfile() {
    window.location.href = '../profile.html';
}

function toCsatlakozz() {
    window.location.href = '../csatlakozz.html';
}

async function getUser() {
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/user/userprofile', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    if(data.username){
        const embark = document.getElementById('embark');
        embark.setAttribute('userid', data.uid);
        draw(data);
    }
}

function draw(data) {
    const user = document.getElementsByClassName('user')[0];
    user.textContent = "";

    const profile = document.createElement('div');
    profile.id = 'profile';
    profile.setAttribute('userid', data.uid);
    
    const img = document.createElement('img');
    img.src = './img/permanent-pics/logo.png';
    img.alt = 'profile';
    profile.appendChild(img);

    const con = document.createElement('div');
    con.classList.add('con');

    const backDiv = document.createElement('div');
    backDiv.classList.add('back');
    con.appendChild(backDiv);
    
    const b = document.createElement('b');
    b.textContent = data.username;
    con.appendChild(b);
    profile.appendChild(con);
    profile.addEventListener('click', () => getUserProfile(profile));
    user.appendChild(profile);
    
    const logout = document.createElement('button');
    logout.type = 'button';
    logout.id = 'logout';
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-arrow-right-from-bracket');
    logout.appendChild(i);
    logout.onclick = logoutUser;
    user.appendChild(logout);
}

async function logoutUser() {
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    checkUserLoggedIn();
};

function getUserProfile(user) {
    const userId = user.getAttribute('userid');
    window.location.href = `../profile.html?userid=${userId}`;
}


BTNpost.addEventListener('click', CreatePost);

async function CreatePost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value.trim();
    console.log(title, content);

    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/forum/newpost', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            post: content
        })
    });
    const data = await res.json();
    console.log(data);
    if (res.ok){
        alert(data.message);
        window.location.href = '../forum.html';
    }

}