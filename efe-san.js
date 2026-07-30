// ============================================================
// EFE ŞAN - efe-san.js
// ============================================================


// ============================================================
// GALERİ
// ============================================================

const galleryItems = document.querySelectorAll(
    ".slides img, .slides video"
);

const galleryPrev = document.querySelector(".slider .prev");
const galleryNext = document.querySelector(".slider .next");

const galleryDots = document.querySelectorAll(".dots .dot");
const galleryCounter = document.getElementById("counter");

let galleryCurrent = 0;


// ============================================================
// GALERİ SLIDE
// ============================================================

function showGallerySlide(index) {

    if (!galleryItems.length) return;

    if (index >= galleryItems.length) {
        index = 0;
    }

    if (index < 0) {
        index = galleryItems.length - 1;
    }

    galleryItems.forEach(function(item) {

        item.classList.remove("active");

        if (item.tagName === "VIDEO") {
            item.pause();
            item.currentTime = 0;
        }

    });

    galleryDots.forEach(function(dot) {
        dot.classList.remove("active-dot");
    });

    const activeItem = galleryItems[index];

    activeItem.classList.add("active");

    if (galleryDots[index]) {
        galleryDots[index].classList.add("active-dot");
    }

    if (activeItem.tagName === "VIDEO") {

        activeItem.play().catch(function() {});

    }

    galleryCurrent = index;

    if (galleryCounter) {
        galleryCounter.textContent =
            `${index + 1} / ${galleryItems.length}`;
    }

}


// ============================================================
// GALERİ OKLARI
// ============================================================

if (galleryNext) {

    galleryNext.addEventListener("click", function(e) {

        e.preventDefault();
        e.stopPropagation();

        showGallerySlide(galleryCurrent + 1);

    });

}


if (galleryPrev) {

    galleryPrev.addEventListener("click", function(e) {

        e.preventDefault();
        e.stopPropagation();

        showGallerySlide(galleryCurrent - 1);

    });

}


// ============================================================
// NOKTALAR
// ============================================================

galleryDots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showGallerySlide(index);

    });

});


// ============================================================
// BAŞLANGIÇ
// ============================================================

if (galleryItems.length) {

    showGallerySlide(0);

}


// ============================================================
// LIGHTBOX
// ============================================================

const lightbox =
    document.querySelector(".lightbox");

const lightboxImg =
    document.getElementById("lightbox-img");

const lightboxClose =
    document.querySelector(".lightbox .close");


galleryItems.forEach(function(item, index) {

    if (item.tagName !== "IMG") return;

    item.addEventListener("click", function() {

        galleryCurrent = index;

        if (lightbox && lightboxImg) {

            lightboxImg.src = item.src;

            lightbox.classList.add("active");

        }

    });

});


if (lightboxClose) {

    lightboxClose.addEventListener("click", function() {

        if (lightbox) {
            lightbox.classList.remove("active");
        }

    });

}


if (lightbox) {

    lightbox.addEventListener("click", function(e) {

        if (e.target === lightbox) {

            lightbox.classList.remove("active");

        }

    });

}


// ============================================================
// PERFORMANCE
// ============================================================

const performanceCards =
    document.querySelectorAll(".performance-card");

const videoPopup =
    document.querySelector(".video-popup");

const popupVideo =
    document.querySelector(".popup-video");

const popupClose =
    document.querySelector(".popup-close");

const popupPlay =
    document.querySelector(".popup-play-btn");


// ============================================================
// PAUSE KİLİDİ
// ============================================================

let userPaused = false;


// ============================================================
// PLAY BUTONUNU GÜNCELLE
// ============================================================

function updatePopupPlayButton() {

    if (!popupVideo || !popupPlay) return;

    if (
        popupVideo.paused ||
        popupVideo.ended
    ) {

        popupPlay.style.display = "flex";

    } else {

        popupPlay.style.display = "none";

    }

}


// ============================================================
// PERFORMANCE AÇ
// ============================================================

function openPerformance(card) {

    if (
        !card ||
        !videoPopup ||
        !popupVideo
    ) {
        return;
    }

    const videoPath =
        card.getAttribute("data-video");

    if (!videoPath) return;


    userPaused = false;


    popupVideo.pause();

    popupVideo.src = videoPath;

    popupVideo.controls = true;
    popupVideo.playsInline = true;

    videoPopup.classList.add("active");

    popupVideo.currentTime = 0;


    const promise = popupVideo.play();

    if (promise) {

        promise
            .then(function() {

                updatePopupPlayButton();

            })
            .catch(function() {

                updatePopupPlayButton();

            });

    }

}


// ============================================================
// PERFORMANCE KARTLARI
// ============================================================

