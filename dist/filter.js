"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll(".produto-card");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            items.forEach(item => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.style.display = "block";
                }
                else {
                    item.style.display = "none";
                }
            });
        });
    });
});
