const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
        toTop.classList.add("active");
        toTop.addEventListener("click", () => {
            window.scroll({
                top: 0
            });
        });
    }
    else{
        toTop.classList.remove("active");
    }
});