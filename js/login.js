const btnLogin = document.getElementsByClassName('login')[0];
const forum = document.getElementById('forum');
const game = document.getElementById('game');
const home = document.getElementById('home');
const embark = document.getElementById('embark');
const toReg = document.getElementById('toReg');

toReg.addEventListener('click', () => {
    window.location.href = '../reg.html';
});

forum.addEventListener('click', () => {
    window.location.href = '../forum.html';
});

home.addEventListener('click', () => {
    window.location.href = '../index.html';
});

embark.addEventListener('click', () => {
    window.location.href = '../csatlakozz.html';
});



btnLogin.addEventListener('click', logIn);

async function logIn() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;
    const remember = document.getElementById('remember').checked;

    console.log(email, psw, remember);

    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            psw,
            remember
        })
    });
    const data = await res.json();
    if(data.error){
        console.log(data.error)
        alert(data.error);
    }
    else if(res.ok){
        resetInputs();
        alert(data.message);
        window.location.href = '../index.html';
    }
    else{
        alert('Ismeretlen hiba!')
    }
}

function resetInputs() {
    document.getElementById('email').value = null;
    document.getElementById('psw').value = null;
    document.getElementById('remember').value = null;
}