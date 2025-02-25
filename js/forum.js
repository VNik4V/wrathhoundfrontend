const home = document.getElementById('home');
const embark = document.getElementById('embark');
const game = document.getElementById('game');
const profile = document.getElementById('profile');
const search = document.getElementById('search');
const plus = document.getElementsByClassName('plusz')[0];

plus.addEventListener('click', () => {
    window.location.href = '../newpost.html';
});

search.addEventListener('click', searchForum);

async function searchForum() {
    const searchTerm = document.getElementById('searchText').value;
    if (!searchTerm) {
        getPosts();
    }
    const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/forum/search/${searchTerm}`, {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    if(data.error){
        alert(data.error);
        getPosts();
    }
    renderPosts(data);
}

home.addEventListener('click', () => {
    window.location.href = '../index.html';
});

if (embark.textContent == 'Profil') {
    embark.addEventListener('click', () => {
        window.location.href = '../profile.html';
    });
}
else{
    embark.addEventListener('click', () => {
        window.location.href = '../csatlakozz.html';
    });
}



window.addEventListener('DOMContentLoaded' ,checkUserLoggedIn);


async function getPosts() {
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/forum/allposts', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    renderPosts(data);
}

function renderPosts(posts) {
    const row = document.getElementById('forum-posts');
    row.innerHTML = '';
    for (const forum of posts) {
        const col = document.createElement('div');
        col.classList.add('col-4');

        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.textContent = forum.username;
        card.appendChild(cardHeader);


        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.textContent = forum.title;
        card.appendChild(cardBody);


        const line = document.createElement('div');
        line.classList.add('post-line');
        card.appendChild(line);

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');
        
        const commentCount = document.createElement('span');
        commentCount.classList.add('comment-count');
        commentCount.textContent = `${forum.comments}`;
        cardFooter.appendChild(commentCount);
        const postDate = document.createElement('span');
        postDate.classList.add('post-date');
        const date = new Date(forum.time).toISOString().split('T')[0].replace('-','.');
        postDate.textContent = `${date.replace('-','.')}`;
        cardFooter.appendChild(postDate);
        
        card.appendChild(cardFooter);

        card.setAttribute('postid', forum.post_id);

        card.addEventListener('click', () => {
            window.location.href = `post.html?postid=${card.getAttribute('postid')}`;
        });
        col.appendChild(card);
        console.log(col);
        row.appendChild(col);
    }
}


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
        getPosts();
    }
    else{
        embark.textContent = 'Csatlakozz';
        embark.addEventListener('click', toCsatlakozz);
        const user = document.getElementsByClassName('user')[0];
        user.textContent = "";
        const plus = document.getElementsByClassName('plusz')[0];
        plus.style.display = 'none';
        getPosts();
    }
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
        draw(data);
        const embark = document.getElementById('embark');
        embark.setAttribute('userid', data.uid);
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