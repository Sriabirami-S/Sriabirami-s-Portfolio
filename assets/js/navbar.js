/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");

    // Stop if this page doesn't contain the navbar
    if (!navbar) {
        return;
    }

    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    }

    // Run once when the page loads
    updateNavbar();

    // Run whenever the user scrolls
    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

});