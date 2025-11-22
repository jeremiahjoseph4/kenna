// Milki's photo data – REPLACE THESE URLs WITH ACTUAL PHOTOS OF MILKI
const photos = [
  { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600", caption: "Milki's Radiant Smile" },
  { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600", caption: "Adventures with Milki" },
  { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600", caption: "Milki's Thoughtful Moments" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600", caption: "Milki's Confidence" },
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600", caption: "Milki's Grace" },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600", caption: "Milki's Energy" }
];

// Create gallery
const gallery = document.getElementById('gallery');
if (gallery) {
  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
      <img src="${photo.url}" alt="Milki" loading="lazy">
      <div class="photo-caption">${photo.caption}</div>
    `;
    gallery.appendChild(card);
  });
}

// Floating hearts background
const heartsContainer = document.getElementById('hearts');
const heartIcons = ['💖', '💗', '💓', '💕', '❤️'];

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 6 + 5) + 's';
  heart.style.fontSize = (Math.random() * 18 + 18) + 'px';
  heart.style.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) heart.remove();
  }, 8000);
}

// Generate hearts continuously
if (heartsContainer) {
  let heartInterval = setInterval(createHeart, 400);
  
  // Stop creating hearts if page is hidden (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(heartInterval);
    } else {
      heartInterval = setInterval(createHeart, 400);
    }
  });
}

// Reveal messages on scroll
const messageCards = document.querySelectorAll('.message-card');

function revealMessages() {
  messageCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (cardTop < windowHeight - 100) {
      card.classList.add('visible');
    }
  });
}

// Initial check + scroll listener
window.addEventListener('load', revealMessages);
window.addEventListener('scroll', revealMessages);
revealMessages(); // in case already in view

// Confetti on photo hover
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('mouseenter', createConfetti);
  });
});

// Confetti effect
function createConfetti() {
  const colors = ['#d147a3', '#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb'];
  const confettiCount = 35;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.opacity = Math.random() * 0.8 + 0.2;
    document.body.appendChild(confetti);

    const animation = confetti.animate([
      { top: '-10px', opacity: 1 },
      { top: '100vh', opacity: 0 }
    ], {
      duration: Math.random() * 3000 + 1500,
      easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });

    animation.onfinish = () => {
      if (confetti.parentNode) confetti.remove();
    };
  }
}
