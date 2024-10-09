document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Remove the createParticles function call
    // createParticles();

    function updateExpertiseItems() {
        const expertiseItems = document.querySelectorAll('.expertise-item');
        expertiseItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            document.querySelector('.menu-bar').style.top = '-60px';
        } else {
            document.querySelector('.menu-bar').style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer.querySelector('video');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(videoContainer);

    updateExpertiseItems();

    window.addEventListener('resize', () => {
        updateExpertiseItems();
    });

    // Carousel functionality
    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-button.prev');
        const nextBtn = document.querySelector('.carousel-button.next');
        const progressContainer = document.querySelector('.carousel-progress');
        let currentIndex = 0;
        let itemsPerView = getItemsPerView();

        // Clone items for infinite scroll
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });

        // Create progress indicators
        const totalDots = items.length;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showItem(i));
            progressContainer.appendChild(dot);
        }

        const progressDots = progressContainer.querySelectorAll('.progress-dot');

        function getItemsPerView() {
            if (window.innerWidth > 1024) return 3;
            if (window.innerWidth > 768) return 2;
            return 1;
        }

        function updateItemsPerView() {
            itemsPerView = getItemsPerView();
            showItem(currentIndex);
        }

        function showItem(index) {
            const totalItems = items.length;
            if (index < 0) {
                index = totalItems - 1;
            } else if (index >= totalItems) {
                index = 0;
            }
            carousel.style.transform = `translateX(-${index * (100 / itemsPerView)}%)`;
            progressDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        function nextItem() {
            showItem(currentIndex + 1);
        }

        function prevItem() {
            showItem(currentIndex - 1);
        }

        nextBtn.addEventListener('click', nextItem);
        prevBtn.addEventListener('click', prevItem);

        // Touch and drag functionality
        let startX, isDragging = false, startPos;

        function gestureStart(e) {
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            isDragging = true;
            startPos = -currentIndex * (100 / itemsPerView);
            carousel.style.transition = 'none';
        }

        function gestureMove(e) {
            if (!isDragging) return;
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diff = (currentX - startX) / carousel.offsetWidth * 100;
            carousel.style.transform = `translateX(${startPos + diff}%)`;
        }

        function gestureEnd() {
            if (!isDragging) return;
            isDragging = false;
            carousel.style.transition = 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)';
            const movedBy = parseFloat(carousel.style.transform.split('(')[1]) + currentIndex * (100 / itemsPerView);
            if (movedBy < -25) nextItem();
            else if (movedBy > 25) prevItem();
            else showItem(currentIndex);
        }

        carousel.addEventListener('mousedown', gestureStart);
        carousel.addEventListener('touchstart', gestureStart);
        carousel.addEventListener('mousemove', gestureMove);
        carousel.addEventListener('touchmove', gestureMove);
        carousel.addEventListener('mouseup', gestureEnd);
        carousel.addEventListener('touchend', gestureEnd);
        carousel.addEventListener('mouseleave', gestureEnd);

        // Auto-play functionality
        let autoPlayInterval = setInterval(nextItem, 5000);

        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextItem, 5000);
        });

        window.addEventListener('resize', updateItemsPerView);

        showItem(currentIndex);
    }

    // Call initCarousel() in your DOMContentLoaded event listener
    initCarousel();

    // Smooth scrolling for menu items
    document.querySelectorAll('.menu-bar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ... rest of the existing code ...
});

// Remove the createParticles function
// function createParticles() {
//     const particleCount = 50;
//     const colors = ['#ff80ab', '#b388ff', '#8c9eff', '#82b1ff'];
//     const header = document.querySelector('header');

//     for (let i = 0; i < particleCount; i++) {
//         const particle = document.createElement('div');
//         particle.className = 'particle';
//         particle.style.width = `${Math.random() * 5 + 1}px`;
//         particle.style.height = particle.style.width;
//         particle.style.background = colors[Math.floor(Math.random() * colors.length)];
//         particle.style.left = `${Math.random() * 100}%`;
//         particle.style.top = `${Math.random() * 100}%`;
//         particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
//         particle.style.opacity = Math.random() * 0.5 + 0.1;
//         header.appendChild(particle);
//     }
// }

function updateExpertiseItems() {
    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}