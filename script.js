// Navigation (SPA-like)

const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href').slice(1);
        sections.forEach(sec => sec.classList.add('hidden'));
        document.getElementById(target).classList.remove('hidden');
    });
});

// Hero Animation (Inspired by promo video)

const heroAnim = anime.timeline({ loop: true });

heroAnim
    .add({
        targets: '#dial',
        scale: [0, 1],
        opacity: [0, 1],
        rotate: 360,
        easing: 'easeInOutSine',
        duration: 2000
    })
    .add({
        targets: '#dots .bg-red-500',
        scale: [0, 1],
        delay: anime.stagger(100),
        easing: 'spring(1, 80, 10, 0)',
        duration: 1000
    }, '-=1000')
    .add({
        targets: '#hero-text',
        opacity: 1,
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 800
    });

// Tutorial Demos (Run on load for #tutorials)

document.addEventListener('DOMContentLoaded', () => {
    // Basics demo
    anime({
        targets: '#tutorials .demo:nth-of-type(1)',
        translateX: 100,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad'
    });

    // Timelines demo
    const tlDemo = anime.timeline({ loop: true });
    tlDemo.add({ targets: '#tutorials .demo:nth-of-type(2) > div:first-child', scale: 1.5, duration: 500 })
          .add({ targets: '#tutorials .demo:nth-of-type(2) > div:last-child', scale: 1.5, duration: 500 });

    // Staggering demo
    anime({
        targets: '#tutorials .demo:nth-of-type(3) > div',
        translateY: -50,
        delay: anime.stagger(200),
        loop: true,
        direction: 'alternate'
    });

    // Easings demo
    anime({
        targets: '#tutorials .demo:nth-of-type(4)',
        rotate: 360,
        loop: true,
        easing: 'easeInOutSine'
    });

    // SVG demo
    anime({
        targets: '#tutorials svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        direction: 'alternate',
        loop: true
    });

    // Controls demo
    const controlDemo = anime({
        targets: '#tutorials .demo:nth-of-type(6)',
        translateX: 100,
        autoplay: false
    });
    setTimeout(() => controlDemo.play(), 1000);
});

// Playground Logic

const animConfig = []; // Store user compositions
const timeline = anime.timeline({ autoplay: false });

document.getElementById('add-to-timeline').addEventListener('click', () => {
    const config = getFormConfig();
    animConfig.push(config);
    timeline.add(config);
});

document.getElementById('add-stagger').addEventListener('click', () => {
    const config = getFormConfig();
    config.delay = anime.stagger(100); // Example stagger
    animConfig.push(config);
    timeline.add(config);
});

document.getElementById('preview').addEventListener('click', () => {
    const target = getTargetElement();
    timeline.restart();
});

document.getElementById('generate-code').addEventListener('click', () => {
    const code = `const tl = anime.timeline();\n${animConfig.map(c => `tl.add(${JSON.stringify(c, null, 2)});`).join('\n')}`;
    document.getElementById('code-output').textContent = code;
    document.getElementById('code-output').classList.remove('hidden');
});
function getFormConfig() {
    const target = getTargetSelector();
    const property = document.getElementById('property').value;
    const value = document.getElementById('value').value;
    const easing = document.getElementById('easing').value;
    const duration = document.getElementById('duration').value || 1000;
    return {
        targets: target,
        [property]: value,
        easing,
        duration
    };
}
function getTargetSelector() {
    const type = document.getElementById('target').value;
    if (type === 'Circle') return '#preview-circle';
    if (type === 'Square') return '#preview-square';
    return '#preview-text';
}
function getTargetElement() {
    const type = document.getElementById('target').value;
    document.querySelectorAll('#preview-area > *').forEach(el => el.classList.add('hidden'));
    if (type === 'Circle') document.getElementById('preview-circle').classList.remove('hidden');
    if (type === 'Square') document.getElementById('preview-square').classList.remove('hidden');
    if (type === 'Text') document.getElementById('preview-text').classList.remove('hidden');
}
// Show home by default
document.getElementById('home').classList.remove('hidden');