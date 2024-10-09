function createParticles() {
    const particleCount = 50;
    const colors = ['#ff80ab', '#b388ff', '#8c9eff', '#82b1ff'];
    const header = document.querySelector('header');

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 5 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        header.appendChild(particle);
    }
}

function createShapes() {
    const header = document.querySelector('header');

    const shape1 = document.createElement('div');
    shape1.className = 'floating-shape shape-1';
    header.appendChild(shape1);

    const shape2 = document.createElement('div');
    shape2.className = 'floating-shape shape-2';
    header.appendChild(shape2);

    const shape3 = document.createElement('div');
    shape3.className = 'floating-shape shape-3';
    header.appendChild(shape3);
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createShapes();
});