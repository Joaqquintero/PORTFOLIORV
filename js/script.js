/* =========================================
   PERSONAJE PRINCIPAL
========================================= */

const character =
    document.getElementById("mainCharacter");

const hero =
    document.querySelector(".hero");


/* =========================================
   CONFIGURACIÓN
========================================= */

let position = 25;

let direction = 1;

let speed = 1.2;

let animationFrame;


/* =========================================
   ANIMACIÓN
========================================= */

function walkCharacter() {

    /*
        Ancho disponible dentro de la portada.
    */

    const maxPosition =
        hero.offsetWidth
        -
        character.offsetWidth
        -
        25;


    /*
        Movimiento.
    */

    position += speed * direction;


    /*
        Llega al lado derecho.
    */

    if (position >= maxPosition) {

        position = maxPosition;

        direction = -1;

        character.classList.add(
            "walking-left"
        );

    }


    /*
        Llega al lado izquierdo.
    */

    if (position <= 25) {

        position = 25;

        direction = 1;

        character.classList.remove(
            "walking-left"
        );

    }


    /*
        Aplicamos la posición.
    */

    character.style.transform =
        `translateX(${position}px)`;


    /*
        Continuamos la animación.
    */

    animationFrame =
        requestAnimationFrame(
            walkCharacter
        );

}


/* =========================================
   MOSTRAR / OCULTAR SEGÚN LA PORTADA
========================================= */

function checkHeroVisibility() {

    const heroRect =
        hero.getBoundingClientRect();


    /*
        Si la portada está visible.
    */

    if (
        heroRect.bottom > 0 &&
        heroRect.top < window.innerHeight
    ) {

        character.style.opacity = "1";

    }

    else {

        character.style.opacity = "0";

    }

}


/* =========================================
   SCROLL
========================================= */

window.addEventListener(
    "scroll",
    checkHeroVisibility,
    { passive: true }
);


/* =========================================
   RESIZE
========================================= */

window.addEventListener(
    "resize",
    checkHeroVisibility
);


/* =========================================
   INICIO
========================================= */

checkHeroVisibility();

walkCharacter();

/* =========================================
   BOTONES CIRCULARES
========================================= */

const buttons =
    document.querySelectorAll(
        ".round-button"
    );


/*
    Observador que detecta cuándo
    aparecen los botones en pantalla.
*/

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.2
        }

    );


/*
    Activamos el observador
    para los 5 botones.
*/

buttons.forEach(
    (button) => {

        observer.observe(button);

    }
);