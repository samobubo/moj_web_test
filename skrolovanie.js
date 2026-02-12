const SCROLL_THRESHOLD = 150;

const header = document.querySelector('header'); 

function handleScroll() {
    if(window.scrollY >= SCROLL_THRESHOLD) {
        
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}


window.addEventListener('scroll', handleScroll);