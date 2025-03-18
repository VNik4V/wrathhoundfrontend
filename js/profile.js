const forum = document.getElementById('forum');
const embark = document.getElementById('embark');
const home = document.getElementById('home');

let gotuser;

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
        achievementModal();
    }
    else {
        embark.textContent = 'Csatlakozz';
        embark.addEventListener('click', toCsatlakozz);
        const user = document.getElementsByClassName('user')[0];
        user.textContent = "";
        drawUserInfo();
        achievementModal();
    }
}

function drawUserInfo() {
    getUserInfo();
    getUserFriends();
    const requests = document.getElementsByClassName('requests')[0];
    requests.style.display = 'none';
}

async function getUserFriends() {
    const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/friends/all/${uid}`, {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    if (data.message !== 'A barátlista üres') {
        if (embark.textContent === 'Profil') {
            const isFriend = data.some(e => e.uid === gotuser.uid);
            isFriend ? deleteFriendButton() : checkPending();
        }
    }
    else {
        checkPending();
    }
    drawFriends(data);
}

async function checkPending() {
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/friends/pending', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(data)
    if (data.message !== 'Nincsenek kérelmeid') {

        const isFriend = data.some(sender => sender.sender_id == uid) || false;
        console.log(isFriend);
        isFriend ? answerButtons() : addFriendButton();
    }
    else {
        addFriendButton();
    }
}

function addFriendButton() {
    const buttons = document.getElementsByClassName('buttons')[0];
    const row = document.createElement('div');
    row.classList.add('row');
    const col = document.createElement('div');
    col.classList.add('col-1');
    const addFriend = document.createElement('button');
    addFriend.type = 'button';
    addFriend.textContent = 'Barátkérelem küldése';
    addFriend.classList.add('Changegbtn');
    addFriend.addEventListener('click', addFriends);
    col.appendChild(addFriend);
    row.appendChild(col);
    buttons.appendChild(row);
}

function answerButtons() {
    const buttons = document.getElementsByClassName('buttons')[0];
    const row = document.createElement('div');
    row.classList.add('row');
    const col = document.createElement('div');
    col.classList.add('col-1');
    const acceptFriend = document.createElement('button');
    acceptFriend.type = 'button';
    acceptFriend.textContent = 'Barátkérelem elfogadása';
    acceptFriend.classList.add('Changegbtn');
    acceptFriend.addEventListener('click', addFriends);
    col.appendChild(acceptFriend);
    row.appendChild(col);
    const col2 = document.createElement('div');
    col2.classList.add('col-1');
    const deleteFriend = document.createElement('button');
    deleteFriend.type = 'button';
    deleteFriend.textContent = 'Kérelem elutasítása';
    deleteFriend.classList.add('Changegbtn');
    deleteFriend.addEventListener('click', deleteFriends);
    col2.appendChild(deleteFriend);
    row.appendChild(col2);
    buttons.appendChild(row);
}

function deleteFriendButton() {
    const buttons = document.getElementsByClassName('buttons')[0];
    const row = document.createElement('div');
    row.classList.add('row');
    const col = document.createElement('div');
    col.classList.add('col-1');
    const deleteFriend = document.createElement('button');
    deleteFriend.type = 'button';
    deleteFriend.textContent = 'Barát törlése';
    deleteFriend.classList.add('Changegbtn');
    deleteFriend.addEventListener('click', deleteFriends);
    col.appendChild(deleteFriend);
    row.appendChild(col);
    buttons.appendChild(row);
}

async function getUserInfo() {
    const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/user/userprofile/${uid}`, {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    drawFelhasznalo(data);
    updateCompletionBadge(data.completion);
    akitv();
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
        const embark = document.getElementById('embark');
        embark.setAttribute('userid', data.uid);

        if (uid != data.uid) {
            drawProfile(uid);
            gotuser = data;
        } else {
            drawUserProfile(data);
            updateCompletionBadge(data.completion);
            akitv();
        }

        // Teljesítmény kiírása

    }
}

function updateCompletionBadge(completion) {
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = `${completion}% Teljesítve`;
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
    window.location.href = '../index.html';
};

