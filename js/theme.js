document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("lightMode");

    if (!checkbox) {
        console.error("Nem található a lightMode checkbox!");
        return;
    }

    // Betöltéskor állítsd be az állapotot
    checkbox.checked = localStorage.getItem("theme") === "light";

    // Ha változik az állapot, mentsük el
    checkbox.addEventListener("change", function () {
        localStorage.setItem("theme", this.checked ? "light" : "normal");
    });

    console.log("Light mode állapot:", checkbox.checked);
});
const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {
    if (window.scrollY > 3800) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }
});

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
