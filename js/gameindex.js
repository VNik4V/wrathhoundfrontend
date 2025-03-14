const game = document.getElementById('game');
const game1 = document.getElementById('game1');

game.addEventListener('click', downloadGame);
game1.addEventListener('click', downloadGame);

async function downloadGame() {
    const response = await fetch("https://nodejs310.dszcbaross.edu.hu/game/WrathHound.exe");
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "WrathHound.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}