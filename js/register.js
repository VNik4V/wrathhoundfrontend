const forum = document.getElementById('forum');
const game = document.getElementById('game');
const home = document.getElementById('home');
const embark = document.getElementById('embark');
const toLogin = document.getElementsByClassName('toLogin')[0];
const reg = document.getElementById('reggomb');

forum.addEventListener('click', () => {
    window.location.href = '../forum.html';
});

home.addEventListener('click', () => {
    window.location.href = '../index.html';
});

embark.addEventListener('click', () => {
    window.location.href = '../csatlakozz.html';
});

toLogin.addEventListener('click', () => {
    window.location.href = '../login.html';
});

reg.addEventListener('click', Registration);

async function Registration() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;
    const confirmPassword = document.getElementById('psw2').value;
    console.log(username, email, psw, confirmPassword);
    if(confirmPassword!==psw){
        alert('A két jelszó nem egyezik!');
    }
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/auth/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            psw
        })
    });
    const data = await res.json();
    if(data.error){
        console.log(data.error)
        alert(data.error);
        resetInputs();
    }
    else if(res.ok){
        alert(data.message);
        resetInputs();
    }
    else{
        console.log('Registration failed')
    }
    resetInputs();
}

function resetInputs() {
    document.getElementById('email').value = null;
    document.getElementById('psw').value = null;
    document.getElementById('psw2').value = null;
    document.getElementById('username').value = null;
}