const images = document.querySelectorAll(".gallery-grid img");


const lightbox = document.querySelector(".lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");





images.forEach(image => {


    image.addEventListener("click", ()=>{


        lightboxImg.src = image.src;

        lightbox.classList.add("active");


    });


});





closeBtn.addEventListener("click", ()=>{


    lightbox.classList.remove("active");


});





lightbox.addEventListener("click",(e)=>{


    if(e.target === lightbox){

        lightbox.classList.remove("active");

    }


});





document.addEventListener("keydown",(e)=>{


    if(e.key === "Escape"){

        lightbox.classList.remove("active");

    }


});

/* =========================
   GALERİ VİDEOLARI
========================= */

const galleryVideoBoxes =
    document.querySelectorAll(".gallery-video-box");


galleryVideoBoxes.forEach(function(box){

    const video =
        box.querySelector(".gallery-video");

    const playButton =
        box.querySelector(".gallery-play-btn");


    if(!video || !playButton) return;


    function updateVideoState(){

        if(video.paused){

            box.classList.remove("playing");

            playButton.style.opacity = "1";
            playButton.style.pointerEvents = "auto";

        }else{

            box.classList.add("playing");

            playButton.style.opacity = "0";
            playButton.style.pointerEvents = "none";

        }

    }


    function toggleVideo(){

        if(video.paused){

            video.play().catch(function(){});

        }else{

            video.pause();

        }

    }


    /* Ortadaki play butonu */

    playButton.addEventListener("click", function(e){

        e.preventDefault();
        e.stopPropagation();

        toggleVideo();

    });


    /* Videonun kendisine tıklayınca */

    video.addEventListener("click", function(){

        toggleVideo();

    });


    /* Durum değişiklikleri */

    video.addEventListener("play", updateVideoState);

    video.addEventListener("pause", updateVideoState);

    video.addEventListener("ended", function(){

        video.currentTime = 0;

        updateVideoState();

    });


    /* Başlangıç */

    updateVideoState();

});


/* =========================
   SPACE TUŞU
========================= */

document.addEventListener("keydown", function(e){

    if(e.code !== "Space") return;


    const activeElement =
        document.activeElement;


    /*
       Kullanıcı başka bir input / textarea
       yazıyorsa Space'i engelleme.
    */

    if(
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA"
        )
    ){

        return;

    }


    const videos =
        document.querySelectorAll(".gallery-video");


    let activeVideo = null;


    /*
       Ekranda oynayan video varsa onu bul.
    */

    videos.forEach(function(video){

        if(!video.paused){

            activeVideo = video;

        }

    });


    /*
       Oynayan video yoksa,
       görünür/aktif videoyu seç.
    */

    if(!activeVideo){

        videos.forEach(function(video){

            const rect =
                video.getBoundingClientRect();


            if(
                rect.top < window.innerHeight &&
                rect.bottom > 0 &&
                !activeVideo
            ){

                activeVideo = video;

            }

        });

    }


    if(!activeVideo) return;


    e.preventDefault();


    if(activeVideo.paused){

        activeVideo.play().catch(function(){});

    }else{

        activeVideo.pause();

    }

});