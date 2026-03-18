const mainContent = document.getElementById('main-content');
const initialCard = document.getElementById('initial-card');
const successMessage = document.getElementById('success-message');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');

let yesScale = 1;
let noScale = 1;
const YES_INCREMENT = 0.08;
const NO_DECREMENT = 0.07;
const MAX_YES_SCALE = 1.6;
const MIN_NO_SCALE = 0.6;

yesButton.style.transition = 'transform 0.2s ease';
yesButton.style.transformOrigin = 'center';
noButton.style.transformOrigin = 'center';

// --- Read URL params to personalize the question ---
(function applyQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || params.get('to');
    const questionParam = params.get('question');
    const questionEl = document.getElementById('question-text');

    if (!questionEl) return;

    if (questionParam) {
        questionEl.textContent = questionParam;
    } else if (name) {
        questionEl.textContent = `Will you go out on a date with me, ${name}?`;
    }
})();

// --- Event Listener for the 'Yes' button ---
yesButton.addEventListener('click', function() {
    // 1. Hide the initial question card
    initialCard.style.display = 'none';
    
    // 2. Display the hidden success message section
    successMessage.style.display = 'block';
    
    // 3. Optional: Add visual flair like a confetti effect!
    // (This would require a library or complex CSS, let's keep it simple for now)
});

noButton.addEventListener('mousemove', moveButton);

function moveButton(e) {
    noButton.style.position = 'absolute';
    noButton.style.transition = 'left 0.25s ease, top 0.25s ease, transform 0.2s ease';

    const rect = noButton.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    let vx = btnCenterX - cursorX;
    let vy = btnCenterY - cursorY;
    let dist = Math.hypot(vx, vy);

    if (dist === 0) {
        const angle = Math.random() * Math.PI * 2;
        vx = Math.cos(angle);
        vy = Math.sin(angle);
        dist = 1;
    }

    vx /= dist;
    vy /= dist;

    const minMove = 100;
    const maxMove = 150;
    const moveDist = minMove + Math.random() * (maxMove - minMove);

    yesScale = Math.min(MAX_YES_SCALE, yesScale + YES_INCREMENT);
    noScale = Math.max(MIN_NO_SCALE, noScale - NO_DECREMENT);
    yesButton.style.transform = `scale(${yesScale})`;
    noButton.style.transform = `scale(${noScale})`;

    let newCenterX = Math.round(btnCenterX + vx * moveDist);
    let newCenterY = Math.round(btnCenterY + vy * moveDist);

    let newX = newCenterX - rect.width / 2;
    let newY = newCenterY - rect.height / 2;

    const padding = 8;
    newX = Math.min(Math.max(padding, newX), window.innerWidth - rect.width - padding);
    newY = Math.min(Math.max(padding, newY), window.innerHeight - rect.height - padding);

    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
}