"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const resultsContainer = document.getElementById("search-results");
    if (!resultsContainer) {
        console.error("#search-results não encontrado no HTML.");
        return;
    }
    const params = new URLSearchParams(window.location.search);
    const query = (params.get("q") || "").trim().toLowerCase();
    if (!query) {
        resultsContainer.innerHTML = "<p>Digite algo para buscar.</p>";
        return;
    }
    const pages = ["index.html", "contato.html", "login.html"];
    const fetchText = (path) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = new URL(path, document.baseURI).toString(); // caminho sempre correto
            const res = yield fetch(url, { cache: "no-store" });
            if (!res.ok)
                throw new Error(`HTTP ${res.status} em ${path}`);
            return yield res.text();
        }
        catch (e) {
            console.warn("Falhou:", path, e);
            return ""; // segue o baile
        }
    });
    const htmls = yield Promise.all(pages.map(fetchText));
    let count = 0;
    resultsContainer.innerHTML = "";
    htmls.forEach((html, i) => {
        if (!html)
            return;
        const doc = new DOMParser().parseFromString(html, "text/html");
        const nodes = doc.querySelectorAll("h1,h2,h3,p,a");
        nodes.forEach((el) => {
            const text = (el.textContent || "").trim();
            if (text.toLowerCase().includes(query)) {
                const snippet = text.length > 140 ? text.slice(0, 140) + "…" : text;
                // destaque do termo (escapa HTML antes)
                const highlighted = (() => {
                    const esc = (s) => s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
                    const safe = esc(snippet);
                    const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
                    return safe.replace(re, (m) => `<mark>${m}</mark>`);
                })();
                const item = document.createElement("div");
                item.className = "mb-3";
                const p = document.createElement("p");
                p.innerHTML = highlighted;
                const a = document.createElement("a");
                a.href = new URL(pages[i], document.baseURI).toString();
                a.textContent = `Abrir: ${pages[i]}`;
                a.className = "d-block small text-decoration-none";
                item.appendChild(p);
                item.appendChild(a);
                resultsContainer.appendChild(item);
                count++;
            }
        });
    });
    if (count === 0) {
        resultsContainer.innerHTML = `<p>Nenhum resultado para <strong>${query}</strong>.</p>`;
    }
}));