performanceCards.forEach(function(card) {

    card.addEventListener("click", function() {

        openPerformance(card);

    });


    const playButton =
        card.querySelector(".play-btn");

    if (playButton) {

        playButton.addEventListener(
            "click",
            function(e) {

                e.preventDefault();
                e.stopPropagation();

                openPerformance(card);

            }
        );

    }

});


// ============================================================
// VIDEO PLAY
// ============================================================

if (popupVideo) {


    // Video oynatılmaya çalışırsa
    // kullanıcı daha önce durdurduysa tekrar durdur.

    popupVideo.addEventListener(
        "play",
        function() {

            if (userPaused) {

                popupVideo.pause();

                return;

            }

            updatePopupPlayButton();

        }
    );


    // Durduğunda

    popupVideo.addEventListener(
        "pause",
        function() {

            updatePopupPlayButton();

        }
    );


    popupVideo.addEventListener(
        "ended",
        function() {

            userPaused = true;

            updatePopupPlayButton();

        }
    );


    // Videonun üzerine tıklayınca
    // play / pause

    popupVideo.addEventListener(
        "click",
        function(e) {

            // Native video kontrollerine tıklanmışsa
            // bizim custom sistemi çalıştırma.

            if (
                e.offsetY >
                popupVideo.clientHeight - 70
            ) {
                return;
            }


            if (popupVideo.paused) {

                // Kullanıcı açıkça play istedi

                userPaused = false;

                popupVideo.play();

            } else {

                // Kullanıcı açıkça pause istedi

                userPaused = true;

                popupVideo.pause();

            }

        }
    );

}


// ============================================================
// ORTADAKİ PLAY BUTONU
// ============================================================

if (popupPlay) {

    popupPlay.addEventListener(
        "click",
        function(e) {

            e.preventDefault();
            e.stopPropagation();

            if (!popupVideo) return;


            // Kullanıcı play'e bastı

            userPaused = false;

            popupVideo.play();

        }
    );

}


// ============================================================
// KAPAT
// ============================================================

function closePerformance() {

    if (
        !videoPopup ||
        !popupVideo
    ) {
        return;
    }


    userPaused = true;

    popupVideo.pause();

    popupVideo.currentTime = 0;

    popupVideo.removeAttribute("src");

    popupVideo.load();

    videoPopup.classList.remove("active");


    if (popupPlay) {

        popupPlay.style.display = "none";

    }

}


if (popupClose) {

    popupClose.addEventListener(
        "click",
        function(e) {

            e.preventDefault();
            e.stopPropagation();

            closePerformance();

        }
    );

}


if (videoPopup) {

    videoPopup.addEventListener(
        "click",
        function(e) {

            if (e.target === videoPopup) {

                closePerformance();

            }

        }
    );

}


// ============================================================
// KLAVYE
// ============================================================

document.addEventListener(
    "keydown",
    function(e) {


        // ====================================================
        // PERFORMANCE AÇIK
        // ====================================================

        if (
            videoPopup &&
            videoPopup.classList.contains("active")
        ) {

            if (e.key === "Escape") {

                e.preventDefault();

                closePerformance();

                return;

            }


            if (!popupVideo) return;


            // SPACE

            if (e.code === "Space") {

                e.preventDefault();


                if (popupVideo.paused) {

                    userPaused = false;

                    popupVideo.play();

                } else {

                    userPaused = true;

                    popupVideo.pause();

                }

                return;

            }


            // SOL OK

            if (e.key === "ArrowLeft") {

                e.preventDefault();

                popupVideo.currentTime =
                    Math.max(
                        0,
                        popupVideo.currentTime - 5
                    );

                return;

            }


            // SAĞ OK

            if (e.key === "ArrowRight") {

                e.preventDefault();

                if (
                    Number.isFinite(
                        popupVideo.duration
                    )
                ) {

                    popupVideo.currentTime =
                        Math.min(
                            popupVideo.duration,
                            popupVideo.currentTime + 5
                        );

                }

                return;

            }


            return;

        }


        // ====================================================
        // LIGHTBOX
        // ====================================================

        if (
            lightbox &&
            lightbox.classList.contains("active")
        ) {

            if (e.key === "Escape") {

                e.preventDefault();

                lightbox.classList.remove("active");

            }

            return;

        }


        // ====================================================
        // GALERİ KLAVYE
        // ====================================================

        if (e.key === "ArrowRight") {

            e.preventDefault();

            showGallerySlide(
                galleryCurrent + 1
            );

        }


        if (e.key === "ArrowLeft") {

            e.preventDefault();

            showGallerySlide(
                galleryCurrent - 1
            );

        }

    }
);