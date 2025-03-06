function cleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementsByClassName("title")[0];
    if (element) {
        element.textContent = cleanText(element.textContent);
    }
});