function getUserProfile(user) {
    const userId = user.getAttribute('userid');
    window.location.href = `../profile.html?userid=${userId}`;
}

function openModal(title, type) {
    const modal = document.getElementById('modal');
    const saveBtn = document.getElementById('saveChanges');
    const closeModal = document.querySelector('.close');
    const inputField = document.getElementById('newValue');

    let editType = '';
    document.querySelector('.modal-content h2').textContent = title;
    inputField.value = '';  // Alapból töröljük a mezőt
    modal.style.display = 'flex';
    editType = type;

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

        console.log(editType, newValue);
        if (!newValue) {
            alert("Nem adtál meg új értéket!");
            return;
        }
        try {
            const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/user/editprofile', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [editType]: newValue
                })
            })
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                alert("Sikeres mentés!");
                modal.style.display = 'none';
                getUserProfile(document.getElementById('profile'));
            }

        }
        catch (error) {
            console.error(error);
            alert("Hiba a mentés közben!");
        }


    });

}
/*
<div>
    <h2>Teljesítmények</h2>
    <span class="badge">66,66%</span>
</div>
<div class="achievement-container row">
    <div class="achievement active col-6">
        <img src="img/KIZ_aktiv_kor.png" alt="KIZ">
    </div>
    <div class="achievement active col-6">
        <img src="img/elsohalal_aktiv_kor.png" alt="Első Halál">
    </div>
    <div class="achievement inactive col-6">
        <img src="img/ellenfel_aktiv_kor.png" alt="Első Ellenfél">
    </div>
    <div class="achievement active col-6">
        <img src="img/elsotalalkozas_aktiv_kor.png" alt="Első Találkozás">
    </div>
    <div class="achievement inactive col-6">
        <img src="img/gyozdle_aktiv_kor.png" alt="Bukott Bukott Angyal">
    </div>
    <div class="achievement active col-6">
        <img src="img/lepesek_aktiv_kor.png" alt="Első Lépések">
    </div>
</div>
*/

function drawUserProfile(data) {
    drawFelhasznalo(data);
    getFriends();
    getFriendRequests();
    drawButtons(data);

}

function drawButtons(data) {
    const buttons = document.getElementsByClassName('buttons')[0];
    const row = document.createElement('div');
    row.classList.add('row');
    const col = document.createElement('div');
    col.classList.add('col-1');
    const changeUser = document.createElement('button');
    changeUser.type = 'button';
    changeUser.textContent = 'Név módosítása';
    changeUser.classList.add('Changegbtn');
    changeUser.addEventListener('click', () => ChangeUsername());
    col.appendChild(changeUser);
    row.appendChild(col);
    const col1 = document.createElement('div');
    col1.classList.add('col-1');
    const changePsw = document.createElement('button');
    changePsw.type = 'button';
    changePsw.textContent = 'Jelszó módosítása';
    changePsw.classList.add('Changegbtn');
    changePsw.addEventListener('click', () => ChangePassword());
    col1.appendChild(changePsw);
    row.appendChild(col1);
    if (data.role === 'admin') {
        const col2 = document.createElement('div');
        col2.classList.add('col-1');
        const uploadGame = document.createElement('button');
        uploadGame.type = 'button';
        uploadGame.textContent = 'Játék feltöltése';
        uploadGame.classList.add('Changegbtn');
        uploadGame.addEventListener('click', Upload);
        col2.appendChild(uploadGame);
        row.appendChild(col2);
    }
    buttons.appendChild(row);


}


