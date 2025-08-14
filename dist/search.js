"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const query = (_a = params.get("q")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    if (query) {
        Promise.all([
            fetch("index.html").then(res => res.text()),
            fetch("contato.html").then(res => res.text()),
            fetch("login.html").then(res => res.text())
        ]).then(pages => {
            resultsContainer.innerHTML = "";
            pages.forEach(html => {
                const doc = new DOMParser().parseFromString(html, "text/html");
                const texts = doc.querySelectorAll("h1,h2,h3,p,a");
                texts.forEach(el => {
                    if (el.textContent.toLowerCase().includes(query)) {
                        const snippet = el.textContent.substring(0, 100) + "...";
                        resultsContainer.innerHTML += `<p>${snippet}</p>`;
                    }
                });
            });
        });
    }
});
