const home = document.getElementById('home');
const embark = document.getElementById('embark');
const game = document.getElementById('game');
const profile = document.getElementById('profile');
const logout = document.getElementById('logout');

home.addEventListener('click', () => {
    window.location.href = '../index.html';
});

forum.addEventListener('click', () => {
    window.location.href = '../forum.html';
});


const queryString = window.location.search;

// Parse the query string into an object
const urlParams = new URLSearchParams(queryString);

// Get the 'postid' parameter from the URL
const postId = urlParams.get('postid');

window.addEventListener('DOMContentLoaded', getPost(postId));
// Fetch the specific post data from your API
async function getPost(postId) {
    const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/forum/post/${postId}`, {
        method: 'GET',
    });
    const data = await res.json();
    console.log(data);
    renderPost(data);
}

function renderPost(forum) {
    const container = document.getElementsByClassName('forum')[0];
    container.innerHTML = "";

    const post = document.createElement('div');
    post.classList.add('post');
    
    const postAuthor = document.createElement('div');
    postAuthor.classList.add('post-author');
    postAuthor.setAttribute('userid', forum.post.uid);
    postAuthor.textContent = forum.post.username;
    postAuthor.addEventListener('click', () => getUserProfile(postAuthor));
    post.appendChild(postAuthor);

    const postTitle = document.createElement('div');
    postTitle.classList.add('post-title');
    postTitle.textContent = forum.post.title;
    post.appendChild(postTitle);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    postContent.textContent = forum.post.post;
    post.appendChild(postContent);

    const line = document.createElement('div');
    line.classList.add('post-line');
    post.appendChild(line);

    const postDate = document.createElement('div');
    postDate.classList.add('post-date');
    const datespan = document.createElement('span');
    const date = new Date(forum.post.time).toISOString().split('T')[0].replace('-','.');
    datespan.textContent = date.replace('-','.');
    postDate.appendChild(datespan);
    post.appendChild(postDate);
    
    container.appendChild(post);


    for (const comments of forum.comments) {
        const comment = document.createElement('div');
        comment.classList.add('comment');
        
        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = comments.username;
        commentAuthor.setAttribute('userid', comments.uid);
        commentAuthor.addEventListener('click', () => getUserProfile(commentAuthor));
        comment.appendChild(commentAuthor);
        
        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-body');
        commentContent.textContent = comments.post;
        comment.appendChild(commentContent);
        
        const line = document.createElement('div');
        line.classList.add('post-line');
        comment.appendChild(line);

        const commentDate = document.createElement('div');
        commentDate.classList.add('comment-date');
        const datespan = document.createElement('span');
        const date = new Date(comments.time).toISOString().split('T')[0].replace('-','.');
        datespan.textContent = date.replace('-','.');
        commentDate.appendChild(datespan);
        comment.appendChild(commentDate);
        
        container.appendChild(comment);
    }

}

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
};

function getUserProfile(user) {
    const userId = user.getAttribute('userid');
    window.location.href = `../profile.html?userid=${userId}`;
}
