// CRUSH Website JavaScript

// Ana sayfada şu an JavaScript kullanılmıyor.
// Üye profil sayfalarındaki slider ve diğer özellikler
// daha sonra buraya eklenecek.

const targetDate = new Date("July 31, 2026 00:00:00").getTime();


setInterval(()=>{


    const now = new Date().getTime();

    const distance = targetDate - now;


    if(distance <= 0){

        document.getElementById("countdown").innerHTML =
        "<h2>CRUSH! IS HERE</h2>";

        return;

    }



    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        /(1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        /(1000 * 60)
    );


    const seconds = Math.floor(
        (distance % (1000 * 60))
        /1000
    );



    document.getElementById("days").innerHTML = days;

    document.getElementById("hours").innerHTML = hours;

    document.getElementById("minutes").innerHTML = minutes;

    document.getElementById("seconds").innerHTML = seconds;



},1000);

/* HOME GALLERY SLIDER */

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


    homeNext.addEventListener("click", ()=>{


        homeIndex++;


        if(homeIndex >= homeGalleryItems.length){

            homeIndex = 0;

        }


        showHomeGallery();


    });




    homePrev.addEventListener("click", ()=>{


        homeIndex--;


        if(homeIndex < 0){

            homeIndex = homeGalleryItems.length - 1;

        }


        showHomeGallery();


    });



    // ilk fotoğrafı göster

    showHomeGallery();


}