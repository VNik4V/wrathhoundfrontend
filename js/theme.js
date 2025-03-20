document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("lightMode");
    const body = document.body;
    
    if (checkbox) {
        // Betöltéskor állítsd be az állapotot
        if (localStorage.getItem("theme") === "light") {
            checkbox.checked = true;
            body.classList.add("light-theme");
        }

        // Ha változik az állapot, mentsük el és frissítsük a body class-t
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                localStorage.setItem("theme", "light");
                body.classList.add("light-theme");
            } else {
                localStorage.setItem("theme", "normal");
                body.classList.remove("light-theme");
            }
        });

        console.log("Light mode állapot:", checkbox.checked);
    } else {
        console.error("Nem található a lightMode checkbox!");
    }
});

// Easter egg billentyűkombináció figyelése
document.addEventListener("keydown", function(event) {
    console.log(`Lenyomott gomb: ${event.key}`); // Hibakereséshez kiírjuk a lenyomott gombot a konzolra

    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "k") { 
        // Ctrl + Alt + K megnyomásával nyílik meg
        window.location.href = "csj.html";
    }
});
