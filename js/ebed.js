document.addEventListener("DOMContentLoaded", function () {
    let ebedMod = false; // Állapot tárolása

    document.addEventListener("keydown", function (event) {
        if (event.altKey && event.key.toLowerCase() === "b") { 
            console.log("Kombináció megnyomva: Alt + B");

            const cardImages = document.querySelectorAll(".card img");

            if (cardImages.length === 0) {
                console.error("Nem találhatóak képek a kártyákban!");
                return;
            }

            if (!ebedMod) {
                // 🔹 Képek mentése és csere "ebed.png"-re
                cardImages.forEach(img => {
                    img.dataset.originalSrc = img.src; // Eredeti kép mentése
                    img.src = "./img/ebed.png";
                });
                console.log("Ebéd mód BEKAPCSOLVA!");
            } else {
                // 🔹 Képek visszaállítása az eredeti állapotra
                cardImages.forEach(img => {
                    if (img.dataset.originalSrc) {
                        img.src = img.dataset.originalSrc; // Visszaállítjuk az eredeti képet
                    }
                });
                console.log("Ebéd mód KIKAPCSOLVA!");
            }

            ebedMod = !ebedMod; // Állapot váltása
        }
    });
});
