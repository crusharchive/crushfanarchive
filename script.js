
// ==========================
// COUNTDOWN
// ==========================

const targetDate = new Date(2026, 6, 31, 0, 0, 0).getTime();

function updateCountdown(){

    const countdown = document.getElementById("countdown");
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if(!countdown || !days || !hours || !minutes || !seconds){
        return;
    }

    const now = Date.now();
    const distance = targetDate - now;


    if(distance <= 0){

        countdown.innerHTML = "<h2>CRUSH IS HERE!</h2>";
        return;

    }


    days.textContent = String(
        Math.floor(distance / (1000 * 60 * 60 * 24))
    ).padStart(2,"0");


    hours.textContent = String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2,"0");


    minutes.textContent = String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2,"0");


    seconds.textContent = String(
        Math.floor((distance % (1000 * 60)) / 1000)
    ).padStart(2,"0");

}


updateCountdown();
setInterval(updateCountdown,1000);



// ==========================
// HOME GALLERY
// ==========================

const homeGalleryItems = document.querySelectorAll(
    ".home-gallery-item, .home-more-item"
);

const homePrev = document.querySelector(".home-gallery-prev");
const homeNext = document.querySelector(".home-gallery-next");

let homeIndex = 0;


function showHomeGallery(){

    homeGalleryItems.forEach(item => {

        item.classList.remove("active");

    });


    if(homeGalleryItems[homeIndex]){

        homeGalleryItems[homeIndex].classList.add("active");

    }

}


if(homeGalleryItems.length > 0 && homePrev && homeNext){


    homePrev.addEventListener("click",()=>{

        homeIndex--;

        if(homeIndex < 0){

            homeIndex = homeGalleryItems.length - 1;

        }

        showHomeGallery();

    });


    homeNext.addEventListener("click",()=>{

        homeIndex++;

        if(homeIndex >= homeGalleryItems.length){

            homeIndex = 0;

        }

        showHomeGallery();

    });


    showHomeGallery();

}

// ==========================
// PERFORMANCE VIDEO LIGHTBOX
// ==========================

const performanceCards = document.querySelectorAll(".performance-card");

const lightbox = document.getElementById("videoLightbox");
const lightboxVideo = document.getElementById("lightboxVideo");
const closeVideo = document.querySelector(".video-close");

if (performanceCards.length && lightbox && lightboxVideo && closeVideo) {

    performanceCards.forEach(card => {

        card.addEventListener("click", () => {

            const video = card.dataset.video;

            lightboxVideo.src = video;

            lightbox.classList.add("active");

            lightboxVideo.play();

        });

    });

    closeVideo.addEventListener("click", () => {

        lightboxVideo.pause();

        lightboxVideo.src = "";

        lightbox.classList.remove("active");

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightboxVideo.pause();

            lightboxVideo.src = "";

            lightbox.classList.remove("active");

        }

    });

}