const game = document.getElementById('game');

game.addEventListener('click', async function () {
    game.disabled = true;  // Gomb letiltása
    game.textContent = "Letöltés..."; 
    game.classList.add("downloading"); 

    try {
        await downloadGame();
    } finally {
        game.disabled = false;  // Gomb visszaengedése
        game.textContent = "Játék"; 
        game.classList.remove("downloading"); 
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