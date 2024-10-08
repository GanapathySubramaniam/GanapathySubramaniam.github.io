document.addEventListener('DOMContentLoaded', () => {
    // Glitch typewriter effect
    const phrases = [
        "Generative AI Specialist",
        "AI Innovator",
        "Generative AI Specialist",
        "Cloud AI Architect",
    ];
    const el = document.querySelector('.title');
    const fx = new TextScramble(el);
    let counter = 0;
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000);
        });
        counter = (counter + 1) % phrases.length;
    };
    next();

    // 3D tilt effect for expertise items
    VanillaTilt.init(document.querySelectorAll(".expertise-item"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function showItem(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        items.forEach((item, i) => {
            if (i === index) {
                item.style.opacity = 1;
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = 0.5;
                item.style.transform = 'scale(0.9)';
            }
        });
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    nextBtn.addEventListener('click', nextItem);
    prevBtn.addEventListener('click', prevItem);

    // Initial setup
    items.forEach((item, index) => {
        item.style.transition = 'all 0.5s ease';
        if (index !== currentIndex) {
            item.style.opacity = 0.5;
            item.style.transform = 'scale(0.9)';
        }
    });

    // Auto-play functionality
    let autoPlayInterval = setInterval(nextItem, 5000);

    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextItem, 5000);
    });

    // Parallax effect for carousel
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        items.forEach((item, index) => {
            const depth = index - currentIndex;
            const translateX = mouseX * depth * 20;
            const translateY = mouseY * depth * 20;
            const scale = index === currentIndex ? 1 : 0.8;
            const rotateY = index === currentIndex ? 0 : 45;
            
            item.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`;
        });
    });
});

function createParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });
}

function floatingElements() {
    const elements = document.querySelectorAll('.floating');
    elements.forEach(el => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        const randomDelay = Math.random() * 2;
        const randomTime = 3 + Math.random() * 2;

        el.style.setProperty('--random-x', `${randomX}px`);
        el.style.setProperty('--random-y', `${randomY}px`);
        el.style.setProperty('--random-delay', `${randomDelay}s`);
        el.style.setProperty('--random-time', `${randomTime}s`);
    });
}

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="glitch-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}