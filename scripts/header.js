addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.fries-menu');
    if(hamburger){
        hamburger.addEventListener('click', () => {
            const menu = document.querySelector('.menu');
            const nav = document.querySelector('.nav');
            menu.classList.toggle('show');
            nav.classList.toggle('show');
        });
    }

    const serviceItem = document.getElementById('service-item');
    serviceItem.addEventListener('click', () => {
        const menu = document.querySelector('.menu');
        const nav = document.querySelector('.nav');
        menu.classList.toggle('show');
        nav.classList.toggle('show');
    });
});