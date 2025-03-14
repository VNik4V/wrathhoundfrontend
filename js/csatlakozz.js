const forum = document.getElementById('forum');
const home = document.getElementById('home');
const btnReg = document.getElementById('btnReg');
const btnLogin = document.getElementById('btnLogin');

btnReg.addEventListener('click', () => {
    window.location.href = '../reg.html';
});

btnLogin.addEventListener('click', () => {
    window.location.href = '../login.html';
});



forum.addEventListener('click', () => {
    window.location.href = '../forum.html';
});

home.addEventListener('click', () => {
    window.location.href = '../index.html';
});
