
document.addEventListener("DOMContentLoaded", () => {
    console.log("Minimal portfolio loaded");
});

const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.style.color = "#8d7b72");
        link.style.color = "#4b2e25";
    });
});

const contact = document.getElementById("contact");

contact.addEventListener("click", () => {
    contact.style.transform = "scale(1.01)";
    setTimeout(() => {
        contact.style.transform = "scale(1)";
    }, 150);
});