/* =========================================
   CUSTOM CURSOR + TRAIL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const pointer = document.querySelector(".pointer");

    /*
     * If a page doesn't contain the custom cursor,
     * simply stop here.
     */
    if (!pointer) {
        return;
    }

    const body = document.body;

    const trailLength = 15;

    const trailParticles = [];

    const history = [];

    const historyLimit = 20;

    let mouseX = 0;

    let mouseY = 0;


    /* =========================================
       CREATE TRAIL PARTICLES
    ========================================= */

    for (let i = 0; i < trailLength; i++) {

        const trail = document.createElement("div");

        trail.classList.add("trail");

        body.appendChild(trail);

        trailParticles.push(trail);

    }


    /* =========================================
       MOUSE MOVEMENT
    ========================================= */

    body.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;

        mouseY = event.clientY;


        /* Main cursor */

        pointer.style.left = `${mouseX}px`;

        pointer.style.top = `${mouseY}px`;


        /* Small cursor pulse */

        pointer.style.width = "22px";

        pointer.style.height = "22px";


        setTimeout(() => {

            pointer.style.width = "20px";

            pointer.style.height = "20px";

        }, 100);


        /* Store mouse position */

        history.push({
            x: mouseX,
            y: mouseY
        });


        if (history.length > historyLimit) {

            history.shift();

        }


        updateTrail();

    });


    /* =========================================
       UPDATE TRAIL
    ========================================= */

    function updateTrail() {

        trailParticles.forEach((particle, index) => {

            const historyIndex =
                history.length -
                1 -
                Math.floor(
                    index *
                    (history.length / trailParticles.length)
                );


            const point =
                history[Math.max(0, historyIndex)];


            if (point) {

                particle.style.left = `${point.x}px`;

                particle.style.top = `${point.y}px`;

                particle.style.opacity =
                    index / trailParticles.length;


                particle.style.transform =
                    `translate(-50%, -50%)
                     scale(
                        ${0.4 +
                        (1 -
                        index / trailParticles.length) * 0.6}
                     )`;

            }

            else {

                particle.style.opacity = "0";

            }

        });

    }


    /* =========================================
       HIDE CURSOR WHEN MOUSE LEAVES WINDOW
    ========================================= */

    document.addEventListener("mouseleave", () => {

        pointer.style.opacity = "0";

        trailParticles.forEach((particle) => {

            particle.style.opacity = "0";

        });

    });


    /* =========================================
       SHOW CURSOR WHEN MOUSE RETURNS
    ========================================= */

    document.addEventListener("mouseenter", () => {

        pointer.style.opacity = "1";

    });

});