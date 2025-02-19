const forum = document.getElementById('forum');
const embark = document.getElementById('embark');
const game = document.getElementById('game');
const home = document.getElementById('home');

let user;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let uid = urlParams.get('userid');
console.log(urlParams)


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
    if (data.loggedIn) {
        embark.textContent = 'Profil';
        embark.addEventListener('click', () => getUserProfile(embark));
        getUser();
    }
    else {
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
    if (data.username) {
        draw(data);
        console.log(data.uid)
        const embark = document.getElementById('embark');
        embark.setAttribute('userid', data.uid);
        console.log(uid);
        if (uid != data.uid) {
            drawProfile(uid);
        }
        else {
            drawUserProfile(data);
        }
    }
}

function draw(data) {
    const user = document.getElementsByClassName('user')[0];
    user.textContent = "";

    const profile = document.createElement('div');
    profile.id = 'profile';
    profile.setAttribute('userid', data.uid);

    const img = document.createElement('img');
    img.src = './img/permanent-pics/logo.jpg';
    img.alt = 'profile';
    profile.appendChild(img);

    const b = document.createElement('b');
    b.textContent = data.username;
    profile.appendChild(b);
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
    window.location.href = '../index.html';
};

function getUserProfile(user) {
    const userId = user.getAttribute('userid');
    window.location.href = `../profile.html?userid=${userId}`;
}

/*
<h2>Barátok</h2>
    <div class="row">
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
        <div class="col-1"><span>aaa</span></div>
    </div>
*/

function drawUserProfile(data) {
    drawFelhasznalo(data);
    getFriends(data);
    
}

function drawFelhasznalo(data) {
    const userInformation = document.getElementsByClassName('user-info')[0];
    userInformation.innerHTML = "";

    const felhasz = document.createElement('h2');
    felhasz.textContent = 'Felhasználó adatai';
    userInformation.appendChild(felhasz);

    const row = document.createElement('div');
    row.classList.add('row');

    const userCol = document.createElement('div');
    userCol.classList.add('col-2');
    const userSpan = document.createElement('span');
    userSpan.classList.add('data')
    userSpan.textContent = 'Felhasználónév:';
    userCol.appendChild(userSpan);
    row.appendChild(userCol);
    const usernameCol = document.createElement('div');
    usernameCol.classList.add('col-2');
    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('data')
    usernameSpan.textContent = data.username;
    usernameCol.appendChild(usernameSpan);
    row.appendChild(usernameCol);

    const lineCol = document.createElement('div');
    lineCol.classList.add('col-1');
    const line = document.createElement('div');
    line.classList.add('line');
    lineCol.appendChild(line)
    row.appendChild(lineCol);

    const emailCol = document.createElement('div');
    emailCol.classList.add('col-2');
    const emailSpan = document.createElement('span');
    emailSpan.classList.add('data')
    emailSpan.textContent = 'E-mail:';
    emailCol.appendChild(emailSpan);
    row.appendChild(emailCol);
    const emailCol2 = document.createElement('div');
    emailCol2.classList.add('col-2');
    const emailSpan2 = document.createElement('span');
    emailSpan2.classList.add('data')
    emailSpan2.textContent = data.email;
    emailCol2.appendChild(emailSpan2);
    row.appendChild(emailCol2);

    const lineCol2 = document.createElement('div');
    lineCol2.classList.add('col-1');
    const line2 = document.createElement('div');
    line2.classList.add('line');
    lineCol2.appendChild(line2)
    row.appendChild(lineCol2);
    const statusCol = document.createElement('div');
    statusCol.classList.add('col-2');
    const statusSpan = document.createElement('span');
    statusSpan.classList.add('data')
    statusSpan.textContent = 'Státusz:';
    statusCol.appendChild(statusSpan);
    row.appendChild(statusCol);
    const statusCol2 = document.createElement('div');
    statusCol2.classList.add('col-2');
    const statusSpan2 = document.createElement('span');
    statusSpan2.classList.add('data')
    statusSpan2.textContent = data.role;
    statusCol2.appendChild(statusSpan2);
    row.appendChild(statusCol2);

    console.log(row);

    userInformation.appendChild(row);
}

async function getFriends(user) {
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/friends/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(data);
    drawFriends(data);
}

function drawFriends(friends) {
    const userFriends = document.getElementsByClassName('friends')[0];
    userFriends.innerHTML = "";
    
    for (let i = 0; i < friends.length; i++) {
        const friend = friends[i];
        const row = document.createElement('div');
        row.classList.add('row');
        const col = document.createElement('div');
        col.classList.add('col-1');
        const span = document.createElement('span');
        span.textContent = friend.username;
        col.appendChild(span);
        row.appendChild(col);
        userFriends.appendChild(row);
        row.addEventListener('click', () => getUserProfile(row));
        console.log(row);
    }
}


async function drawProfile(uid) { 
    console.log('Szar van a palacsintában');
}