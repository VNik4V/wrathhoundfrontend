const forum = document.getElementById('forum');
const embark = document.getElementById('embark');
const game = document.getElementById('game');
const home = document.getElementById('home');

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
        embark.addEventListener('click', toProfile);
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

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const saveBtn = document.getElementById('saveChanges');
    const inputField = document.getElementById('newValue');

    // Gombok lekérése
    const nameChangeBtn = document.getElementById('userMgomb');
    const passwordChangeBtn = document.getElementById('pswMgomb');

    let editType = ''; // Eltároljuk, hogy milyen adatot akarunk módosítani

    // Modal megjelenítése kattintásra
    nameChangeBtn.addEventListener('click', () => {
        openModal("Felhasználónév módosítása", "username");
    });

    passwordChangeBtn.addEventListener('click', () => {
        openModal("Jelszó módosítása", "password");
    });

    // Modal bezárása
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Ha a felhasználó a modalon kívülre kattint, zárjuk be
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function openModal(title, type) {
        document.querySelector('.modal-content h2').textContent = title;
        inputField.value = '';  // Alapból töröljük a mezőt
        modal.style.display = 'flex';
        editType = type; // Beállítjuk, hogy mit fogunk módosítani
    }

    // Mentés gomb eseménykezelője
    saveBtn.addEventListener('click', async () => {
        const newValue = inputField.value.trim();
        
        if (!newValue) {
            alert("Nem adtál meg új értéket!");
            return;
        }

        try {
            const response = await fetch('https://nodejs310.dszcbaross.edu.hu/api/user/editprofile', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [editType]: newValue }) // Dinamikusan küldjük el az adatot
            });

            const result = await response.json();
            console.log("Válasz:", result);

            if (response.ok) {
                alert("Sikeres módosítás!");
                modal.style.display = 'none';
                location.reload(); // Frissítjük az oldalt
            } else {
                alert("Hiba történt: " + result.message);
            }

        } catch (error) {
            console.error("Hiba a kérés során:", error);
            alert("Nem sikerült a módosítás!");
        }
    });
});
