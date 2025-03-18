document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("lightMode");
    const body = document.body;
    

    if (!checkbox) {
        console.error("Nem található a lightMode checkbox!");
        return;
    }

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
});
