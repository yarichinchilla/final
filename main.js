// FullPage.js Initialization
fullpage('#fullpage', {
  autoScrolling: true,
  navigation: true,
  navigationPosition: 'right',
  navigationTooltips: ['Home', 'Journey', 'Industries', 'Machines', 'Newsletter'],
  showActiveTooltip: true,
  responsiveWidth: 768, // Disable fullPage.js on smaller screens
  onLeave: function (origin, destination) {
    if (destination.index === 1) milestonesSection(destination);
  },
  afterRender: function () {
    homeSection();
  },
});

// GSAP Animation for Home Section
function homeSection() {
  const tl = gsap.timeline({ delay: 0.5 });
  tl.from('#logo', { x: -1000, opacity: 0, duration: 1.5, ease: 'bounce.out' })
    .from('.section-home .content', { y: 30, opacity: 0, duration: 1, ease: 'power2.out' }, '-=1')
    .from('#machine', { y: -1000, opacity: 0, duration: 1, ease: 'bounce.out' }, '-=0.5');
}

// GSAP Animation for Milestone Section
function milestonesSection(destination) {
  let section = destination.item;
  let heading = section.querySelector('h1');
  let milestoneCols = section.querySelectorAll('.milestone-col');

  const tl = gsap.timeline({ delay: 0.5 });
  tl.from(heading, { duration: 1, x: 500, opacity: 0, ease: 'bounce.out' })
    .from(milestoneCols, { y: '-50', opacity: 0, duration: 0.5, stagger: 0.2, ease: 'power1.out' });
}

// GSAP Animation for Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading');
  const logo = loadingScreen.querySelector('img');

  const tl = gsap.timeline({
    onComplete: () => loadingScreen.remove(), // Remove the loading screen after animation
  });

  tl.fromTo(logo, { scale: 0.5, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 0.8, ease: 'bounce.out' })
    .to(logo, { scale: 0, opacity: 0, duration: 1.2, ease: 'bounce.in' });
});

// Lightbox Functionality for Industries and Machines
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// Select images from both sections
const allGalleryImages = document.querySelectorAll('.grid img, .machines-cols img');

allGalleryImages.forEach(image => {
  image.addEventListener('click', () => {
    lightbox.classList.add('active');
    const img = document.createElement('img');
    img.src = image.src;

    // Clear any existing content in lightbox
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }

    // Add the clicked image to the lightbox
    lightbox.appendChild(img);
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove('active');
});

// Form Submission for Newsletter
document.getElementById('form-subscription').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent page reload
  const email = document.getElementById('email-input').value.trim();

  if (!validateEmail(email)) {
    alert('Please enter a valid email.');
    return;
  }

  alert(`Thank you for subscribing! Your email: ${email} has been registered.`);
});

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
  return emailRegex.test(email);
}

// GSAP ScrollTrigger for Milestones Section
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  gsap.from('.milestone-img', {
    scrollTrigger: {
      trigger: '.milestone-img',
      start: 'top 80%',
      end: 'bottom 50%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".logo-track");
  const logos = Array.from(track.children);

  // Duplica los logos para que el desplazamiento sea continuo
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });
});


// Newsletter Subscription//
const subscribeForm = document.getElementById("subscribe-form");

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Thank you for subscribing!");
});

// Email Validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