async function getFriendRequests() {
    const res = await fetch('https://nodejs310.dszcbaross.edu.hu/api/friends/pending', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(data);
    drawPending(data);
}

function drawPending(data) {
    const requests = document.getElementsByClassName('requests')[0];
    const h2 = document.createElement('h2');
    h2.textContent = "Kérések";
    requests.appendChild(h2);
    const row = document.createElement('div');
    row.classList.add('row');
    for (let i = 0; i < data.length; i++) {
        const pending = data[i];
        const col = document.createElement('div');
        col.classList.add('col-1');
        const span = document.createElement('span');
        span.textContent = pending.sender_username;
        span.setAttribute('userid', pending.sender_id)
        span.addEventListener('click', () => getUserProfile(span));
        col.appendChild(span);
        row.appendChild(col);
        requests.appendChild(row);
        console.log(row);
    }

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

function drawTeljestimeny(data) {
    const userComp = document.getElementsByClassName('badge')[0];
    userComp.innerHTML = "";
}

async function getFriends() {
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
    const h2 = document.createElement('h2');
    h2.textContent = 'Barátok';
    userFriends.appendChild(h2);
    const row = document.createElement('div');
    row.classList.add('row');
    for (let i = 0; i < friends.length; i++) {
        const friend = friends[i];
        const col = document.createElement('div');
        col.classList.add('col-1');
        const span = document.createElement('span');
        span.textContent = friend.username;
        span.setAttribute('userid', friend.uid)
        span.addEventListener('click', () => getUserProfile(span));
        col.appendChild(span);
        row.appendChild(col);
        userFriends.appendChild(row);
        console.log(row);
    }
}


async function drawProfile(uid) {
    getUserInfo();
    getUserFriends();
    const requests = document.getElementsByClassName('requests')[0];
    requests.style.display = 'none';
}

function ChangeUsername() {
    openModal("Felhasználónév módosítása", "username");
}

function ChangePassword() {
    openModal("Jelszó módosítása", "psw");
}

async function addFriends() {
    const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/friends/addfriend/${uid}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    if (res.ok) {
        alert(data.message);
        window.location.reload();
    }
}
async function deleteFriends() {
    const res = await fetch(`https://nodejs310.dszcbaross.edu.hu/api/friends/removefriend/${uid}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        alert('Sikeres törlés!');
        window.location.reload();
    }
}
function achievementModal() {
    const achievementModal = document.getElementById("achievementModal");
    const closeAchievement = document.querySelector(".close-achievement");
    const achievementTitle = document.getElementById("achievementTitle");
    const achievementImage = document.getElementById("achievementImage");
    const achievementDescription = document.getElementById("achievementDescription");

    const achievements = document.querySelectorAll(".achievement img");

    const descriptions = {
        "KIZ": "Találkozz István mesterrel",
        "Első Halál": "Halj meg először a játékban!",
        "Első Ellenfél": "Győzd le első ellenfeled!",
        "Első Találkozás": "Juss el Ismériáshoz!",
        "Bukott Bukott Angyal": "Győzd le Ismériást a tutoriálban!",
        "Első Lépések": "Teljesítsd a tutoriált!",
        "Új kaland": "Csapasd a játékot",
        "Üdvözöllek": "Lépj be elöször a játékba"

    };

    // Képnevek, amelyek cserélhetőek a kör és négyzet verziók között
    const imageNames = {
        "KIZ": { circle: "KIZ_aktiv_kor.png", square: "KIZ.png" },
        "Első Halál": { circle: "elsohalal_aktiv_kor.png", square: "elsohalal.png" },
        "Első Ellenfél": { circle: "ellenfel_aktiv_kor.png", square: "ellenfel.png" },
        "Első Találkozás": { circle: "elsotalalkozas_aktiv_kor.png", square: "elsotalalkozas.png" },
        "Bukott Bukott Angyal": { circle: "gyozdle_aktiv_kor.png", square: "gyozdle.png" },
        "Első Lépések": { circle: "lepesek_aktiv_kor.png", square: "lepesek.png" },
        "Új kaland": { circle: "kaland_aktiv_kor.png", square: "kaland.png" },
        "Üdvözöllek": { circle: "udv_aktiv_kor.png", square: "udv.png" }
    };

    achievements.forEach(img => {
        img.addEventListener("click", function () {
            console.log(img)
            const altText = img.alt;
            const imageType = "square"; // Változtathatod, hogy a kör vagy a négyzet verziót jelenítse meg (pl. square vagy circle)

            // Ha a négyzetes verziót akarjuk
            const imageSrc = imageNames[altText] ? imageNames[altText][imageType] : img.src;

            achievementImage.src = `img/${imageSrc}`; // A megfelelő verziót állítjuk be
            achievementTitle.textContent = altText;
            achievementDescription.textContent = descriptions[altText] || "Ismeretlen achievement.";
            achievementModal.style.display = "flex";
        });
    });

    closeAchievement.addEventListener("click", function () {
        achievementModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === achievementModal) {
            achievementModal.style.display = "none";
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const uploadModal = document.getElementById('uploadModal');
    const saveBtn = document.getElementById('uploadBtn');  // Feltöltés gomb
    const closeUploadBtn = document.querySelector('.close-upload');
    const gameFileInput = document.getElementById('gameFile');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadStatus = document.getElementById('uploadStatus');
    const versionInput = document.getElementById('newVersion'); // Verziószám input


    // Funkció a feltöltési modal megnyitására
    function openUploadModal() {
        uploadModal.style.display = 'flex';  // Alapértelmezett modal megjelenítése
        resetModalState();
    }

    // Funkció a feltöltési modal bezárására
    function closeUploadModal() {
        uploadModal.style.display = 'none';
        resetModalState();
    }

    // A modal alapállapotának visszaállítása
    function resetModalState() {
        gameFileInput.value = '';
        fileNameDisplay.textContent = 'Nincs kiválasztva fájl';
        saveBtn.disabled = true;
        uploadStatus.textContent = '';
        versionInput.value = ''; // Reset verzió input
    }

    // Fájl kiválasztás kezelése
    gameFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            saveBtn.disabled = false;
        }
    });

    // Feltöltés törlésének megerősítése
    cancelUploadBtn.addEventListener('click', () => {
        const confirmCancel = confirm('Biztosan meg szeretné szakítani a feltöltést?');
        if (confirmCancel) {
            closeUploadModal();
        }
    });

    // Modal bezárása a bezárás gombra kattintva
    closeUploadBtn.addEventListener('click', closeUploadModal);

    // Modal bezárása, ha a modalon kívül kattintanak
    window.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            closeUploadModal();
        }
    });

    // Feltöltés gomb kezelése (fájl és verzió elküldése backendhez)
    saveBtn.addEventListener('click', async () => {
        const file = gameFileInput.files[0];
        const version = versionInput.value.trim();

        if (!file || !version) {
            uploadStatus.textContent = 'Kérlek add meg a verziót és válassz fájlt!';
            return;
        }

        uploadStatus.textContent = 'Feltöltés folyamatban...';

        try {
            // FormData létrehozása a fájl és verzió küldéséhez
            const formData = new FormData();
            formData.append('version', version);
            formData.append('game', file);
            

            // Fetch kérés küldése a backend API-ra
            const response = await fetch('https://nodejs310.dszcbaross.edu.hu/api/game/upload', {
                method: 'PUT',
                credentials: 'include',
                body: formData
            });

            if (!response.ok) {
                throw new Error('A feltöltés nem sikerült!');
            }

            const result = await response.json();
            uploadStatus.textContent = 'Sikeres feltöltés!';
            console.log(result); // Eredmény kiírása a konzolra
            closeUploadModal(); // Modal bezárása sikeres feltöltés után
        } catch (error) {
            uploadStatus.textContent = `Hiba történt: ${error.message}`;
        }
    });

    // Az openUploadModal globális elérhetőségének biztosítása a drawButtons használatához
    window.openUploadModal = openUploadModal;
});

// A meglévő Upload funkció módosítása a modal megnyitásához
function Upload() {
    window.openUploadModal();
}

async function akitv() {
    
    const apiUrl = `https://nodejs310.dszcbaross.edu.hu/api/achievements/userachievements/${uid}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) throw new Error("Hiba az adatok lekérésekor");

        const userAchievements = await response.json();
        console.log(userAchievements.length)
        if (userAchievements.length === undefined) {
            document.querySelectorAll(".achievement").forEach(achievement => {
                achievement.classList.add("inactive");
            });
        }
        else {
            const userAchievementIds = userAchievements.map(ach => ach.aid);

            document.querySelectorAll(".achievement").forEach(achievement => {
                const achId = parseInt(achievement.dataset.aid);

                if (!userAchievementIds.includes(achId)) {
                    achievement.classList.add("inactive");
                }
                else {
                    achievement.classList.remove("inactive");
                }
            });
        }


    } catch (error) {
        console.error("Hiba történt: ", error);
    }
}