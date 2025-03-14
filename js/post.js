const home = document.getElementById('home');
const forum = document.getElementById('forum');
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

let userId;
let admin;

const queryString = window.location.search;

// Parse the query string into an object
const urlParams = new URLSearchParams(queryString);

// Get the 'postid' parameter from the URL
const postId = urlParams.get('postid');
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
    postAuthor.textContent = cleanText(forum.post.username);
    postAuthor.addEventListener('click', () => getUserProfile(postAuthor));
    post.appendChild(postAuthor);

    const postTitle = document.createElement('div');
    postTitle.classList.add('post-title');
    postTitle.textContent = cleanText(forum.post.title);
    post.appendChild(postTitle);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    postContent.textContent = cleanText(forum.post.post);
    post.appendChild(postContent);

    const line = document.createElement('div');
    line.classList.add('post-line');
    post.appendChild(line);

    const postDate = document.createElement('div');
    postDate.classList.add('post-date');
    const datespan = document.createElement('span');
    const date = new Date(forum.post.time).toISOString().split('T')[0].replace('-', '.');
    datespan.textContent = date.replace('-', '.');
    postDate.appendChild(datespan);

    if (isUserLoggedIn()) {
        const plus = document.createElement('div');
        plus.classList.add('plus');
        plus.textContent = '+';
        plus.addEventListener('click', () => openModal('Új komment'))
        postDate.appendChild(plus);
        if (forum.post.uid == userId || admin) {
            const deletebtn = document.createElement('div');
            deletebtn.classList.add('plus');
            const can = document.createElement('i');
            can.classList.add('fa-solid', 'fa-trash');
            deletebtn.appendChild(can);
            deletebtn.setAttribute('post-id', forum.post.post_id);
            deletebtn.addEventListener('click', () => deletePost(deletebtn));
            postDate.appendChild(deletebtn);
        }
    }
    post.appendChild(postDate);

    container.appendChild(post);


    for (const comments of forum.comments) {
        const comment = document.createElement('div');
        comment.classList.add('comment');

        const commentAuthor = document.createElement('div');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = cleanText(comments.username);
        commentAuthor.setAttribute('userid', comments.uid);
        commentAuthor.addEventListener('click', () => getUserProfile(commentAuthor));
        comment.appendChild(commentAuthor);

        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-body');
        commentContent.textContent = cleanText(comments.post);
        comment.appendChild(commentContent);

        const line = document.createElement('div');
        line.classList.add('post-line');
        comment.appendChild(line);

        const commentDate = document.createElement('div');
        commentDate.classList.add('comment-date');
        const datespan = document.createElement('span');
        const date = new Date(comments.time).toISOString().split('T')[0].replace('-', '.');
        datespan.textContent = date.replace('-', '.');
        commentDate.appendChild(datespan);
        if (comments.uid == userId || admin) {
            const deletebtn = document.createElement('div');
            deletebtn.classList.add('plus');
            const can = document.createElement('i');
            can.classList.add('fa-solid', 'fa-trash');
            deletebtn.appendChild(can);
            deletebtn.setAttribute('comment-id', comments.comment_id);
            deletebtn.addEventListener('click', () => deleteComment(deletebtn));
            commentDate.appendChild(deletebtn);
        }
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
    if (data.loggedIn) {
        embark.textContent = 'Profil';
        embark.addEventListener('click', () => getUserProfile(embark));
        getUser();
        getPost(postId);

    }
    else {
        embark.textContent = 'Csatlakozz';
        embark.addEventListener('click', toCsatlakozz);
        const user = document.getElementsByClassName('user')[0];
        user.textContent = "";
        getPost(postId);
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
    if (data.username) {
        if(data.role == 'admin') {
            admin = true;
        }
        else{
            admin = false;
        }
        draw(data);
        userId = data.uid;
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


function isUserLoggedIn() {
    return embark.textContent === 'Profil';
}


function openModal(title) {
    const modal = document.getElementById('modal');
    const saveBtn = document.getElementById('saveChanges');
    const closeModal = document.querySelector('.close');
    const inputField = document.getElementById('newValue');

    document.querySelector('.modal-content h2').textContent = title;
    inputField.value = '';  // Alapból töröljük a mezőt
    modal.style.display = 'flex';

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    saveBtn.addEventListener('click', async () => {
        const newValue = inputField.value.trim();

        console.log(newValue);
        if (!newValue) {
            alert("Nem adtál meg kommnet szöveget!");
            return;
        }
        try {
            const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/forum/newcomment/${postId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post: newValue
                })
            })
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                alert(data.message);
                modal.style.display = 'none';
                window.location.reload();
            }

        }
        catch (error) {
            console.error(error);
            alert("Hiba a mentés közben!");
        }


    });

}

async function deletePost(btn) {
    const postId = btn.getAttribute('post-id');
    try {
        const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/forum/deletepost/${postId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (res.ok) {
            alert('Sikeres törlés');
            window.location.href = '../forum.html';
        }
        else {
            alert("Nem sikerült a bejegyzés törlés!");
        }

    }
    catch (error) {
        console.error(error);
        alert("Hiba a törlés közben!");
    }
}

async function deleteComment(btn) {
    const commentId = btn.getAttribute('comment-id');
    try {
        const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/forum/deletecomment/${commentId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (res.ok) {
            alert('Sikeres törlés');
            window.location.reload();
        }
        else {
            alert("Nem sikerült a koment törlés!");
        }
    }
    catch (error) {
        console.error(error);
        alert("Hiba a törlés közben!");
    }
}

function cleanText(text) {
    return text.replace(/[\u0300-\u036f]/g, '');
}