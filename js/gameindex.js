let game = document.getElementById('game');
let game1 = document.getElementById('game1');

game1.addEventListener('click', async function () {
    game1.disabled = true;
    game.disabled = true;
    game1.textContent = "Letöltés...";
    game.textContent = "Letöltés...";
    game.classList.add("downloading"); 
    game1.classList.add("downloading"); 

    try {
        await downloadGame();
    } finally {
        game1.disabled = false;
        game.disabled = false;
        game1.textContent = "Játék";
        game.textContent = "Játék";
        game.classList.remove("downloading"); 
        game1.classList.remove("downloading");  
    }
} );

game.addEventListener('click', async function () {
    game.disabled = true;
    game1.disabled = true;
    game.textContent = "Letöltés...";
    game1.textContent = "Letöltés...";
    game.classList.add("downloading"); 
    game1.classList.add("downloading"); 

    try {
        await downloadGame();
    } finally {
        game.disabled = false;
        game1.disabled = false; 
        game.textContent = "Játék";
        game1.textContent = "Játék";
        game.classList.remove("downloading"); 
        game1.classList.remove("downloading"); 
    }
});

async function downloadGame() {
    try {
        const res = await fetch("https://nodejs310.dszcbaross.edu.hu/game/WrathHound.exe");
        
        if (!res.ok) {
            throw new Error(`Hiba a letöltés közben: ${res.status} ${res.statusText}`);
        }
        
        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "WrathHound.exe";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Letöltési hiba:", error);
        alert("Hiba történt a letöltés során!");
    }
}