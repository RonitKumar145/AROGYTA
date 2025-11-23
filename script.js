// ===================================
// DOM Elements
// ===================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const logoBtn = document.getElementById('logoBtn');

// ===================================
// Sidebar Toggle Functions
// ===================================
function openSidebar() {
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (hamburgerBtn) hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
}

function closeSidebar() {
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// ===================================
// Event Listeners
// ===================================

// Hamburger button click
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

// Close button click
if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
}

// Overlay click
if (overlay) {
    overlay.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Logo click to refresh current page
if (logoBtn) {
    logoBtn.addEventListener('click', () => {
        window.location.reload();
    });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Header Scroll Effect
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Authentication State Check
// ===================================
window.addEventListener('load', () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const signinBtn = document.querySelector('.signin-btn');

    // Only change "Sign In" to "Dashboard" if it's NOT the logout button
    if (isAuthenticated === 'true' && signinBtn && signinBtn.id !== 'logoutBtn') {
        // User is logged in, change "Sign In" to "Dashboard"
        signinBtn.href = 'dashboard.html';
        signinBtn.innerHTML = `
            <svg class="signin-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Dashboard</span>
        `;
    }
});

// ===================================
// Prevent transitions on window resize
// ===================================
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add CSS for resize animation stopper
const style = document.createElement('style');
style.textContent = `
    .resize-animation-stopper * {
        transition: none !important;
    }
`;
document.head.appendChild(style);
