const stage = document.getElementById('carouselStage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const items = document.querySelectorAll('.carousel-item');

const numItems = items.length; 
let currentIndex = 0; 

const config = [
    
    { scale: 0.8, opacity: 0.3, zIndex: 2, x: '-400px', rotateY: '0deg' }, // Vľavo
    { scale: 1,   opacity: 1,   zIndex: 3, x: '0px',     rotateY: '0deg'  }, // Stred
    { scale: 0.8, opacity: 0.3, zIndex: 2, x: '400px',  rotateY: '0deg' }, // Vpravo
    
];

// Funkcia na aplikovanie transformácií na karty'
function updateCarousel() {
    items.forEach((item, i) => {
        // Vypočítame, aká je pozícia karty vzhľadom na centrálnu kartu
        // Napr. ak je centrálna karta 0:
        // Karta 0: 0 - 0 = 0 (stred)
        // Karta 1: 1 - 0 = 1 (vpravo)
        // Karta 5: 5 - 0 = 5 (mimo zobrazenia)
        // Ak sa chceme správať ako kruh, musíme použiť modulo operáciu
        let position = (i - currentIndex + numItems) % numItems;
        
        // Ak chceme, aby karty "odchádzali" a "prichádzali" plynule,
        // musíme ich správne mapovať na config.
        // Konfigurácia je definovaná pre -2, -1, 0, 1, 2 pozície.
        // Náš position musí byť mapovaný tak, aby sa "prichádzajúce" a "odchádzajúce" karty
        // zobrazovali správne.
        
        let mappedPosition;
        if (position >= numItems - Math.floor(config.length / 2)) {
            // Karty, ktoré sa vracajú zprava dozadu (napr. 5, 4...)
            mappedPosition = position - numItems; // dostaneme záporné čísla
        } else if (position <= Math.floor(config.length / 2)) {
            // Karty, ktoré sú viditeľné spredu (0, 1, 2...)
            mappedPosition = position;
        } else {
            // Karty, ktoré sú úplne mimo viditeľné pole
            mappedPosition = null; // Budú skryté alebo zmenšené
        }

        // Nájdeme zodpovedajúcu konfiguráciu v našom poli 'config'
        // Index 0 v config zodpovedá mappedPosition -2
        // Index 1 v config zodpovedá mappedPosition -1
        // Index 2 v config zodpovedá mappedPosition 0
        // atď.
        const configIndex = mappedPosition !== null ? mappedPosition + Math.floor(config.length / 2) : null;
        const itemConfig = (configIndex !== null && config[configIndex]) ? config[configIndex] : null;

        if (itemConfig) {
            item.style.transform = `translateX(${itemConfig.x}) scale(${itemConfig.scale}) rotateY(${itemConfig.rotateY})`;
            item.style.opacity = itemConfig.opacity;
            item.style.zIndex = itemConfig.zIndex;
            item.style.pointerEvents = (itemConfig.scale === 1) ? 'auto' : 'none'; // Iba centrálna karta je klikateľná
        } else {
            // Skryť karty, ktoré sú mimo definované pozície
            item.style.transform = `translateX(0px) scale(0.5) rotateY(0deg)`; // Alebo úplne skryť
            item.style.opacity = 0;
            item.style.zIndex = -1;
            item.style.pointerEvents = 'none';
        }
        item.style.left = `calc(50% - ${item.offsetWidth / 2}px)`; // Centrovanie pozície
    });

    // Aktualizácia stavu tlačidiel (voliteľné, ak nechceme cyklický karusel)
    // Ak chcete, aby sa tlačidlá vypli na začiatku/konci, zakomentujte riadky pre cyklovanie
    prevBtn.disabled = false; // Vždy aktívne pre cyklický
    nextBtn.disabled = false; // Vždy aktívne pre cyklický
}

// Navigácia dopredu
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % numItems; // Cyklické posúvanie
    updateCarousel();
});

// Navigácia dozadu
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + numItems) % numItems; // Cyklické posúvanie
    updateCarousel();
});

// Iniciálne nastavenie
updateCarousel();
